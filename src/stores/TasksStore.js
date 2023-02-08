import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';
import { toggleProp } from '@/helpers/toggleProp';

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
    addTask(content) {
      const id = uuid();
      const newTask = {
        id,
        content,
        done: false,
        isImportant: false,
        subtasks: {},
      };
      this.tasks.unshift(newTask);
    },
    deleteTask(id) {
      const toDeleteTask = this.tasks.find((task) => task.id === id);
      this.deletedTasks.push(toDeleteTask);
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
  },
});
