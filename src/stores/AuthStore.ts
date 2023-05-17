import { email } from '@vuelidate/validators';
import { defineStore } from 'pinia';

import type { AuthFormData } from '@/types/models/Auth';

interface AuthState {
  auth: {
    userId: string | null;
    token: string | null;
    tokenExpiration: number | null;
  };
  user: {
    email: string | null;
  };
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    auth: {
      userId: null,
      token: null,
      tokenExpiration: null,
    },
    user: {
      email: null,
    },
  }),

  getters: {
    getToken(state) {
      return state.auth.token;
    },
    isAuthenticated(state) {
      return !!state.auth.token;
    },
  },

  actions: {
    async login(payload: AuthFormData) {
      const url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDY-YmO16QD2UM7D3l1s7QeBa7o0Sl571w';
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      });
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || `Failed to authenticate. Check your data. HTTP ${response.status}`);
      }

      this.auth.token = responseData.idToken;
      this.auth.userId = responseData.localId;
      this.auth.tokenExpiration = responseData.expiresIn;
      this.user.email = responseData.email;
    },
    async signup(payload: AuthFormData) {
      const url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDY-YmO16QD2UM7D3l1s7QeBa7o0Sl571w';
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      });

      const responseData = await response.json();

      console.log(responseData);

      if (!response.ok) {
        throw new Error(responseData.message || `Failed to authenticate. Check your data. HTTP ${response.status}`);
      }

      this.auth.token = responseData.idToken;
      this.auth.userId = responseData.localId;
      this.auth.tokenExpiration = responseData.expiresIn;

      console.log(responseData);
    },
    logout() {
      this.auth.token = null;
      this.auth.userId = null;
      this.auth.tokenExpiration = null;
    },
  },
});
