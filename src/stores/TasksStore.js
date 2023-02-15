import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';
import { toggleProp } from '@/helpers/toggleProp';
import { findItem } from '@/helpers/findItem';

export const useStoreTasks = defineStore('tasks', {
  state: () => ({
    tasks: [],
    deletedTasks: [],
  }),
  getters: {
    getAllTasks(state) {
      return state.tasks;
    },
    getImportantTasks(state) {
      return state.tasks.filter((task) => task.isImportant);
    },
    getDoneTasks(state) {
      return state.tasks.filter((task) => task.done);
    },
    getNotDoneTasks(state) {
      return state.tasks.filter((task) => !task.done);
    },
    getDeletedTask(state) {
      return state.deletedTasks[this.deletedTasks.length - 1];
    },
    getTaskDate(state) {
      return (id) => state.tasks.find((task) => task.id === id).date;
    },
    getTasksSortedByDeadlineDate(state) {
      return state.tasks.sort((taskA, taskB) => taskA.date - taskB.date);
    },
    getTasksSortedByTitle(state) {
      return state.tasks.sort((taskA, taskB) => taskA.content - taskB.content);
    },
    getTasksSortedByCreationDate(state) {
      return state.tasks.sort((taskA, taskB) => taskA.createdAt - taskB.createdAt);
    },
  },
  actions: {
    addTask(content, date) {
      const id = uuid();
      const newTask = {
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
    deleteTask(id) {
      const taskToDel = findItem(id, this.tasks);

      this.deletedTasks.push(taskToDel);
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
    toggleIsDone(id) {
      toggleProp(id, 'done', this.tasks);
    },
    toggleIsImportant(id) {
      toggleProp(id, 'isImportant', this.tasks);
    },
    undoDelete(task) {
      this.tasks.unshift(task);
    },
    updateTask(id, content) {
      const task = findItem(id, this.tasks);

      task.content = content;
    },
    updateDate(id, date) {
      const task = findItem(id, this.tasks);

      task.date = date;
    },
    duplicateTask(id) {
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
    deleteAllTasks() {
      this.deletedTasks.push(...this.tasks);
      this.tasks = [];
    },
  },
});
