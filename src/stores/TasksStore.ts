import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';
import { findItem } from '@/helpers/findItem';
import { findIndex } from '@/helpers/findIndex';
import { SortFilters, SortOrder } from '@/types/models/Sort';
import type { Task } from '@/types/models/Task';
import type { State } from '@/types/models/State';
import type { Notification } from '@/types/models/Notification';
import { NotificationMessage } from '@/types/models/NotificationMessage';
import { NotificationAction } from '@/types/models/NotificationAction';

export const useStoreTasks = defineStore('tasks', {
  state: (): State => ({
    tasks: [],
    sortType: SortFilters.Default,
    sortOrder: SortOrder.Ascending,
    deletedTasks: [],
    notifications: [],
    temp: [],
  }),
  getters: {
    getAllTasks(state): Task[] {
      return state.tasks;
    },
    getTaskById(state) {
      return (id: string): Task | undefined => {
        return state.tasks.find((task) => task.id === id);
      };
    },
    getImportantTasks(state): Task[] {
      return state.tasks.filter((task) => task.isImportant);
    },
    getDoneTasks(state): Task[] {
      return state.tasks.filter((task) => task.done);
    },
    getNotDoneTasks(state): Task[] {
      return state.tasks.filter((task) => !task.done);
    },
    getDeletedTask(state): Task {
      return state.deletedTasks[this.deletedTasks.length - 1];
    },
    getTaskDate() {
      return (id: string): Date | undefined => this.getTaskById(id)?.date;
    },
    getSortOrder(): SortOrder {
      return this.sortOrder;
    },
  },
  actions: {
    addTask(content: string, date: Date | undefined) {
      const id = uuid();
      const newTask: Task = {
        id,
        content,
        done: false,
        isImportant: false,
        createdAt: new Date(),
        ...(date && { date }),
        subtasks: {},
      };

      this.tasks.unshift(newTask);
      this.sortTasks(this.sortType);
    },
    addNotification(message: string, id: string) {
      let actionLabel;
      let action;

      if (message === NotificationMessage.TaskDelete) {
        actionLabel = 'undo';
        action = NotificationAction.TaskDelete;
      } else if (message === NotificationMessage.AllTasksDelete) {
        actionLabel = 'undo';
        action = NotificationAction.AllTasksDelete;
      }

      const notification: Notification = {
        id,
        message,
        ...(action && { action }),
        ...(actionLabel && { actionLabel }),
      };

      this.notifications.push(notification);
    },
    deleteNotification(id: string) {
      const notificationToDel = findItem(id, this.notifications);

      this.notifications = this.notifications.filter((notification) => notification !== notificationToDel);

      if (!this.notifications.some((notification) => notification.action === NotificationAction.AllTasksDelete)) {
        this.temp = [];
      }
    },
    sortTasks(type: SortFilters) {
      this.sortType = type;

      switch (type) {
        case SortFilters.Created:
          this.tasks = this.tasks.sort((taskA, taskB) => taskB.createdAt.getTime() - taskA.createdAt.getTime());
          break;
        case SortFilters.Date:
          this.tasks = this.tasks.sort(
            (taskA, taskB) => (taskA.date?.getTime() || Infinity) - (taskB.date?.getTime() || Infinity)
          );
          break;
        case SortFilters.Title:
          this.tasks = this.tasks.sort((taskA, taskB) => taskA.content.localeCompare(taskB.content));
          break;
      }

      if (this.sortOrder === SortOrder.Descending) {
        this.tasks = this.tasks.reverse();
      }
    },
    sortTasksChangeOrder(): void {
      this.sortOrder = this.sortOrder === SortOrder.Ascending ? SortOrder.Descending : SortOrder.Ascending;
      this.sortTasks(this.sortType);
    },
    toggleIsDone(id: string) {
      const index = findIndex(id, this.tasks);

      this.tasks[index]['done'] = !this.tasks[index]['done'];
    },
    toggleIsImportant(id: string) {
      const index = findIndex(id, this.tasks);

      this.tasks[index]['isImportant'] = !this.tasks[index]['isImportant'];
    },

    updateTask(id: string, content: string): void {
      const task = findItem(id, this.tasks);

      task.content = content;
      this.sortTasks(this.sortType);
    },
    updateDate(id: string, date: Date): void {
      const task = findItem(id, this.tasks);

      task.date = date;
      this.sortTasks(this.sortType);
    },
    duplicateTask(id: string): void {
      const task = findItem(id, this.tasks);
      const copyTask = JSON.parse(JSON.stringify(task));
      const newId = uuid();
      const newCreatedAt = new Date();

      copyTask.id = newId;
      copyTask.createdAt = newCreatedAt;
      if (copyTask.date) copyTask.date = new Date(copyTask.date);

      const taskIndex = this.tasks.findIndex((task) => task.id === id);
      const tasksArrStart = this.tasks.slice(0, taskIndex + 1);
      const tasksArrEnd = this.tasks.slice(taskIndex + 1);

      this.tasks = [...tasksArrStart, copyTask, ...tasksArrEnd];
      this.sortTasks(this.sortType);
    },
    deleteTask(id: string): void {
      const taskToDel = findItem(id, this.tasks);

      this.deletedTasks.push(taskToDel);
      this.tasks = this.tasks.filter((task) => task !== taskToDel);
    },
    undoDeleteTask(id: string): void {
      const taskToRecover = findItem(id, this.deletedTasks);

      this.tasks.unshift(taskToRecover);
      this.deletedTasks = this.deletedTasks.filter((task) => task !== taskToRecover);
      this.sortTasks(this.sortType);
    },
    deleteAllTasks() {
      const delTasks = [...this.tasks];

      this.deletedTasks.push(...delTasks);
      this.tasks = [];
      this.temp.push(...delTasks);
    },
    undoDeleteAllTasks(): void {
      this.tasks = [...this.tasks, ...this.temp];
      this.temp = [];
      this.sortTasks(this.sortType);
    },
  },
});
