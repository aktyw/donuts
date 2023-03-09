import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';
import { findItem } from '@/helpers/findItem';
import { findIndex } from '@/helpers/findIndex';
import type { Task } from '@/types/models/Task';
import type { State } from '@/types/models/State';
import { SortFilters } from '@/types/models/SortFilters';

export const useStoreTasks = defineStore('tasks', {
  state: (): State => ({
    tasks: [],
    sortType: SortFilters.Default,
    deletedTasks: [],
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
    getTasksSortedByDeadlineDate(state): Task[] {
      return state.tasks.sort((taskA, taskB) => (taskB.date?.getTime() ?? 1) - (taskA.date?.getTime() ?? 1));
    },
    getTasksSortedByTitle(state): Task[] {
      return state.tasks.sort((taskA, taskB) => taskA.content.localeCompare(taskB.content));
    },
    getTasksSortedByCreationDate(state): Task[] {
      return state.tasks.sort((taskA, taskB) => taskA.createdAt.getTime() - taskB.createdAt.getTime());
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
    },
    sortTasks(type: SortFilters) {
      switch (type) {
        case SortFilters.Created:
          this.tasks = this.tasks.sort((taskA, taskB) => taskA.createdAt.getTime() - taskB.createdAt.getTime());
          break;
        case SortFilters.Date:
          this.tasks = this.tasks.sort((taskA, taskB) => {
            console.log(taskA.date?.getTime() ?? Infinity, taskB.date?.getTime() ?? Infinity);

            return (taskB.date?.getTime() ?? Infinity) - (taskA.date?.getTime() ?? Infinity);
          });
          break;
        case SortFilters.Title:
          this.tasks = this.tasks.sort((taskA, taskB) => taskA.content.localeCompare(taskB.content));
          break;
      }
    },
    sortTasksReverse(): void {
      this.tasks = this.tasks.reverse();
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
    },
    updateDate(id: string, date: Date): void {
      const task = findItem(id, this.tasks);

      task.date = date;
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
    },
    deleteTask(id: string): void {
      const taskToDel = findItem(id, this.tasks);

      this.deletedTasks.push(taskToDel);
      this.tasks = this.tasks.filter((task) => task !== taskToDel);
    },
    undoDeleteTask(task: Task): void {
      this.tasks.unshift(task);
    },
    deleteAllTasks(): void {
      this.deletedTasks.push(...this.tasks);
      this.tasks = [];
    },
  },
});
