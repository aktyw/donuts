<template>
  <div class="pb-12">
    <section class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <SettingsLabel
          for="name"
          title="Name" />
        <SettingsInput
          ref="nameEl"
          v-model.trim="name"
          type="text"
          :placeholder="displayName || ''" />
      </div>
      <div class="flex flex-col gap-2">
        <SettingsLabel title="Email" />
        <span class="pb-2 text-sm">{{ email }}</span>
        <SettingsButtonLink
          :to="{ name: 'email' }"
          title="Change email" />
      </div>
      <div class="flex flex-col gap-2">
        <SettingsLabel title="Password" />
        <SettingsButtonLink
          :to="{ name: 'password' }"
          title="Change password" />
      </div>
      <div class="flex flex-col gap-2">
        <SettingsLabel title="Delete account" />
        <InfoContainer>
          <p class="text-sm">
            This will immediately delete all of your data including tasks, projects, and more. This can’t be undone.
          </p>
        </InfoContainer>
        <SettingsButtonDangerAction
          title="Delete account"
          @click="handleModalDeleteAccount" />
      </div>
    </section>
  </div>
  <SettingsFooterAction
    :is-save-btn-active="!!name"
    @cancel="handleClearInput"
    @save="handleUpdateProfile" />

  <teleport to="body">
    <BaseModal
      v-if="isDeleteModalOpen"
      modal-title="Delete account?"
      close-title="Cancel"
      @close-editor="cancelDeleteAccount">
      <template #action>
        <ButtonMainAction
          class="!bg-red-600 text-white hover:!bg-red-800"
          @click="deleteAccount">
          Delete
        </ButtonMainAction>
      </template>
    </BaseModal>
  </teleport>
  <teleport to="body">
    <BaseModal
      v-if="!!errorMsg"
      modal-title="Something goes wrong. Error!"
      close-title="Close"
      @close-editor="handleError">
      <span class="flex items-center justify-center text-red-500">{{ errorMsg }}</span>
    </BaseModal>
  </teleport>
  <teleport to="body">
    <BaseModal
      v-if="isSuccess"
      modal-title="Display name updated"
      close-title="Close"
      @close-editor="closeModal" />
  </teleport>
</template>

<script setup lang="ts">
import { FirebaseError } from '@firebase/util';
import { computed, type Ref, ref, watch } from 'vue';

import BaseModal from '@/components/base/BaseModal.vue';
import ButtonMainAction from '@/components/ui/buttons/ButtonMainAction.vue';
import SettingsFooterAction from '@/components/user/settings/content/SettingsFooterAction.vue';
import SettingsButtonDangerAction from '@/components/user/settings/content/ui/SettingsButtonDangerAction.vue';
import SettingsButtonLink from '@/components/user/settings/content/ui/SettingsButtonLink.vue';
import SettingsInput from '@/components/user/settings/content/ui/SettingsInput.vue';
import SettingsLabel from '@/components/user/settings/content/ui/SettingsLabel.vue';
import { useFirebaseError } from '@/composables/useFirebaseError';
import { useAuthStore } from '@/stores/AuthStore';
import { useSettingsStore } from '@/stores/SettingsStore';

const authStore = useAuthStore();
const settingsStore = useSettingsStore();
const isDeleteModalOpen = computed(() => settingsStore.getModalStatus('deleteAccount'));
const errorMsg: Ref<string | null> = ref(null);

const nameEl = ref(null);
const name = ref('');
const displayName = computed(() => authStore.getName);
const email = computed(() => authStore.getEmail);
const isSuccess = ref(false);

const isModalOpen = computed(() => settingsStore.getModalStatus('userSettings'));

function handleClearInput() {
  if (nameEl.value && name) {
    name.value = '';
  }
}

async function handleUpdateProfile(): Promise<void> {
  try {
    await authStore.updateProfile(name.value);
    settingsStore.setModal({ modal: 'userSettings', value: true });
    isSuccess.value = true;
  } catch (error) {
    const { newErrorMessage } = useFirebaseError(error as FirebaseError);

    errorMsg.value = newErrorMessage.value;
  }
}

watch(errorMsg, (val) => {
  if (val && !isModalOpen.value) {
    settingsStore.setModal({ modal: 'userSettings', value: true });
  } else if (!val && isModalOpen.value) {
    settingsStore.setModal({ modal: 'userSettings', value: false });
  }
});

function handleModalDeleteAccount(): void {
  settingsStore.setModal({ modal: 'deleteAccount', value: true });
}

function cancelDeleteAccount(): void {
  settingsStore.setModal({ modal: 'deleteAccount', value: false });
}

async function deleteAccount(): Promise<void> {
  try {
    settingsStore.setModal({ modal: 'deleteAccount', value: false });

    await authStore.deleteUser();
  } catch (error) {
    const { newErrorMessage } = useFirebaseError(error as FirebaseError);

    errorMsg.value = newErrorMessage.value;

    cancelDeleteAccount();
  }
}

function closeModal() {
  isSuccess.value = false;
  settingsStore.setModal({ modal: 'userSettings', value: false });
  handleClearInput();
}

function handleError() {
  errorMsg.value = null;
}
</script>
