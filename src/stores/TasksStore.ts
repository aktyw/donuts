import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';
import { findItem } from '@/helpers/findItem';
import { findIndex } from '@/helpers/findIndex';
import { SortFilters, SortOrder } from '@/types/models/Sort';
import type { Task } from '@/types/models/Task';
import type { State } from '@/types/models/State';
import type { Notification } from '@/types/models/Notification';
import { Filters } from '@/types/models/Filters';
import { NotificationMessage } from '@/types/models/NotificationMessage';
import { NotificationAction } from '@/types/models/NotificationAction';

export const useStoreTasks = defineStore('tasks', {
  state: (): State => ({
    tasks: {
      default: [],
      sorted: [],
      deleted: [],
      temp: [],
      currentFilter: Filters.All,
    },
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
    getTaskById(state) {
      return (id: string): Task | undefined => {
        return state.tasks.default.find((task) => task.id === id);
      };
    },
    getCurrentFilter(state): Filters {
      return state.tasks.currentFilter;
    },
    getPriorityTasks(state): Task[] {
      return state.tasks.default.filter((task) => task.isPriority);
    },
    getDoneTasks(state): Task[] {
      return state.tasks.default.filter((task) => task.done);
    },
    getNotDoneTasks(state): Task[] {
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
  },
  actions: {
    addTask({
      title,
      description,
      date,
      isPriority,
    }: {
      title: string;
      description: string;
      date: Date | undefined;
      isPriority: boolean;
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
      };

      this.tasks.default.push(newTask);
      this.copyTasksState();
    },
    setDefaultPosition(tasks: Task[]): void {
      this.tasks.default = tasks;
    },
    copyTasksState(): void {
      this.tasks.sorted = [...this.tasks.default];
      this.sortTasks(this.sort.type);
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
    sortTasks(type: SortFilters) {
      this.sort.type = type;
      if (this.sort.type === SortFilters.Default) return;

      switch (type) {
        case SortFilters.Created:
          this.tasks.sorted = [...this.tasks.default].sort(
            (taskA, taskB) => taskB.createdAt.getTime() - taskA.createdAt.getTime()
          );
          break;
        case SortFilters.Date:
          this.tasks.sorted = [...this.tasks.default].sort(
            (taskA, taskB) => (taskA.date?.getTime() || Infinity) - (taskB.date?.getTime() || Infinity)
          );
          break;
        case SortFilters.Title:
          this.tasks.sorted = [...this.tasks.default].sort((taskA, taskB) => taskA.title.localeCompare(taskB.title));
          break;
      }

      if (this.sort.order === SortOrder.Descending) {
        this.tasks.sorted = this.tasks.sorted.reverse();
      }
    },
    setFilter(type: Filters): void {
      this.tasks.currentFilter = type;
    },
    resetView(): void {
      this.sortToDefault();
      this.tasks.currentFilter = Filters.All;
    },
    sortToDefault(): void {
      this.sort.type = SortFilters.Default;
      this.sort.order = SortOrder.Ascending;
    },
    sortTasksChangeOrder(): void {
      this.sort.order = this.sort.order === SortOrder.Ascending ? SortOrder.Descending : SortOrder.Ascending;
      this.sortTasks(this.sort.type);
    },
    toggleIsDone(id: string) {
      const index = findIndex(id, this.tasks.default);

      this.tasks.default[index]['done'] = !this.tasks.default[index]['done'];
      this.copyTasksState();
    },
    toggleIsPriority(id: string) {
      const index = findIndex(id, this.tasks.default);

      this.tasks.default[index]['isPriority'] = !this.tasks.default[index]['isPriority'];
      this.copyTasksState();
    },

    updateTask(id: string, title: string): void {
      const task = findItem(id, this.tasks.default);

      task.title = title;
      this.sortTasks(this.sort.type);
      this.copyTasksState();
    },
    updateDate(id: string, date: Date): void {
      const task = findItem(id, this.tasks.default);

      task.date = date;
      this.sortTasks(this.sort.type);
      this.copyTasksState();
    },
    duplicateTask(id: string): void {
      const task = findItem(id, this.tasks.default);
      const copyTask = JSON.parse(JSON.stringify(task));
      const newId = uuid();
      const newCreatedAt = new Date();

      copyTask.id = newId;
      copyTask.createdAt = newCreatedAt;
      if (copyTask.date) copyTask.date = new Date(copyTask.date);

      const taskIndex = this.tasks.default.findIndex((task) => task.id === id);
      const tasksArrStart = this.tasks.default.slice(0, taskIndex + 1);
      const tasksArrEnd = this.tasks.default.slice(taskIndex + 1);

      this.tasks.default = [...tasksArrStart, copyTask, ...tasksArrEnd];
      this.sortTasks(this.sort.type);
      this.copyTasksState();
    },
    deleteTask(id: string): void {
      const taskToDel = findItem(id, this.tasks.default);

      this.tasks.deleted.push(taskToDel);
      this.tasks.default = this.tasks.default.filter((task) => task !== taskToDel);
      this.copyTasksState();
    },
    undoDeleteTask(id: string): void {
      const taskToRecover = findItem(id, this.tasks.deleted);

      this.tasks.default.push(taskToRecover);
      this.tasks.deleted = this.tasks.deleted.filter((task) => task !== taskToRecover);
      this.sortTasks(this.sort.type);
      this.copyTasksState();
    },
    deleteAllTasks() {
      const delTasks = [...this.tasks.default];

      this.tasks.deleted.push(...delTasks);
      this.tasks.default = [];
      this.tasks.temp.push(...delTasks);
      this.copyTasksState();
    },
    undoDeleteAllTasks(): void {
      this.tasks.default = [...this.tasks.default, ...this.tasks.temp];
      this.tasks.temp = [];
      this.sortTasks(this.sort.type);
      this.copyTasksState();
    },
  },
});
