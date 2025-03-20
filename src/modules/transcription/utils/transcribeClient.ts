import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import {
  TranscribeStreamingClient,
  StartStreamTranscriptionCommand,
  StartStreamTranscriptionCommandOutput,
} from "@aws-sdk/client-transcribe-streaming";
import MicrophoneStream from "microphone-stream";
import { REGION, IDENTITY_POOL_ID } from "./awsID";
import { Buffer } from "buffer";

type TranscriptionCallback = (transcript: {
  speaker: string;
  speech: string;
  startTime: number;
  endTime: number;
}) => void;

const SAMPLE_RATE = 44100;
const MAX_AUDIO_CHUNK_SIZE = 48000;
let microphoneStream: MicrophoneStream | undefined = undefined;
let transcribeClient: TranscribeStreamingClient | undefined = undefined;

let lastResultId: string | null = null;
let lastTranscript: string = "";

let audioChunks: Blob[] = [];

export const startRecording = async (
  // language: string,
  callback: TranscriptionCallback
): Promise<boolean> => {
  // if (!language) {
  //   return false;
  // }
  if (microphoneStream || transcribeClient) {
    stopRecording();
  }
  createTranscribeClient();
  await createMicrophoneStream();
  await startStreaming(callback);
  return true;
};

export const stopRecording = (): void => {
  if (microphoneStream) {
    microphoneStream.stop();
    microphoneStream = undefined;
  }
  if (transcribeClient) {
    transcribeClient.destroy();
    transcribeClient = undefined;
  }
  lastResultId = null;
  lastTranscript = "";
  return saveAudioFile(); // Save the audio file when recording stops
};

const createTranscribeClient = (): void => {
  transcribeClient = new TranscribeStreamingClient({
    region: REGION,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: REGION }),
      identityPoolId: IDENTITY_POOL_ID,
    }),
  });
};

const createMicrophoneStream = async (): Promise<void> => {
  microphoneStream = new MicrophoneStream();
  microphoneStream.setStream(
    await window.navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    })
  );
  audioChunks = [];
};

const startStreaming = async (
  callback: TranscriptionCallback
): Promise<void> => {
  const command = new StartStreamTranscriptionCommand({
    MediaEncoding: "pcm",
    // IdentifyMultipleLanguages: true,
    // PreferredLanguage: "de-DE",
    // LanguageOptions: "en-US,de-DE",
    MediaSampleRateHertz: SAMPLE_RATE,
    AudioStream: getAudioStream(),
    EnablePartialResultsStabilization: true,
    ShowSpeakerLabel: true,
    LanguageCode: 'de-DE',
  });

  //here we got error of again and again calling
  const data: StartStreamTranscriptionCommandOutput =
    await transcribeClient!.send(command);

  for await (const event of data.TranscriptResultStream) {
    for (const result of event.TranscriptEvent?.Transcript?.Results || []) {
      if (!result.IsPartial && result.ResultId !== lastResultId) {
        lastResultId = result.ResultId;

        const transcriptContent = result.Alternatives[0].Transcript.trim();
        const speakerLabel =
          result.Alternatives[0].Items[0]?.Speaker || "Unknown Speaker";
        const startTimeResult = result;

        if (transcriptContent !== lastTranscript) {
          lastTranscript = transcriptContent;
          const startTime = startTimeResult.Alternatives[0].Items[0].StartTime;
          const endTime = startTimeResult.EndTime;

          const res = {
            speech: transcriptContent,
            speaker: `Speaker ${speakerLabel}`,
            startTime: startTime,
            endTime: endTime,
          };

          callback(res);
        }
      }
    }
  }
};

const getAudioStream = async function* (): AsyncGenerator<{
  AudioEvent: { AudioChunk: Buffer };
}> {
  if (!microphoneStream) {
    throw new Error(
      "Cannot get audio stream. microphoneStream is not initialized."
    );
  }

  for await (const chunk of microphoneStream) {
    if (chunk.length <= MAX_AUDIO_CHUNK_SIZE) {
      yield {
        AudioEvent: {
          AudioChunk: encodePCMChunk(chunk),
        },
      };
    }
    // Store raw audio chunks
    audioChunks.push(new Blob([chunk], { type: "audio/wav" }));
  }
};

const encodePCMChunk = (chunk: any): Buffer => {
  const input = MicrophoneStream.toRaw(chunk) as Float32Array;
  let offset = 0;
  const buffer = new ArrayBuffer(input.length * 2);
  const view = new DataView(buffer);
  for (let i = 0; i < input.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, input[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return Buffer.from(buffer);
};

//Todo
const saveAudioFile = () => {
  if (audioChunks.length === 0) return;

  // Combine all audio chunks into a single Blob
  const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });

  // Create a downloadable link
  const audioUrl = URL.createObjectURL(audioBlob);
  // const link = document.createElement('a');
  // link.href = audioUrl;
  // link.download = 'recording.mp3';
  // link.click();
};
