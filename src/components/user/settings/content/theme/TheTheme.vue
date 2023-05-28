<template>
  <div class="flex flex-col gap-8">
    <section class="text-sm flex gap-2 flex-col">
      <InfoContainer>
        <p>Personalize your Donuts theme with colors to match your style, mood, and personality.</p>
      </InfoContainer>
      <div>
        <BaseToggle
          v-model="autoDarkMode"
          class="!pb-0">
          Auto dark mode
        </BaseToggle>
      </div>
      <p class="text-sm">Automatically switch between light and dark themes when your system does.</p>
    </section>
    <section>
      <SettingsLabel
        class="pb-4 !font-bold"
        title="Your themes" />
        <InfoContainer class="mb-4">
      <p class="text-sm">Choose the default theme for your app. You can freely select them when Auto dark mode is disabled. If it is enabled, you are limited to choosing the current theme within the OS, although you can still change the default theme for both the light and dark themes respectively.</p>
    </InfoContainer>
      <div class="flex flex-wrap gap-4">
        <div class="flex flex-col gap-4">
          <SettingsLabel title="Light" />
          <ThemeVisualLayout
            v-for="{ id, title, colors, mode } in themes.filter(({ mode }) => mode === 'light')"
            :id="id"
            :key="id"
            :title="title"
            :colors="colors"
            :is-active="currentTheme.id === id"
            @keydown.enter="handleChangeTheme(id, mode)"
            @click="handleChangeTheme(id, mode)" />
        </div>
        <div class="flex flex-col gap-4">
          <SettingsLabel title="Dark" />
          <ThemeVisualLayout
            v-for="{ id, title, colors, mode } in themes.filter(({ mode }) => mode === 'dark')"
            :id="id"
            :key="id"
            :title="title"
            :colors="colors"
            :is-active="currentTheme.id === id"
            @keydown.enter="handleChangeTheme(id, mode)"
            @click="handleChangeTheme(id, mode)" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import BaseToggle from '@/components/base/BaseToggle.vue';
import InfoContainer from '@/components/ui/containers/InfoContainer.vue';
import ThemeVisualLayout from '@/components/ui/themes/ThemeVisualLayout.vue';
import SettingsLabel from '@/components/user/settings/content/ui/SettingsLabel.vue';
import { useSettingsStore } from '@/stores/SettingsStore';
import type { Mode, ThemesId } from '@/types/models/Themes';
import type { Theme } from '@/types/models/Themes';

const settingsStore = useSettingsStore();
const currentTheme = computed(() => settingsStore.getCurrentTheme);

const isAutoDarkMode = computed(() => settingsStore.getAutoDarkModeState);

const autoDarkMode = ref(isAutoDarkMode.value);

function handleChangeTheme(id: ThemesId, mode: Mode): void {
  settingsStore.setTheme(id, mode);
}

watch(autoDarkMode, (val) => {
  settingsStore.setAutoDarkMode(val);
});

const themes: Theme[] = [
  {
    id: 'crystal',
    title: 'Crystal Clear',
    mode: 'light',
    colors: {
      top: 'bg-[#E8E8E8]',
      bottom: 'bg-[#F7F7F7]',
      border: 'border-[#0077B6]',
      circle: 'border-[#0077B6]',
      textColor: 'text-black',
    },
  },
  {
    id: 'arctic',
    title: 'Arctic Frost',
    mode: 'light',
    colors: {
      top: 'bg-[#b7c7d4]',
      bottom: 'bg-[#f5f8fa]',
      border: 'border-[#218e94]',
      circle: 'border-[#218e94]',
      textColor: 'text-black',
    },
  },
  {
    id: 'mocha',
    title: 'Mocha Elegance',
    mode: 'light',
    colors: {
      top: 'bg-[#C1BBB0]',
      bottom: 'bg-[#F0ECE2]',
      border: 'border-[#1F9D55]',
      circle: 'border-[#12733D]',
      textColor: 'text-black',
    },
  },
  {
    id: 'desert',
    title: 'Desert Oasis',
    mode: 'light',
    colors: {
      top: 'bg-[#dfe4d7]',
      bottom: 'bg-[#f9fef0]',
      border: 'border-[#44c427]',
      circle: 'border-[#44862d]',
      textColor: 'text-black',
    },
  },

  {
    id: 'coral',
    title: 'Coral Sunset',
    mode: 'light',
    colors: {
      top: 'bg-[#fff8f0]',
      bottom: 'bg-[#eedece]',
      border: 'border-[#E17225]',
      circle: 'border-[#e14e25]',
      textColor: 'text-black',
    },
  },
  {
    id: 'midnight',
    title: 'Midnight Azure',
    mode: 'dark',
    colors: {
      top: 'bg-[#0077B6]',
      bottom: 'bg-[#424242]',
      border: 'border-[#003459]',
      circle: 'border-[#003459]',
    },
  },
  {
    id: 'lavender',
    title: 'Lavender Noir',
    mode: 'dark',
    colors: {
      top: 'bg-[#212121]',
      bottom: 'bg-[#121212]',
      border: 'border-[#6a5acd]',
      circle: 'border-[#6a5acd]',
    },
  },
  {
    id: 'moss',
    title: 'Vivid Moss',
    mode: 'dark',
    colors: {
      top: 'bg-[#0a0a0a]',
      bottom: 'bg-[#161b16]',
      border: 'border-[#1ea54d]',
      circle: 'border-[#17833d]',
    },
  },
];
</script>
