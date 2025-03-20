interface Transcription {
  id: string;
  title: string;
}

interface Project {
  id: string;
  name: string;
}

interface User {
  id: string;
  name: string;
}

export interface SummaryItem {
  id: string;
  title: string;
  summary: string;
  is_editable: boolean;
  transcription: Transcription;
  project: Project;
  created_by: User;
  updated_by: User;
  created_at: string;
  updated_at: string;
  status:string
}

export interface SummaryList{
  data: SummaryItem[];
}
