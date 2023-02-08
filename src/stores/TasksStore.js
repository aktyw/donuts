import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';
import { toggleProp } from '@/helpers/toggleProp';

export const useStoreTasks = defineStore('tasks', {
  state: () => {
    return {
      tasks: [],
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
  },
  actions: {
    addTask(content) {
      const id = uuid();
      const newTask = {
        id,
        content,
        done: false,
        isImportant: false,
      };
      this.tasks.unshift(newTask);
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
    toggleIsDone(id) {
      toggleProp(id, 'done', this.tasks);
    },
    toggleIsImportant(id) {
      toggleProp(id, 'isImportant', this.tasks);
    },
  },
});
