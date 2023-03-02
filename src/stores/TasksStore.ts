import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';
import { findItem } from '@/helpers/findItem';
import { findIndex } from '@/helpers/findIndex';
import type { Task } from '@/types/models/Task';
import type { State } from '@/types/models/State';

export const useStoreTasks = defineStore('tasks', {
  state: (): State => ({
    tasks: [],
    deletedTasks: [],
  }),
  getters: {
    getAllTasks(state): Task[] {
      return state.tasks;
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
    getTaskDate(state) {
      return (id: string) => state.tasks.find((task) => task.id === id).date;
    },
    getTasksSortedByDeadlineDate(state): Task[] {
      return state.tasks.sort((taskA, taskB) => taskA.date - taskB.date);
    },
    getTasksSortedByTitle(state): Task[] {
      return state.tasks.sort((taskA, taskB) => taskA.content.localeCompare(taskB.content));
    },
    getTasksSortedByCreationDate(state): Task[] {
      return state.tasks.sort((taskA, taskB) => taskA.createdAt.getTime() - taskB.createdAt.getTime());
    },
  },
  actions: {
    addTask(content: string, date: string) {
      const id = uuid();
      const newTask: Task = {
        id,
        content,
        done: false,
        isImportant: false,
        date: date || null,
        createdAt: new Date(),
        subtasks: {},
      };

      this.tasks.unshift(newTask);
    },
    deleteTask(id: string): void {
      const taskToDel = findItem(id, this.tasks);

      this.deletedTasks.push(taskToDel);
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
    toggleIsDone(id: string) {
      const index = findIndex(id, this.tasks);

      this.tasks[index]['done'] = !this.tasks[index]['done'];
    },
    toggleIsImportant(id: string) {
      const index = findIndex(id, this.tasks);

      this.tasks[index]['isImportant'] = !this.tasks[index]['isImportant'];
    },
    undoDelete(task: Task): void {
      this.tasks.unshift(task);
    },
    updateTask(id: string, content: string): void {
      const task = findItem(id, this.tasks);

      task.content = content;
    },
    updateDate(id: string, date: string): void {
      const task = findItem(id, this.tasks);

      task.date = date;
    },
    duplicateTask(id: string): void {
      const task = findItem(id, this.tasks);
      const copyTask = JSON.parse(JSON.stringify(task));
      const newId = uuid();

      copyTask.id = newId;
      if (copyTask.date) copyTask.date = new Date(copyTask.date);

      const taskIndex = this.tasks.findIndex((task) => task.id === id);
      const tasksArrStart = this.tasks.slice(0, taskIndex + 1);
      const tasksArrEnd = this.tasks.slice(taskIndex + 1);

      this.tasks = [...tasksArrStart, copyTask, ...tasksArrEnd];
    },
    deleteAllTasks(): void {
      this.deletedTasks.push(...this.tasks);
      this.tasks = [];
    },
  },
});
