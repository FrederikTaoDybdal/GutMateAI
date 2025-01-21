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
}

export interface JournalEntry {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  userId: string;
  analysis?: Analysis | null;
}
