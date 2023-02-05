import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';

export const useStoreTasks = defineStore('tasks', {
  state: () => {
    return {
      tasks: [],
    };
  },
  getters: {
    getTask(state) {
      console.log(this.tasks);
    },
  },
  actions: {
    addTask(content) {
      const id = uuid();
      const newTask = {
        id,
        content,
        done: false
      };
      this.tasks.unshift(newTask);
    },
  },
});
