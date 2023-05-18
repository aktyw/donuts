import { defineStore } from 'pinia';
import type { Router } from 'vue-router';

import type { AuthCredentials, AuthFormDataAction } from '@/types/models/Auth';

declare module 'pinia' {
  export interface PiniaCustomProperties {
    router: Router;
  }
}

interface AuthState {
  auth: {
    userId: string | null;
    token: string | null;
    timer: ReturnType<typeof setTimeout> | number | null;
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
      timer: null,
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
    async handleAuth({ email, password, action }: AuthFormDataAction): Promise<void> {
      let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDY-YmO16QD2UM7D3l1s7QeBa7o0Sl571w';

      if (action === 'login') {
        url =
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDY-YmO16QD2UM7D3l1s7QeBa7o0Sl571w';
      }

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || `Failed to authenticate. Check your data. HTTP ${response.status}`);
      }

      const expiresIn = 5000;
      // const expiresIn = +responseData.expiresIn * 1000;
      const expirationDate = new Date().getTime() + expiresIn;

      localStorage.setItem('token', responseData.idToken);
      localStorage.setItem('userId', responseData.localId);
      localStorage.setItem('tokenExpiration', expirationDate.toString());

      this.auth.timer = setTimeout(() => {
        this.logout();
      }, expiresIn);

      this.auth.token = responseData.idToken;
      this.auth.userId = responseData.localId;
      this.user.email = responseData.email;
    },
    autoLogin() {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const tokenExpiration = localStorage.getItem('tokenExpiration') || 0;

      const expiresIn = +tokenExpiration - new Date().getTime();

      if (expiresIn < 0) {
        return;
      }

      this.auth.timer = setTimeout(() => {
        this.logout();
      }, expiresIn);

      if (token && userId) {
        this.setUser({ token: token, userId: userId });
      }
    },
    setUser({ token, userId }: AuthCredentials) {
      this.auth.token = token;
      this.auth.userId = userId;
    },
    clearTimer() {
      if (this.auth.timer) {
        clearTimeout(this.auth.timer);
        this.auth.timer = null;
      }
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('tokenExpiration');

      this.clearTimer();
      this.auth.token = null;
      this.auth.userId = null;

      this.router.push({ path: '/auth/login', replace: true });
    },
  },
});
