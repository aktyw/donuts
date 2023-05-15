import { defineStore } from 'pinia';

interface SettingsState {
  settings: {
    isMenuOpen: boolean;
    homeView: string;
    isModalOpen: {
      task: boolean;
      [deleteTaskConfirm: string]: boolean;
      calendar: boolean;
      moveProject: boolean;
    };
    isTransitionActive: {
      [projectRecord: string]: boolean;
    };
  };
}

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsState => ({
    settings: {
      isMenuOpen: true,
      homeView: 'inbox',
      isModalOpen: {
        task: false,
        deleteTaskConfirm: false,
        calendar: false,
        moveProject: false,
      },
      isTransitionActive: {
        projectRecord: true,
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
        return state.settings.isModalOpen[modal];
      };
    },
    getTransitionStatus(state): (transition: string) => boolean {
      return (transition: string): boolean => {
        return state.settings.isTransitionActive[transition];
      };
    },
  },

  actions: {
    toggleModal(modal: string): void {
      this.settings.isModalOpen[modal] = !this.settings.isModalOpen[modal];
    },
    setModal(payload: { modal: string; value: boolean }): void {
      this.settings.isModalOpen[payload.modal] = payload.value;
    },
    setTransitionStatus(payload: { transition: string; value: boolean }): void {
      this.settings.isTransitionActive[payload.transition] = payload.value;
    },
    toggleMenu(): void {
      this.settings.isMenuOpen = !this.settings.isMenuOpen;
    },
    setHomeView(id: string): void {
      this.settings.homeView = id;
    },
  },
});
