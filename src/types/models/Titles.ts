export const TASK_VIEW_TITLE = { INBOX: 'Inbox', TODAY: 'Today' } as const;

type TASK_VIEW_TITLE = (typeof TASK_VIEW_TITLE)[keyof typeof TASK_VIEW_TITLE];
