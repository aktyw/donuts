<template>
  <NotesContainer>
    <QuillEditor
      v-model:content="content"
      content-type="html"
      class="!max-w-80"
      theme="snow"
      toolbar="essential" />
  </NotesContainer>
</template>

<script setup lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { QuillEditor } from '@vueup/vue-quill';
import { onUpdated, ref } from 'vue';

import NotesContainer from '@/components/ui/containers/NotesContainer.vue';

const content = ref('');

onUpdated(() => {
  console.log(content.value);
});
</script>
