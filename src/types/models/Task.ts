export interface Task {
  id: string;
  content: string;
  description?: string;
  done: boolean;
  isImportant: boolean;
  date?: Date;
  createdAt: Date;
  subtasks: {};
}
