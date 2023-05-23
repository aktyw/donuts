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
    name: string | null | undefined;
  };
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    auth: {},
    user: {
      isAuthenticated: false,
      email: null,
      name: null,
    },
  }),
  getters: {
    isAuthenticated(state) {
      return state.user.isAuthenticated;
    },
    getEmail(state) {
      return state.user.email;
    },
    getName(state) {
      return state.user.name;
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

        console.log(this.user.email);

        this.user.email = userCredential.user?.email;
        this.user.name = userCredential.user?.displayName || this.user.email?.slice(5);
      } catch (error) {
        console.log(error.code);
        throw new Error(typeof error === 'string' ? error : 'Failed to Log in');
      }
    },
    async handleGoogleAuth(): Promise<void> {
      try {
        const provider = new GoogleAuthProvider();

        const userCredential = await signInWithPopup(getAuth(), provider);

        this.user.email = userCredential.user?.email;
        this.user.name = userCredential.user?.displayName || this.user.email?.slice(5);
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

          this.user.email = user?.email;
          this.user.name = user?.displayName || this.user.email?.slice(5);
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
