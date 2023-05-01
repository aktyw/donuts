import { defineStore } from 'pinia';

interface SettingsState {
  settings: {
    isMenuOpen: boolean;
    homeView: string;
    modals: {
      [isTaskDeleteConfirmOpen: string]: boolean;
    };
  };
}

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsState => ({
    settings: {
      isMenuOpen: true,
      homeView: 'inbox',
      modals: {
        isConfirmDeleteOpen: false,
      },
    },
  }),
  getters: {
    getHomeView(state): string {
      return state.settings.homeView;
    },
    getMenuStatus(state): boolean {
      return state.settings.isMenuOpen;
    },
    getModalStatus(state): (modal: string) => boolean {
      return (modal: string): boolean => {
        return state.settings.modals[modal];
      };
    },
  },
  actions: {
    toggleModal(modal: string): void {
      this.settings.modals[modal] = !this.settings.modals[modal];
    },
    setModal(payload: { modal: string; value: boolean }): void {
      this.settings.modals[payload.modal] = payload.value;
    },
    toggleMenu(): void {
      this.settings.isMenuOpen = !this.settings.isMenuOpen;
    },
    setHomeView(id: string): void {
      this.settings.homeView = id;
    },
  },
});
