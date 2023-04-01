<template>
  <div
    class="modal modal-bottom sm:modal-middle modal-open"
    role="dialog">
    <div
      ref="target"
      class="modal-box">
      <h2 class="font-bold text-2xl">Add project</h2>
      <BaseDivider></BaseDivider>
      <form action="">
        <div class="flex flex-col">
          <BaseInput
            v-model.trim="name"
            label="Name"
            input-name="name"
            name="name"
            type="text"
            placeholder="Project name" />
          <BaseDropdown>
            <template #content>
              <div class="text-neutral-content">
                <span>Name of color</span>
              </div>
            </template>
            <template #list>
              <li
                v-for="({ name, hex }, idx) in COLORS"
                :key="idx"
                class="flex flex-row items-center">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 96 960 960"
                    width="24"
                    :fill="hex">
                    <path
                      d="M480.074 835.999q-108.612 0-184.342-75.657-75.731-75.657-75.731-184.268 0-108.612 75.657-184.342 75.657-75.731 184.268-75.731 108.612 0 184.342 75.657 75.731 75.657 75.731 184.268 0 108.612-75.657 184.342-75.657 75.731-184.268 75.731Z" />
                  </svg>
                </span>
                {{ name }}
              </li>
            </template>
          </BaseDropdown>
        </div>
        <div class="flex justify-end gap-4 text-lg">
          <BaseButton
            class="btn btn-md border-transparent bg-base-200 hover:bg-base-300 text-neutral-focus normal-case text-lg"
            @click.prevent="closeEditor">
            Cancel
          </BaseButton>
          <BaseButton
            class="btn btn-md bg-accent border-transparent hover:bg-accent-focus text-neutral-content normal-case text-lg"
            :disabled="!taskTitle || !project"
            @click.prevent="addTask">
            Add project
          </BaseButton>
        </div>
      </form>

      <div class="modal-action gap-1">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import BaseDivider from '../ui/BaseDivider.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseDropdown from '@/components/ui/BaseDropdown.vue';
import { COLORS } from '@/types/models/Colors';
// defineProps<{
//   modelValue: string;
//   title: string;
// }>();

// const emit = defineEmits<{
//   (event: 'update:modelValue', payload: string): void;
// }>();
const name = ref('');
const target = ref();

useFocusTrap(target, {
  immediate: true,
});
</script>
