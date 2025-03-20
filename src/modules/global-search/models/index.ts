
export interface Transcription {
  id: string; 
  title: string; 
}

export interface Summary {
  id: string; 
  title: string; 
    
}

export interface globalSearchResponse {
  transcriptions: Transcription[];
  summaries: Summary[];
}
