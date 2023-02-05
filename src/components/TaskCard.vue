<template>
  <li class="w-full flex justify-between py-4">
    <div class="flex gap-4">
      <label>
        <input type="checkbox" class="checkbox align-bottom" />
      </label>
      <p class="break-all">
        <slot name="content" />
      </p>
    </div>
    <BaseButton class="btn-xs btn-accent ml-4">Delete</BaseButton>
  </li>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue';


</script>
