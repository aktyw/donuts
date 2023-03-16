export interface Task {
  id: string;
  title: string;
  description?: string;
  done: boolean;
  isImportant: boolean;
  date?: Date;
  createdAt: Date;
  subtasks: {};
}
