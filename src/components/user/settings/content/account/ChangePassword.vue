<template>
  <div>
    <div class="flex flex-col">
      <label class="label">
        <span class="label-text">New password</span>
      </label>
      <input
        v-model.trim="formData.password"
        type="text"
        class="input input-bordered" />
      <span
        v-if="v$.email.$error"
        class="label-text text-red-500"
        >{{ v$.password.$errors[0].$message }}
      </span>
    </div>
    <div class="flex flex-col">
      <label class="label">
        <span class="label-text">Confirm new password</span>
      </label>
      <input
        v-model.trim="formData.confirmPassword"
        type="text"
        class="input input-bordered" />
      <span
        v-if="v$.email.$error"
        class="label-text text-red-500"
        >{{ v$.email.$errors[0].$message }}
      </span>
    </div>

    <p>Your password must be at least 8 characters long. Avoid common words or patterns.</p>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { maxLength, minLength, required, sameAs } from '@vuelidate/validators';
import { computed, reactive } from 'vue';

import { MAX_PASS_LENGTH, MIN_PASS_LENGTH } from '@/config/index';
import { useAuthStore } from '@/stores/AuthStore';
import type { AuthNewPassword } from '@/types/models/Auth';

const authStore = useAuthStore();

const formData: AuthNewPassword = reactive({
  password: '',
  confirmPassword: '',
});

const rules = computed(() => {
  return {
    password: { required, minLength: minLength(MIN_PASS_LENGTH), maxLength: maxLength(MAX_PASS_LENGTH) },
    confirmPassword: { required, sameAsPassword: sameAs('password') },
  };
});

const v$ = useVuelidate(rules, formData, { $lazy: true });
</script>
