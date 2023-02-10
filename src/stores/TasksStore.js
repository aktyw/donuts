import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';
import { toggleProp } from '@/helpers/toggleProp';
import { findItem } from '@/helpers/findItem';

export const useStoreTasks = defineStore('tasks', {
  state: () => {
    return {
      tasks: [],
      deletedTasks: [],
    };
  },
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
      this.tasks;
    },
    updateDate(id, date) {
      const task = findItem(id, this.tasks);
      task.date = date;
    },
  },
});
