export interface Notification {
  id: string;
  message: string;
  action?: string;
  actionLabel?: string;
}

export const NotificationAction = { TaskDelete: 'TaskDelete', TasksAllDelete: 'TasksAllDelete' };

export enum NotificationMessage {
  TaskDelete = 'Task deleted',
  TasksAllDelete = 'All tasks deleted',
  TasksAllCompletedDelete = 'All completed tasks deleted',
  TaskAdd = 'Task added',
  TaskMove = 'Task moved',
  TaskComplete = 'Task completed',
  TaskActivate = 'Task activated',
  TaskDateUpdate = 'Date updated',
  TaskUpdate = 'Task updated',
  TaskDuplicate = 'Task duplicated',
  TaskPriority = 'Task priority changed',
  CopyLink = 'Task link copied',
  UpdateProject = 'Project updated',
  DeleteProject = 'Project deleted',
  AddProject = 'Project added',
  DuplicateProject = 'Project duplicated',
  ArchiveProject = 'Project archived',
  ActivateProject = 'Project activated',
  NoteAdd = 'Note added',
  NoteDelete = 'Note deleted',
}
