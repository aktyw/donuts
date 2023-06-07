<template>
  <BaseButton class="dropdown">
    <template #icon>
      <IconTheme class="fill-primary-content transition" />
    </template>
    <div
      tabindex="0"
      class="dropdown-content sm:h-auto items-center rounded-lg flex justify-center shadow bg-base-200 text-primary-content card !w-full sm:!w-56 sm:relative sm:!bottom-auto right-0 -top-0.5 sm:!right-auto p-0.5 sm:mx-2">
      <ul class="flex">
        <li
          v-for="({ hex }, id) in NOTES_COLORS"
          :key="id"
          class="flex items-center border border-transparent hover:border hover:border-primary">
          <BaseButton @click.stop="handleChangeNoteColor(hex)">
            <template #icon>
              <IconColor
                class="w-8 h-8 sm:h-auto sm:w-auto"
                :fill="hex" />
            </template>
          </BaseButton>
        </li>
      </ul>
    </div>
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import IconColor from '@/components/icons/IconColor.vue';
import IconTheme from '@/components/icons/IconTheme.vue';
import { NOTES_COLORS, type NOTES_COLORS_HEXES } from '@/types/models/Colors';

const emit = defineEmits<{
  (e: 'changeColor', color: NOTES_COLORS_HEXES): void;
}>();

function handleChangeNoteColor(color: NOTES_COLORS_HEXES): void {
  emit('changeColor', color);
}
</script>
