import { defineStore } from 'pinia';
export const useSettingsStore = defineStore('settings', {
  state: () => ({
    settings: {
      isMenuOpen: false,
      homeView: 'inbox',
    },
  }),
  getters: {
    getHomeView(state): string {
      return state.settings.homeView;
    },
  },
  actions: {
    toggleMenu(): void {
      this.settings.isMenuOpen = !this.settings.isMenuOpen;
    },
    setHomeView(view: string): void {
      this.settings.homeView = view;
    },
  },
});
