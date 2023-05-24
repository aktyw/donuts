<template>
  <router-link
    :to="{ name: 'account' }"
    class="focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent">
    <li
      class="text-base-content hover:bg-base-200"
      @click="openSettingsModal">
      <div class="flex flex-col items-start p-3">
        <div class="flex gap-4 items-center">
          <Avatar
            :size="34"
            variant="marble"
            :name="name || 'random'" />
          <div class="flex flex-col items-start gap-0 p-0">
            <span class="font-bold">{{ name }}</span>
            <span class="">{{ email }}</span>
          </div>
        </div>
        <span class="flex items-center py-0 gap-3">
          <IconSettingsAlt class="fill-base-content" />
          Settings
        </span>
      </div>
    </li>
  </router-link>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import Avatar from 'vue-boring-avatars';

import IconSettingsAlt from '@/components/icons/IconSettingsAlt.vue';
import blurElement from '@/helpers/blur';
import { useAuthStore } from '@/stores/AuthStore';

const authStore = useAuthStore();

const { getEmail: email, getName: name } = storeToRefs(authStore);

const emit = defineEmits<{
  (event: 'openSettingsModal'): void;
}>();

function openSettingsModal() {
  blurElement();
  emit('openSettingsModal');
}
</script>
