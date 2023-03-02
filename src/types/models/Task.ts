export interface Task {
  id: string;
  content: string;
  done: boolean;
  isImportant: boolean;
  date: string | null;
  createdAt: Date;
  subtasks: {};
}
