<template>
  <div
    class="modal modal-bottom sm:modal-middle modal-open"
    role="dialog">
    <div
      ref="target"
      class="modal-box overflow-visible">
      <h2 class="font-bold text-2xl">Add project</h2>
      <BaseDivider></BaseDivider>
      <form action="">
        <div class="flex flex-col">
          <BaseInput
            ref="target"
            v-model.trim="projectName"
            label="Name"
            input-name="name"
            name="name"
            maxlength="64"
            type="text"
            placeholder="Project name" />
          <BaseDropdown>
            <template #content>
              <IconColor :fill="colorHex" />
              <span class="text-base font-normal">{{ colorName }}</span>
            </template>
            <template #list>
              <li
                v-for="({ name, hex }, idx) in COLORS"
                :key="idx"
                class="flex flex-row items-center justify-between gap-2 [&]:hover:transition-none transition hover:transition duration-300 hover:duration-300 hover:bg-base-200"
                @click.prevent="handleSetColor(name)">
                <div>
                  <span>
                    <IconColor :fill="hex" />
                  </span>
                  <span class="p-0">{{ name }}</span>
                </div>
                <span v-if="hex === colorHex">
                  <IconDone :fill="colorHex" />
                </span>
              </li>
            </template>
          </BaseDropdown>
        </div>
        <div class="flex justify-end gap-4 text-lg mt-8">
          <BaseButton
            class="btn btn-md border-transparent bg-base-200 hover:bg-base-300 text-neutral-focus normal-case text-lg"
            @click.prevent="closeEditor">
            Cancel
          </BaseButton>
          <BaseButton
            class="btn btn-md bg-accent border-transparent hover:bg-accent-focus text-neutral-content normal-case text-lg"
            :disabled="!projectName.length"
            @click.prevent="addProject">
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
import { ref, computed } from 'vue';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { useProjectsStore } from '@/stores/ProjectsStore';
import BaseDivider from '../ui/BaseDivider.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseDropdown from '@/components/ui/BaseDropdown.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { COLORS } from '@/types/models/Colors';
import IconColor from '@/components/icons/IconColor.vue';
import IconDone from '@/components/icons/IconDone.vue';

const projectStore = useProjectsStore();

// defineProps<{
//   modelValue: string;
//   title: string;
// }>();

const emit = defineEmits<{
  (event: 'update:modelValue', payload: string): void;
  (event: 'closeEditor'): void;
}>();
const projectName = ref('');
const colorName = ref('Blue');
const target = ref();

const colorHex = computed(() => {
  const color = COLORS.find((c) => c.name === colorName.value);

  return color ? color.hex : '#000000';
});

function handleSetColor(name: string) {
  colorName.value = name;
}

function closeEditor(): void {
  emit('closeEditor');
}

function addProject(): void {
  const project = { name: projectName.value, color: colorHex.value };

  projectStore.addProject(project);

  projectName.value = '';
}

useFocusTrap(target, {
  immediate: true,
});
</script>
