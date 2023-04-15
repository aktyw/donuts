export interface Task {
  id: string;
  title: string;
  description?: string;
  done: boolean;
  isPriority: boolean;
  date?: Date;
  createdAt: Date;
  subtasks: {};
  projectId: string;
}
