<template>
  <div>
    <InfoContainer class="mb-6">
      <h3>
        Update the email you use for your account.
        <br />
        Your email is currently
        <strong>{{ currentEmail }}</strong>
      </h3>
    </InfoContainer>

    <form ref="form">
      <div class="flex flex-col pb-4">
        <SettingsLabel title="New email" />
        <SettingsInput
          ref="emailEl"
          v-model.trim="formData.email"
          type="text" />
        <SettingsInputError
          v-if="v$.email.$error"
          :message="v$.email.$errors[0].$message" />
      </div>
      <div class="flex flex-col">
        <SettingsLabel title="Confirm new email" />
        <SettingsInput
          ref="emailConfirmEl"
          v-model.trim="formData.confirmEmail"
          type="text" />
        <SettingsInputError
          v-if="v$.confirmEmail.$error"
          :message="v$.confirmEmail.$errors[0].$message" />
      </div>
    </form>

    <SettingsFooterAction
      :is-save-btn-active="!!(formData.email || formData.confirmEmail)"
      class="absolute w-full right-0 bottom-0"
      @cancel="handleClearForm"
      @save="handleSaveAction" />

    <teleport to="body">
      <BaseModal
        v-if="!!errorMsg"
        modal-title="Something goes wrong. Error!"
        close-title="Close"
        @close-editor="handleError">
        <span class="text-red-500 flex justify-center items-center">{{ errorMsg }}</span>
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
        modal-title="Email updated..."
        close-title="Close"
        @close-editor="closeModal" />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { FirebaseError } from '@firebase/util';
import { useVuelidate } from '@vuelidate/core';
import { email, required, sameAs } from '@vuelidate/validators';
import { computed, reactive, type Ref, ref, watch } from 'vue';

import BaseLoader from '@/components/base/BaseLoader.vue';
import BaseModal from '@/components/base/BaseModal.vue';
import InfoContainer from '@/components/ui/containers/InfoContainer.vue';
import SettingsFooterAction from '@/components/user/settings/content/SettingsFooterAction.vue';
import SettingsInput from '@/components/user/settings/content/ui/SettingsInput.vue';
import SettingsInputError from '@/components/user/settings/content/ui/SettingsInputError.vue';
import SettingsLabel from '@/components/user/settings/content/ui/SettingsLabel.vue';
import { useFirebaseError } from '@/composables/useFirebaseError';
import { useAuthStore } from '@/stores/AuthStore';
import { useSettingsStore } from '@/stores/SettingsStore';
import type { AuthNewMail } from '@/types/models/Auth';

const authStore = useAuthStore();
const settingsStore = useSettingsStore();
const isModalOpen = computed(() => settingsStore.getModalStatus('userSettings'));

const form = ref();
const emailConfirmEl = ref();
const emailEl = ref();

const errorMsg: Ref<string | null> = ref(null);
const isSuccess = ref(false);
const isLoading = ref(false);

watch(errorMsg, (val) => {
  if (val && !isModalOpen.value) {
    settingsStore.setModal({ modal: 'userSettings', value: true });
  } else if (!val && isModalOpen.value) {
    settingsStore.setModal({ modal: 'userSettings', value: false });
  }
});

const currentEmail = computed(() => authStore.getEmail);

const formData: AuthNewMail = reactive({
  email: '',
  confirmEmail: '',
});

const rules = computed(() => {
  return {
    email: { required, email },
    confirmEmail: { required, email, sameAs: sameAs(computed(() => formData.email)) },
  };
});

const v$ = useVuelidate(rules, formData, { $lazy: true });

async function validateForm() {
  try {
    return await v$.value.$validate();
  } catch (error) {
    errorMsg.value = typeof error === 'string' ? error : 'Failed to update. Check your data';
  }
}

async function handleClearForm() {
  formData.email = '';
  formData.confirmEmail = '';
  form.value.reset();
}

async function handleSaveAction() {
  try {
    const result = await validateForm();

    if (!result) return;
    isLoading.value = true;
    await authStore.setNewEmail(formData.email);
    isSuccess.value = true;
    handleClearForm();
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
}

function handleError() {
  errorMsg.value = null;
}
</script>
