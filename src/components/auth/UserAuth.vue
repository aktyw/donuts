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
            class="label-text text-red-500">
            {{ v$.email.$errors[0].$message }}
          </span>
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
            class="label-text text-red-500">
            {{ v$.password.$errors[0].$message }}
          </span>
          <label
            v-if="requestLogin"
            class="label">
            <a
              href="#"
              class="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
          <pre>dwadwa@wp.pl</pre>
        </div>
        <div class="flex flex-row justify-between flex-1 form-control mt-6">
          <div class="flex flex-col gap-6 w-full">
            <BaseButton
              class="btn btn-primary w-full"
              @click.prevent="submitForm">
              {{ requestLogin ? 'Log in' : 'Sign up' }}
            </BaseButton>
            <BaseButton
              class="btn btn-ghost flex gap-2 border-primary text-base-content w-full"
              @click.prevent="signInWithGoogle">
              <template #icon>
                <IconGoogle />
              </template>
              {{ requestLogin ? 'Continue with Google' : 'Sign up with Google' }}
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
    <router-link
      v-if="requestLogin"
      to="signup"
      class="link text-primary pt-4">
      Don't have an account? Sign up!
    </router-link>
    <router-link
      v-if="requestSignup"
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
import { computed, reactive, type Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import BaseButton from '@/components/base/BaseButton.vue';
import BaseLoader from '@/components/base/BaseLoader.vue';
import BaseModal from '@/components/base/BaseModal.vue';
import IconGoogle from '@/components/icons/IconGoogle.vue';
import { MAX_PASS_LENGTH, MIN_PASS_LENGTH } from '@/config/index';
import { useAuthStore } from '@/stores/AuthStore';
import type { AuthFormData } from '@/types/models/Auth';

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();
const requestLogin = computed(() => route.name === 'login');
const requestSignup = computed(() => route.name === 'signup');
const isLoading = ref(false);
const errorMsg: Ref<string | null> = ref(null);

const formData: AuthFormData = reactive({
  email: '',
  password: '',
});

const rules = computed(() => {
  return {
    email: { required, email },
    password: { required, minLength: minLength(MIN_PASS_LENGTH), maxLength: maxLength(MAX_PASS_LENGTH) },
  };
});

const v$ = useVuelidate(rules, formData, { $lazy: true });

async function validateForm() {
  try {
    await v$.value.$validate();
  } catch (error) {
    console.log(error);
  }
}

async function submitForm() {
  try {
    await validateForm();

    isLoading.value = true;
    if (requestSignup.value) await handleSignUp();
    if (requestLogin.value) await handleLogin();
  } catch (error) {
    errorMsg.value = typeof error === 'string' ? error : 'Failed to authenticate. Try again later';
  } finally {
    isLoading.value = false;
  }
}

async function handleSignUp() {
  try {
    await authStore.handleSignUp(formData);
    router.push('/tasks');
  } catch (error) {
    errorMsg.value = typeof error === 'string' ? error : 'Failed to authenticate. Try again later';
  }
}

async function handleLogin() {
  try {
    await authStore.handleLogin(formData);
    router.push('/tasks');
  } catch (error) {
    console.log(error);
    errorMsg.value = typeof error === 'string' ? error : 'Failed to authenticate. Try again later';
  }
}

async function signInWithGoogle() {
  try {
    await authStore.handleGoogleAuth();
    router.push('/tasks');
  } catch (error) {
    console.error(error);
  }
}

function closeModal() {
  isLoading.value = false;
}

function handleError() {
  errorMsg.value = null;
}
</script>
