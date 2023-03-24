import { defineStore } from 'pinia';
export const useSettingsStore = defineStore('settings', {
  state: () => ({
    settings: {
      menuIsOpen: false,
    },
  }),
  getters: {},
  actions: {
    toggleMenu(): void {
      this.settings.menuIsOpen = !this.settings.menuIsOpen;
    },
  },
});
