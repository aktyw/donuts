<template>
  <div
    tabindex="0"
    class="outline-custom hover:-translate-y-1 transition cursor-pointer relative h-28 w-56 rounded-xl border border-opacity-50 overflow-hidden"
    :class="colors.border || 'border-base-content'">
    <div
      v-if="isActive"
      class="absolute bottom-2 right-4">
      <IconCircleCheck class="fill-success" />
    </div>
    <div
      class="h-1/3 px-3 flex items-center"
      :class="colors.top">
      <h3
        class="font-semibold text-sm"
        :class="colors.textColor || 'text-white'">
        {{ title }}
      </h3>
    </div>

    <div
      class="flex h-2/3 w-full"
      :class="colors.bottom">
      <div class="flex p-3 pr-4 py-4">
        <div
          class="h-3.5 w-3.5 rounded-full border"
          :class="colors.circle || 'border-base-content'"></div>
      </div>
      <div class="w-full flex flex-col items-start justify-center gap-3">
        <div class="rounded-xl w-40 h-3.5 bg-gray-300"></div>
        <div class="rounded-xl w-24 h-3.5 bg-gray-300"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconCircleCheck from '@/components/icons/IconCircleCheck.vue';

interface ThemeStyle {
  top: string;
  bottom: string;
  border?: string;
  circle?: string;
  textColor?: string;
}

type Props = {
  title: string;
  colors: ThemeStyle;
  isActive: boolean;
};
const props = defineProps<Props>();
</script>
