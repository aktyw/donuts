import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';

import { isToday } from '@/helpers/checkTime';
import { findIndex } from '@/helpers/findIndex';
import { findItem } from '@/helpers/findItem';
import { Filters } from '@/types/models/Filters';
import type { Notification } from '@/types/models/Notification';
import { NotificationAction } from '@/types/models/NotificationAction';
import { NotificationMessage } from '@/types/models/NotificationMessage';
import { SortFilters, SortOrder } from '@/types/models/Sort';
import type { State } from '@/types/models/State';
import type { Task } from '@/types/models/Task';

export const useTasksStore = defineStore('tasks', {
  state: (): State => ({
    tasks: useStorage(
      'tasks',
      {
        default: [],
        deleted: [],
        temp: [],
        currentFilter: Filters.All,
      },
      undefined,
      {
        serializer: {
          read: (v: any) => {
            const isoDateRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;

            function isIsoDate(value: string) {
              return isoDateRegex.exec(value);
            }

            function parseDate(ignored: string, value: string) {
              if (typeof value !== 'string') {
                return value;
              }
              if (isIsoDate(value)) {
                return new Date(value);
              }

              return value;
            }

            return v ? JSON.parse(v, parseDate) : null;
          },
          write: (v: any) => {
            return JSON.stringify(v);
          },
        },
      }
    ),
    sort: {
      type: SortFilters.Default,
      order: SortOrder.Ascending,
    },
    notifications: [],
  }),
  getters: {
    getAllTasks(state): Task[] {
      return state.tasks.default;
    },
    getProjectTasks(state): (projectId: string) => Task[] {
      return (projectId = 'inbox') => {
        return state.tasks.default.filter((task) => task.projectId === projectId);
      };
    },
    getTodayTasks(state): Task[] {
      return state.tasks.default.filter((task: Task) => {
        if (!task.date) return;
        if (isToday(task.date)) {
          return task;
        }
      });
    },
    getTaskById(state): (id: string) => Task | undefined {
      return (id: string): Task | undefined => {
        return state.tasks.default.find((task) => task.id === id);
      };
    },
    getPriorityTasks(state): Task[] {
      return state.tasks.default.filter((task) => task.isPriority);
    },
    getCompletedTasks(state): Task[] {
      return state.tasks.default.filter((task) => task.done);
    },
    getNotCompletedTasks(state): Task[] {
      return state.tasks.default.filter((task) => !task.done);
    },
    getDeletedTask(state): Task {
      return state.tasks.deleted[state.tasks.deleted.length - 1];
    },
    getTaskDate() {
      return (id: string): Date | undefined => this.getTaskById(id)?.date;
    },
    getSortOrder(state): SortOrder {
      return state.sort.order;
    },
    getSortType(state): SortFilters {
      return state.sort.type;
    },
    getCurrentFilter(state): Filters {
      return state.tasks.currentFilter;
    },
  },
  actions: {
    addTask({
      title,
      description,
      date,
      isPriority,
      projectId,
    }: {
      title: string;
      description: string;
      date: Date | undefined;
      isPriority: boolean;
      projectId: string;
    }) {
      const id = uuid();
      const newTask: Task = {
        id,
        title,
        ...(description && { description }),
        done: false,
        isPriority,
        createdAt: new Date(),
        ...(date && { date }),
        subtasks: {},
        projectId,
      };

      this.tasks.default.push(newTask);
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
        this.tasks.temp = [];
      }
    },
    setFilter(type: Filters): void {
      this.tasks.currentFilter = type;
    },
    setSortType(type: SortFilters): void {
      this.sort.type = type;
    },
    resetView(): void {
      this.resetSortSettings();
      this.tasks.currentFilter = Filters.All;
    },
    resetSortSettings(): void {
      this.sort.type = SortFilters.Default;
      this.sort.order = SortOrder.Ascending;
    },
    sortTasksChangeOrder(): void {
      this.sort.order = this.sort.order === SortOrder.Ascending ? SortOrder.Descending : SortOrder.Ascending;
    },
    toggleIsDone(id: string) {
      const index = findIndex(id, this.tasks.default);

      this.tasks.default[index]['done'] = !this.tasks.default[index]['done'];
    },
    toggleIsPriority(id: string) {
      const index = findIndex(id, this.tasks.default);

      this.tasks.default[index]['isPriority'] = !this.tasks.default[index]['isPriority'];
    },
    updateTask(id: string, title: string): void {
      const task = findItem(id, this.tasks.default);

      task.title = title;
    },
    updateDate(id: string, date: Date): void {
      const task = findItem(id, this.tasks.default);

      task.date = date;
    },
    duplicateTask(id: string, projectId?: string): void {
      const task = findItem(id, this.tasks.default);
      const copyTask = JSON.parse(JSON.stringify(task));
      const newId = uuid();
      const newCreatedAt = new Date();

      copyTask.id = newId;
      copyTask.createdAt = newCreatedAt;
      if (copyTask.date) copyTask.date = new Date(copyTask.date);
      if (projectId) {
        copyTask.projectId = projectId;
      }

      const taskIndex = this.tasks.default.findIndex((task) => task.id === id);
      const tasksArrStart = this.tasks.default.slice(0, taskIndex + 1);
      const tasksArrEnd = this.tasks.default.slice(taskIndex + 1);

      this.tasks.default = [...tasksArrStart, copyTask, ...tasksArrEnd];
    },
    deleteTask(id: string): void {
      const taskToDel = findItem(id, this.tasks.default);

      this.tasks.deleted.push(taskToDel);
      this.tasks.default = this.tasks.default.filter((task) => task !== taskToDel);
    },
    undoDeleteTask(id: string): void {
      const taskToRecover = findItem(id, this.tasks.deleted);

      this.tasks.default.push(taskToRecover);
      this.tasks.deleted = this.tasks.deleted.filter((task) => task !== taskToRecover);
    },
    deleteAllTasks(): void {
      const delTasks = [...this.tasks.default];

      this.tasks.deleted.push(...delTasks);
      this.tasks.default = [];
      this.tasks.temp.push(...delTasks);
    },
    undoDeleteAllTasks(): void {
      this.tasks.default = [...this.tasks.default, ...this.tasks.temp];
      this.tasks.temp = [];
    },
  },
});
