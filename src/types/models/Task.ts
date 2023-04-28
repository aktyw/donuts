export interface Task {
  id: string;
  title: string;
  description?: string;
  isDone: boolean;
  isPriority: boolean;
  date?: Date;
  createdAt: Date;
  projectId: string;
  parentId?: string;
  subtasks: Task[];
}

export type TaskAddOptions = Omit<Task, 'id' | 'isDone' | 'createdAt' | 'subtasks'>;

export type TaskAddSubtaskOptions = TaskAddOptions & {
  parentId?: string;
};
