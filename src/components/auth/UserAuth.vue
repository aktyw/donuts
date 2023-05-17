<template>
  <div class="flex flex-col w-full lg:w-1/2 gap-4 text-center">
    <div class="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
      <div class="card-body">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input
            v-model.trim="formData.email"
            type="text"
            placeholder="email"
            class="input input-bordered" />
          <span
            v-if="v$.email.$error"
            class="label-text text-red-500"
            >{{ v$.email.$errors[0].$message }}</span
          >
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input
            v-model.trim="formData.password"
            type="text"
            placeholder="password"
            class="input input-bordered" />
          <span
            v-if="v$.password.$error"
            class="label-text text-red-500"
            >{{ v$.password.$errors[0].$message }}</span
          >
          <label
            v-if="isLogin"
            class="label">
            <a
              href="#"
              class="label-text-alt link link-hover"
              >Forgot password?</a
            >
          </label>
        </div>
        <div class="flex flex-row justify-between flex-1 form-control mt-6">
          <button
            class="btn btn-primary w-full"
            @click.prevent="submitForm">
            {{ isLogin ? 'Log in' : 'Sign up' }}
          </button>
        </div>
      </div>
    </div>
    <router-link
      v-if="isLogin"
      to="signup"
      class="link text-primary pt-4">
      Don't have an account? Sign up!
    </router-link>
    <router-link
      v-if="isSignup"
      to="login"
      class="link text-primary pt-4">
      Already have an account? Log in!
    </router-link>

    <BaseModal
      v-if="!!errorMsg"
      modal-title="Something goes wrong. Error!"
      close-title="Close"
      @close-editor="handleError">
      <span class="text-red-500">{{ errorMsg }}</span>
    </BaseModal>
    <BaseModal
      v-if="isLoading"
      modal-title="Authenticating..."
      close-title="Close"
      @close-editor="closeModal">
      <BaseLoader />
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { email, maxLength, minLength, required } from '@vuelidate/validators';
import { computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

import BaseLoader from '@/components/base/BaseLoader.vue';
import BaseModal from '@/components/base/BaseModal.vue';
import { useAuthStore } from '@/stores/AuthStore';
import type { AuthFormData } from '@/types/models/Auth';

const route = useRoute();

const authStore = useAuthStore();
const isLogin = computed(() => route.name === 'login');
const isSignup = computed(() => route.name === 'signup');
const isLoading = ref(false);
const errorMsg = ref(null);

const formData: AuthFormData = reactive({
  email: '',
  password: '',
});

const rules = computed(() => {
  return {
    email: { required, email },
    password: { required, minLength: minLength(6), maxLength: maxLength(64) },
  };
});

const v$ = useVuelidate(rules, formData, { $lazy: true });

async function handleLogin() {
  try {
    await authStore.login(formData);
  } catch (error) {
    errorMsg.value = error || 'Failed to log in. Try again later';
  }
}

async function handleSignup() {
  try {
    await authStore.signup(formData);
  } catch (error) {
    errorMsg.value = error || 'Failed to sign up. Check your data or try again later';
  }
}

async function submitForm() {
  try {
    const result = await v$.value.$validate();

    if (!result) return;

    isLoading.value = true;
    if (isLogin.value) {
      await handleLogin();
    } else {
      await handleSignup();
    }
  } catch (error) {
    errorMsg.value = error || 'Failed to authenticate. Try again later';
  }
  isLoading.value = false;
}

function closeModal() {
  isLoading.value = false;
}

function handleError() {
  errorMsg.value = null;
}
</script>