

export type IMeetingProviderListType = {
  id: number;
  name: string;
  icon: string;
};

export interface IRecordingType {
  topic: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recording_files: any[];
  id: number;
}
