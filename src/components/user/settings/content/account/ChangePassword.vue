<template>
  <main>
    <div class="flex flex-col pb-4">
      <SettingsLabel title="New password" />
      <SettingsInput
        v-model.trim="formData.password"
        type="text" />
      <SettingsInputError
        v-if="v$.password.$error"
        :message="v$.password.$errors[0].$message" />
    </div>

    <div class="flex flex-col">
      <SettingsLabel title="Confirm new password" />
      <SettingsInput
        v-model.trim="formData.confirmPassword"
        type="text" />
      <SettingsInputError
        v-if="v$.password.$error"
        :message="v$.password.$errors[0].$message" />
    </div>

    <InfoContainer class="mt-8">
      <h3>Your password must be at least {{ MIN_PASS_LENGTH }} characters long. Avoid common words or patterns.</h3>
    </InfoContainer>
  </main>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { maxLength, minLength, required, sameAs } from '@vuelidate/validators';
import { computed, reactive } from 'vue';

import InfoContainer from '@/components/ui/containers/InfoContainer.vue';
import SettingsInput from '@/components/user/settings/content/ui/SettingsInput.vue';
import SettingsInputError from '@/components/user/settings/content/ui/SettingsInputError.vue';
import SettingsLabel from '@/components/user/settings/content/ui/SettingsLabel.vue';
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
