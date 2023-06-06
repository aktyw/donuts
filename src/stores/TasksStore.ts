import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

import { useNotification } from '@/composables/useNotification';
import { useTrackingEvent } from '@/composables/useTrackingEvent';
import { breakConnection, hasParent } from '@/helpers/breakConnection';
import { isToday } from '@/helpers/checkTime';
import { completeNestedTasks } from '@/helpers/completeNestedTasks';
import { createNewTask } from '@/helpers/createNewTask';
import { deleteNestedTasks } from '@/helpers/deleteNestedTasks';
import { duplicateNestedTasks } from '@/helpers/duplicateNestedTasks';
import { findIndex } from '@/helpers/findIndex';
import { findItem } from '@/helpers/findItem';
import { moveNestedTasks } from '@/helpers/moveNestedTasks';
import { recoverNestedTasks } from '@/helpers/recoverNestedTasks';
import { useProjectsStore } from '@/stores/ProjectsStore';
import { useStatsStore } from '@/stores/StatsStore';
import { Filters } from '@/types/models/Filters';
import type { Notification } from '@/types/models/Notification';
import { NotificationAction, NotificationMessage } from '@/types/models/Notification';
import { SortFilters, SortOrder } from '@/types/models/Sort';
import type { TasksState } from '@/types/models/State';
import type { Task } from '@/types/models/Task';

export const useTasksStore = defineStore('tasks', {
  state: (): TasksState => ({
    tasks: useStorage(
      'tasks',
      {
        default: [],
        deleted: [],
        temp: [],
        currentFilter: Filters.Active,
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
    getRootTasks(state): Task[] {
      return state.tasks.default.filter((task: Task) => !task.parentId);
    },
    getProjectTasks(state): (projectId: string) => Task[] {
      return (projectId = 'inbox') => {
        return state.tasks.default.filter((task) => task.projectId === projectId);
      };
    },
    getRootProjectTasks(state): (projectId: string) => Task[] {
      return (projectId = 'inbox') => {
        return state.tasks.default.filter((task) => task.projectId === projectId && !task.parentId);
      };
    },
    getProjectTasksNotActive(state): (projectId: string) => Task[] {
      return (projectId = 'inbox') => {
        return state.tasks.default.filter((task) => task.projectId === projectId && !task.isDone);
      };
    },
    getTodayTasks(state): Task[] {
      return state.tasks.default.filter((task: Task) => {
        const projectsStore = useProjectsStore();

        const activeProjectsId = projectsStore.getAllActiveProjects.map((p) => p.id);
        const taskProjectIsActive = activeProjectsId.includes(task.projectId);

        if (task.date && isToday(task.date) && taskProjectIsActive) {
          return task;
        }
      });
    },
    getTaskById(state): (id: string) => Task | undefined {
      return (id: string): Task | undefined => {
        return state.tasks.default.find((task) => task.id === id);
      };
    },
    getDeletedTaskById(state): (id: string) => Task | undefined {
      return (id: string): Task | undefined => {
        return state.tasks.deleted.find((task) => task.id === id);
      };
    },
    getAllTasksById(): (ids: string[]) => Task[] | undefined {
      return (ids: string[]): Task[] | undefined => {
        return ids.map((id) => this.getTaskById(id)) as Task[];
      };
    },
    getPriorityTasks(state): Task[] {
      return state.tasks.default.filter((task) => task.isPriority);
    },
    getCompletedTasks(state): Task[] {
      return state.tasks.default.filter((task) => task.isDone);
    },
    getNotCompletedTasks(state): Task[] {
      return state.tasks.default.filter((task) => !task.isDone);
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
    addTask(options: Task) {
      const newTask = createNewTask(options);

      this.tasks.default.push(newTask);

      if (newTask.parentId) {
        const parent = this.getTaskById(newTask.parentId);

        parent?.childId?.push(newTask.id);
      }

      useNotification(NotificationMessage.TaskAdd);
      useTrackingEvent({ action: 'Add', name: newTask.title, id: newTask.id, projectId: newTask.projectId });
    },
    addNotification(message: string, id: string) {
      let actionLabel;
      let action;

      if (message === NotificationMessage.TaskDelete) {
        actionLabel = 'undo';
        action = NotificationAction.TaskDelete;
      } else if (message === NotificationMessage.TasksAllDelete) {
        actionLabel = 'undo';
        action = NotificationAction.TasksAllDelete;
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

      if (!this.notifications.some((notification) => notification.action === NotificationAction.TasksAllDelete)) {
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
      this.tasks.currentFilter = Filters.Active;
    },
    resetSortSettings(): void {
      this.sort.type = SortFilters.Default;
      this.sort.order = SortOrder.Ascending;
    },
    sortTasksChangeOrder(): void {
      this.sort.order = this.sort.order === SortOrder.Ascending ? SortOrder.Descending : SortOrder.Ascending;
    },
    toggleIsDone(id: string) {
      const statsStore = useStatsStore();

      const index = findIndex(id, this.tasks.default);

      const tasksCompletedBefore = this.tasks.default.filter((task: Task) => task.isDone).length;

      completeNestedTasks(this.tasks.default[index], !this.tasks.default[index]['isDone']);

      const tasksCompletedAfter = this.tasks.default.filter((task: Task) => task.isDone).length;

      const amountOfCompletedTasks = Math.abs(tasksCompletedAfter - tasksCompletedBefore);

      statsStore.updateStats(tasksCompletedAfter - tasksCompletedBefore);

      this.tasks.default[index]['isDone']
        ? useNotification(
            amountOfCompletedTasks > 1
              ? `Tasks completed (${amountOfCompletedTasks})`
              : NotificationMessage.TaskComplete
          )
        : useNotification(
            amountOfCompletedTasks > 1
              ? `Tasks activated (${amountOfCompletedTasks})`
              : NotificationMessage.TaskActivate
          );
    },
    toggleIsPriority(id: string) {
      const index = findIndex(id, this.tasks.default);

      this.tasks.default[index]['isPriority'] = !this.tasks.default[index]['isPriority'];

      useNotification(NotificationMessage.TaskPriority);
    },
    updateTask(id: string, content: Partial<Task>): void {
      const task = findItem(id, this.tasks.default);
      const index = findIndex(id, this.tasks.default);

      this.tasks.default[index] = { ...task, ...content };

      useNotification(NotificationMessage.TaskUpdate);
      useTrackingEvent({ action: 'Update', name: task.title, id: task.id, projectId: task.projectId });
    },
    updateDate(id: string, date: Date): void {
      const task = findItem(id, this.tasks.default);

      task.date = date;

      useNotification(NotificationMessage.TaskDateUpdate);
      useTrackingEvent({ action: 'Update', name: task.title, id: task.id, projectId: task.projectId });
    },
    moveTask(id: string, projectId: string) {
      const rootTask = findItem(id, this.tasks.default);

      if (hasParent(rootTask)) {
        breakConnection(rootTask);
      }

      moveNestedTasks(rootTask, projectId);

      useNotification(NotificationMessage.TaskMove);
    },
    duplicateTask(id: string, projectId?: string): void {
      const task = findItem(id, this.tasks.default);

      duplicateNestedTasks(task, undefined, projectId);

      if (projectId) return;
      useNotification(NotificationMessage.TaskDuplicate);
    },
    deleteTask(id: string): void {
      const rootTask = findItem(id, this.tasks.default);

      if (hasParent(rootTask)) {
        breakConnection(rootTask);
      }

      deleteNestedTasks(rootTask);

      useNotification(NotificationMessage.TaskDelete, id);
    },
    undoDeleteTask(id: string): void {
      const taskToRecover = findItem(id, this.tasks.deleted);

      recoverNestedTasks(taskToRecover);
    },
    deleteAllProjectTasks(projectId: string): void {
      const hasSameProject = (task: Task) => task.projectId === projectId;

      const delTasks = [...this.tasks.default.filter(hasSameProject)];

      this.tasks.deleted.push(...delTasks);
      this.tasks.default = this.tasks.default.filter((task) => task.projectId !== projectId);
      this.tasks.temp.push(...delTasks);

      useNotification(NotificationMessage.TasksAllDelete);
    },
    deleteAllCompletedProjectTasks(projectId: string) {
      const delTasks = [...this.tasks.default.filter((task) => task.projectId === projectId && task.isDone)];

      const delTasksIds = delTasks.map((task) => task.id);

      this.tasks.deleted.push(...delTasks);
      this.tasks.default = this.tasks.default.filter((task) => !delTasksIds.includes(task.id));
      this.tasks.temp.push(...delTasks);

      useNotification(NotificationMessage.TasksAllCompletedDelete);
    },
    deleteAllTasks(): void {
      const delTasks = [...this.tasks.default];

      this.tasks.deleted.push(...delTasks);
      this.tasks.default = [];
      this.tasks.temp.push(...delTasks);

      useNotification(NotificationMessage.TasksAllDelete);
    },
    clearAllDeletedTasks(): void {
      this.tasks.deleted = [];
    },
    undoDeleteAllTasks(): void {
      this.tasks.default = [...this.tasks.default, ...this.tasks.temp];
      this.tasks.temp = [];
    },
  },
});
