import { useDark } from '@vueuse/core';
import { defineStore } from 'pinia';

import type { Mode, ThemesId } from '@/types/models/Themes';

interface SettingsState {
  settings: {
    isMenuOpen: boolean;
    homeView: string;
    theme: {
      isAutoDarkMode: boolean;
      current: {
        id: ThemesId;
        mode: Mode;
      };
      default: {
        light: {
          id: ThemesId;
        };
        dark: {
          id: ThemesId;
        };
      };
    };
    isModalOpen: {
      task: boolean;
      [deleteTaskConfirm: string]: boolean;
      calendar: boolean;
      moveProject: boolean;
      userSettings: boolean;
      deleteAccount: boolean;
    };
    parentModalRoute: string;
    isFooterActionActive: boolean;
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
      theme: {
        isAutoDarkMode: true,
        current: {
          id: 'crystal',
          mode: 'light',
        },
        default: {
          light: {
            id: 'crystal',
          },
          dark: {
            id: 'midnight',
          },
        },
      },
      isModalOpen: {
        task: false,
        deleteTaskConfirm: false,
        calendar: false,
        moveProject: false,
        userSettings: false,
        deleteAccount: false,
      },
      parentModalRoute: '/',
      isFooterActionActive: false,
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
    getAutoDarkModeState(state): boolean {
      return state.settings.theme.isAutoDarkMode;
    },
    getCurrentTheme(state): { id: ThemesId; mode: Mode } {
      return state.settings.theme.current;
    },
    getDefaultTheme(state): (mode: Mode) => ThemesId {
      return (mode: Mode) => state.settings.theme.default[mode].id;
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
    setAutoDarkMode(value: boolean): void {
      this.settings.theme.isAutoDarkMode = value;
    },
    setTheme(id: ThemesId, mode: Mode): void {
      const isDark = useDark();
      const isAutoDark = this.getAutoDarkModeState;

      mode === 'light' ? (this.settings.theme.default.light.id = id) : (this.settings.theme.default.dark.id = id);

      const isThemeMatched = () => (isDark.value && mode === 'dark') || (!isDark.value && mode === 'light');

      if (isThemeMatched() || !isAutoDark) {
        this.setCurrentTheme(id, mode);
      }
    },
    setCurrentTheme(id: ThemesId, mode: Mode): void {
      this.settings.theme.current = { id, mode };
    },
  },
});
