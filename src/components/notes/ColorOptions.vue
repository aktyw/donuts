<template>
  <BaseButton
    class="dropdown dropdown-end"
    @click.stop>
    <template #icon>
      <IconTheme class="fill-primary-content transition" />
    </template>
    <div
      tabindex="0"
      class="dropdown-content card card-compact w-auto p-2 shadow bg-base-200 text-primary-content">
      <ul class="flex">
        <li
          v-for="({ hex }, id) in NOTES_COLORS"
          :key="id"
          class="flex items-center hover:border border-primary">
          <BaseButton @click.stop="handleChangeNoteColor(hex)">
            <template #icon>
              <IconColor :fill="hex" />
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
