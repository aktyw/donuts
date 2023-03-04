export interface Task {
  id: string;
  content: string;
  done: boolean;
  isImportant: boolean;
  date?: Date;
  createdAt: Date;
  subtasks: {};
}
