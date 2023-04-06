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
    getMenuStatus(state): boolean {
      return state.settings.isMenuOpen;
    },
  },
  actions: {
    toggleMenu(): void {
      this.settings.isMenuOpen = !this.settings.isMenuOpen;
    },
    setHomeView(id: string): void {
      this.settings.homeView = id;
    },
  },
});
