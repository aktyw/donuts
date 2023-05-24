<template>
  <li>
    <BaseButton
      class="btn-md md:btn-sm"
      :class="{
        'font-semibold': isActive,
        'fill-base-content md:btn-sm hover:fill-error hover:text-error focus:fill-error focus:text-error active:fill-error active:text-error  ':
          isDanger,
      }"
      v-bind="$attrs"
      @click="$emit('action')">
      <slot name="icon" />
      <slot />
    </BaseButton>
  </li>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';

type Props = {
  isActive?: boolean;
  isDanger?: boolean;
};

defineProps<Props>();

defineEmits<{
  (e: 'action'): void;
}>();
</script>
