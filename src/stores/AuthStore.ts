import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { defineStore } from 'pinia';
import type { Router } from 'vue-router';

import { useSettingsStore } from '@/stores/SettingsStore';
import type { AuthFormData } from '@/types/models/Auth';

declare module 'pinia' {
  export interface PiniaCustomProperties {
    router: Router;
  }
}

interface AuthState {
  auth: {};
  user: {
    isAuthenticated: boolean;
    email: string | null | undefined;
  };
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    auth: {},
    user: {
      isAuthenticated: false,
      email: null,
    },
  }),
  getters: {
    isAuthenticated(state) {
      return state.user.isAuthenticated;
    },
  },
  actions: {
    async handleSignUp({ email, password }: AuthFormData): Promise<void> {
      try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        this.user.email = userCredential.user?.email;
      } catch (error) {
        console.log(error.code);
        throw new Error(typeof error === 'string' ? error : 'Failed to Sign Up');
      }
    },
    async handleLogin({ email, password }: AuthFormData): Promise<void> {
      try {
        const auth = getAuth();

        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        this.user.email = userCredential.user?.email;
      } catch (error) {
        console.log(error.code);
        throw new Error(typeof error === 'string' ? error : 'Failed to Log in');
      }
    },
    async handleGoogleAuth(): Promise<void> {
      try {
        const provider = new GoogleAuthProvider();

        const credentials = await signInWithPopup(getAuth(), provider);

        this.router.push('/tasks');
      } catch (error) {
        console.log(error);
      }
    },
    setUser(): void {
      const store = useSettingsStore();
      const auth = getAuth();

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.user.isAuthenticated = true;
        } else {
          this.user.isAuthenticated = false;
        }

        store.setLoadingStatus(false);
      });
    },
    async logout() {
      const auth = getAuth();

      await signOut(auth);

      this.router.push({ path: '/auth/login', replace: true });
    },
  },
});
