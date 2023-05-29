<template>
  <ul class="skip-link">
    <li>
      <a
        ref="beforeSkipLink"
        tabindex="-1"></a>
      <a
        ref="skipLink"
        href="#main"
        class="absolute left-28 z-[1000] mt-2 -translate-y-12 whitespace-nowrap rounded bg-primary p-1.5 text-sm font-bold text-primary-content opacity-100 transition-all duration-300 focus:translate-y-0 focus:opacity-100 focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-accent-focus">
        Skip to main content
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const skipLink = ref();
const beforeSkipLink = ref();

watch(
  () => route.path,
  () => {
    beforeSkipLink.value.focus();
  }
);
</script>
