<template>
  <div
    class="modal modal-bottom sm:modal-middle modal-open"
    role="dialog">
    <div
      ref="target"
      class="modal-box overflow-visible p-0">
      <div class="border-b mb-4">
        <h2 class="font-bold text-2xl p-4">{{ modalTitle }}</h2>
      </div>
      <form
        action=""
        class="p-4">
        <div class="flex flex-col">
          <BaseInput
            v-model.trim="projectName"
            label="Name"
            input-name="name"
            name="name"
            maxlength="64"
            type="text"
            :placeholder="projectName || 'Project name'" />
          <BaseDropdown label-name="Color">
            <template #content>
              <IconColor :fill="colorHex" />
              <span class="text-base font-normal">{{ colorName }}</span>
            </template>
            <template #list>
              <li
                v-for="({ name, hex }, idx) in COLORS"
                :key="idx"
                class="flex flex-row items-center justify-between gap-2 [&]:hover:transition-none transition hover:transition duration-300 hover:duration-300 hover:bg-base-200"
                @click.prevent="handleSetColor(name, hex)">
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
          <BaseToggle v-model="favorite"> Add to favorite </BaseToggle>
        </div>
        <div class="flex justify-end gap-4 text-lg mt-8">
          <ModalButton @click.prevent="closeEditor"> Cancel </ModalButton>
          <ModalButton
            class="bg-primary !text-primary-content hover:bg-primary-focus"
            :class="{ '!bg-base-300  ': !projectName.length }"
            :disabled="!projectName.length"
            @click.prevent="handleAction">
            {{ actionTitle }}
          </ModalButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { nanoid } from 'nanoid';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import BaseDivider from '@/components/base/BaseDivider.vue';
import BaseDropdown from '@/components/base/BaseDropdown.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseToggle from '@/components/base/BaseToggle.vue';
import IconColor from '@/components/icons/IconColor.vue';
import IconDone from '@/components/icons/IconDone.vue';
import ModalButton from '@/components/modals/ModalButton.vue';
import { COLORS } from '@/types/models/Colors';
import type { Project } from '@/types/models/Projects';

const router = useRouter();

type Props = {
  project?: Project;
  modalTitle: string;
  actionTitle: string;
};

const props = defineProps<Props>();

const emit = defineEmits<{
  (event: 'update:modelValue', payload: string): void;
  (event: 'closeEditor'): void;
  (event: 'action', project: Project): void;
}>();

const projectName = ref(props.project?.name || '');
const favorite = ref(props.project?.favorite || false);
const target = ref();
const color = computed(() => COLORS.find((c) => c.hex === props.project?.color) ?? { name: 'Blue', hex: '#2196f3' });
const colorHex = ref(color.value.hex);
const colorName = ref(color.value.name);

function handleAction(): void {
  const project = {
    name: projectName.value,
    color: colorHex.value,
    id: props.project?.id ?? nanoid(),
    favorite: favorite.value,
    active: true,
  };

  router.push({ name: 'project', params: { id: project.id } });
  emit('action', project);
}

function handleSetColor(name: string, hex: string) {
  colorName.value = name;
  colorHex.value = hex;
}

function closeEditor(): void {
  emit('closeEditor');
}

useFocusTrap(target, {
  immediate: true,
});
</script>
