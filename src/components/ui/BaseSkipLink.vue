<template>
  <ul class="skip-link">
    <li>
      <a
        ref="beforeSkipLink"
        tabindex="-1"></a>
      <a
        ref="skipLink"
        href="#main"
        class="absolute left-28 mt-2 -translate-y-12 opacity-100 z-[1000] whitespace-nowrap focus:opacity-100 focus:translate-y-0 bg-accent text-accent-content p-1.5 font-bold text-sm transition-all duration-300 rounded focus-visible:outline-offset-1 focus-visible:outline-1 focus-visible:outline-accent-focus"
        >Skip to main content</a
      >
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
