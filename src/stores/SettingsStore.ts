import { defineStore } from 'pinia';

interface SettingsState {
  settings: {
    isMenuOpen: boolean;
    homeView: string;
    isFooterActionActive: boolean;
    isModalOpen: {
      task: boolean;
      [deleteTaskConfirm: string]: boolean;
      calendar: boolean;
      moveProject: boolean;
      userSettings: boolean;
    };
    parentModalRoute: string;
    isTransitionActive: {
      [projectRecord: string]: boolean;
    };
    isLoading: boolean;
  };
}

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsState => ({
    settings: {
      isMenuOpen: true,
      homeView: 'inbox',
      isFooterActionActive: false,
      isModalOpen: {
        task: false,
        deleteTaskConfirm: false,
        calendar: false,
        moveProject: false,
        userSettings: false,
      },
      parentModalRoute: '/',
      isTransitionActive: {
        projectRecord: true,
      },
      isLoading: true,
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
    getLoadingStatus(state): boolean {
      return state.settings.isLoading;
    },
    getParentModalRoute(state): string {
      return state.settings.parentModalRoute;
    },
    getFooterActionState(state): boolean {
      return state.settings.isFooterActionActive;
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
    setLoadingStatus(value: boolean) {
      this.settings.isLoading = value;
    },
    setModalRoute(route: string) {
      this.settings.parentModalRoute = route;
    },
    setFooterActionState(value: boolean) {
      this.settings.isFooterActionActive = value;
    },
  },
});
