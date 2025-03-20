export interface SpeakerTranscription {
  content: Array<{ speaker: string; speech: string; startTime: number }>;
  endTime:number
}

export type SpeakerSpeech = {
  speaker: string;
  speech: string;
  startTime: number;
};

export type SummaryItem={
  id: string
  title:string
}

export type created_by={
  id: string
  name: string
}

export interface ITranscription {
  id: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  title: string;
  description: string;
  audio: string;
  text: SpeakerTranscription;
  project: string;
  created_by: created_by;
  updated_by: string;
  summary: SummaryItem | null;
  status:string
}
