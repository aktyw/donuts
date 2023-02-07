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
        done: false,
        isImportant: false,
      };
      this.tasks.unshift(newTask);
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      console.log(this.tasks);
    },
    toggleIsDone(id) {
      toggleProp(id, 'done', this.tasks);
    },
    toggleIsImportant(id) {
      console.log(id)
      toggleProp(id, 'isImportant', this.tasks);
    },
  },
});
