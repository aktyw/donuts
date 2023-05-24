<template>
  <div>
    <p>
      Update the email you use for your Donuts account. Your email is currently <strong>{{ currentEmail }}</strong>
    </p>

    <div class="flex flex-col">
      <label class="label">
        <span class="label-text">New email</span>
      </label>
      <input
        v-model.trim="formData.email"
        type="text"
        class="input input-bordered" />
      <span
        v-if="v$.email.$error"
        class="label-text text-red-500"
        >{{ v$.email.$errors[0].$message }}
      </span>
    </div>
    <div class="flex flex-col">
      <label class="label">
        <span class="label-text">Confirm new email</span>
      </label>
      <input
        v-model.trim="formData.confirmEmail"
        type="text"
        class="input input-bordered" />
      <span
        v-if="v$.email.$error"
        class="label-text text-red-500"
        >{{ v$.email.$errors[0].$message }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import { computed, reactive } from 'vue';

import { useAuthStore } from '@/stores/AuthStore';
import type { AuthNewMail } from '@/types/models/Auth';

const authStore = useAuthStore();

const currentEmail = computed(() => authStore.getEmail);

const formData: AuthNewMail = reactive({
  email: '',
  confirmEmail: '',
});

const rules = computed(() => {
  return {
    email: { required, email },
  };
});

const v$ = useVuelidate(rules, formData, { $lazy: true });
</script>
