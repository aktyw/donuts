<template>
  <div>
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
        <span class="text-sm pb-2">{{ email }}</span>
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
            This will immediately delete all of your data including tasks, projects,and more. This can’t be undone.
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
    class="absolute w-full right-0 bottom-0"
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
          class="!btn !bg-red-600 text-white"
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
      <span class="text-red-500 flex justify-center items-center">{{ errorMsg }}</span>
    </BaseModal>
  </teleport>
</template>

<script setup lang="ts">
import { FirebaseError } from '@firebase/util';
import { computed, type Ref, ref } from 'vue';

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

function handleClearInput() {
  if (nameEl.value && name) {
    name.value = '';
  }
}

async function handleUpdateProfile(name: string): Promise<void> {
  authStore.updateProfile(name);
}

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
    console.log(error);
    const { newErrorMessage } = useFirebaseError(error as FirebaseError);

    errorMsg.value = newErrorMessage.value;
    console.log(errorMsg.value);

    cancelDeleteAccount();
  }
}

function handleError() {
  errorMsg.value = null;
}
</script>
