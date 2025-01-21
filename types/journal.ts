export interface Analysis {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  entryId: string;
  mood: string;
  summary: string;
  color: string;
  negative: boolean;
  subject: string;
  sentimentScore?: number;
}

export interface JournalEntry {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  userId: string;
  analysis?: Analysis | null;
}

export interface ChartData {
  id: string;
  createdAt: Date;
  color: string;
  mood: string;
  sentimentScore: number;
}

export interface TooltipProps {
  payload?: Array<{
    payload: ChartData;
  }>;
  label?: string;
  active?: boolean;
}
