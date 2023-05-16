import { defineStore } from 'pinia';

interface AuthState {
  auth: {};
  user: {};
}

export const useSettingsStore = defineStore('auth', {
  state: (): AuthState => ({
    auth: {},
    user: {},
  }),

  getters: {},

  actions: {
    login() {},
    signup(payload) {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[API_KEY]');
    },
  },
});
