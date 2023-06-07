export interface Task {
  id: string;
  title: string;
  description?: string;
  isDone: boolean;
  isPriority: boolean;
  date?: Date;
  createdAt: Date;
  projectId: string;
  parentId?: string | null;
  childId?: string[];
  noteId?: string[];
}
