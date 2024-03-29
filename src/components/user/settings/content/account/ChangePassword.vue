<template>
  <form ref="form">
    <div>
      <div class="flex flex-col pb-4">
        <SettingsLabel title="New password" />
        <SettingsInput
          ref="passwordEl"
          v-model.trim="formData.password"
          type="password"
          autocomplete="off" />
        <SettingsInputError
          v-if="v$.password.$error"
          :message="v$.password.$errors[0].$message" />
      </div>

      <div class="flex flex-col">
        <SettingsLabel title="Confirm new password" />
        <SettingsInput
          ref="passwordConfirmEl"
          v-model.trim="formData.confirmPassword"
          type="password"
          autocomplete="off" />
        <SettingsInputError
          v-if="v$.confirmPassword.$error"
          :message="v$.confirmPassword.$errors[0].$message" />
      </div>

      <InfoContainer class="mt-8">
        <h3>Your password must be at least {{ MIN_PASS_LENGTH }} characters long. Avoid common words or patterns.</h3>
      </InfoContainer>
    </div>
  </form>

  <SettingsFooterAction
    :is-save-btn-active="!!(formData.password || formData.confirmPassword)"
    @cancel="handleClearForm"
    @save="handleSaveAction" />

  <teleport to="body">
    <BaseModal
      v-if="!!errorMsg"
      modal-title="Something goes wrong. Error!"
      close-title="Close"
      @close-editor="handleError">
      <span class="text-red-500">{{ errorMsg }}</span>
    </BaseModal>
  </teleport>
  <teleport to="body">
    <BaseModal
      v-if="isLoading"
      modal-title="Updating..."
      close-title="Close"
      @close-editor="closeModal">
      <BaseLoader class="flex justify-center" />
    </BaseModal>
  </teleport>
  <teleport to="body">
    <BaseModal
      v-if="isSuccess"
      modal-title="Password updated..."
      close-title="Close"
      @close-editor="closeModal" />
  </teleport>
</template>

<script setup lang="ts">
import { FirebaseError } from '@firebase/util';
import { useVuelidate } from '@vuelidate/core';
import { maxLength, minLength, required, sameAs } from '@vuelidate/validators';
import { computed, reactive, type Ref, ref, watch } from 'vue';

import InfoContainer from '@/components/ui/containers/InfoContainer.vue';
import SettingsFooterAction from '@/components/user/settings/content/SettingsFooterAction.vue';
import SettingsInput from '@/components/user/settings/content/ui/SettingsInput.vue';
import SettingsInputError from '@/components/user/settings/content/ui/SettingsInputError.vue';
import SettingsLabel from '@/components/user/settings/content/ui/SettingsLabel.vue';
import { useFirebaseError } from '@/composables/useFirebaseError';
import { MAX_PASS_LENGTH, MIN_PASS_LENGTH } from '@/config/index';
import { useAuthStore } from '@/stores/AuthStore';
import { useSettingsStore } from '@/stores/SettingsStore';
import type { AuthNewPassword } from '@/types/models/Auth';

const authStore = useAuthStore();
const settingsStore = useSettingsStore();
const isModalOpen = computed(() => settingsStore.getModalStatus('userSettings'));

const form = ref();
const passwordEl = ref();
const passwordConfirmEl = ref();

const errorMsg: Ref<string | null> = ref(null);
const isSuccess = ref(false);
const isLoading = ref(false);

const formData: AuthNewPassword = reactive({
  password: '',
  confirmPassword: '',
});

watch(errorMsg, (val) => {
  if (val && !isModalOpen.value) {
    settingsStore.setModal({ modal: 'userSettings', value: true });
  } else if (!val && isModalOpen.value) {
    settingsStore.setModal({ modal: 'userSettings', value: false });
  }
});

const rules = computed(() => {
  return {
    password: { required, minLength: minLength(MIN_PASS_LENGTH), maxLength: maxLength(MAX_PASS_LENGTH) },
    confirmPassword: { required, sameAsPassword: sameAs(computed(() => formData.password)) },
  };
});

const v$ = useVuelidate(rules, formData);

async function validateForm() {
  try {
    return await v$.value.$validate();
  } catch (error) {
    errorMsg.value = typeof error === 'string' ? error : 'Failed to update password. Check your data';
  }
}

function handleClearForm() {
  formData.password = '';
  formData.confirmPassword = '';
  form.value.reset();
}

async function handleSaveAction() {
  try {
    const result = await validateForm();

    if (!result) return;

    isLoading.value = true;
    await authStore.setNewPassword(formData.password);

    isSuccess.value = true;
    settingsStore.setModal({ modal: 'userSettings', value: true });
    handleClearForm();
    v$.value.$reset();
  } catch (error) {
    const { newErrorMessage } = useFirebaseError(error as FirebaseError);

    errorMsg.value = newErrorMessage.value;
  } finally {
    isLoading.value = false;
  }
}

function closeModal() {
  isLoading.value = false;
  isSuccess.value = false;
  settingsStore.setModal({ modal: 'userSettings', value: false });
  v$.value.$reset();
}

function handleError() {
  errorMsg.value = null;
}
</script>
