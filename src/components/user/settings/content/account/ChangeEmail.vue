<template>
  <main>
    <InfoContainer class="mb-6">
      <h3>
        Update the email you use for your account.
        <br />
        Your email is currently
        <strong>{{ currentEmail }}</strong>
      </h3>
    </InfoContainer>

    <div class="flex flex-col pb-4">
      <SettingsLabel title="New email" />
      <SettingsInput
        v-model.trim="formData.email"
        type="text" />
      <SettingsInputError
        v-if="v$.email.$error"
        :message="v$.email.$errors[0].$message" />
    </div>

    <div class="flex flex-col">
      <SettingsLabel title="Confirm new email" />
      <SettingsInput
        v-model.trim="formData.confirmEmail"
        type="text" />
      <SettingsInputError
        v-if="v$.email.$error"
        :message="v$.email.$errors[0].$message" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { email, required, sameAs } from '@vuelidate/validators';
import { computed, reactive } from 'vue';

import InfoContainer from '@/components/ui/containers/InfoContainer.vue';
import SettingsInput from '@/components/user/settings/content/ui/SettingsInput.vue';
import SettingsInputError from '@/components/user/settings/content/ui/SettingsInputError.vue';
import SettingsLabel from '@/components/user/settings/content/ui/SettingsLabel.vue';
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
    confirmEmail: { required, sameAsEmail: sameAs('email') },
  };
});

const v$ = useVuelidate(rules, formData, { $lazy: true });
</script>
