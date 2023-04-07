<template>
  <aside class="z-20">
    <ul
      class="w-80 menu p-4 py-8 bg-base-200 text-base-content [&>li>a]:justify-between [&>li>.router-link-exact-active]:bg-base-300 h-full">
      <slot name="links"></slot>
    </ul>
  </aside>
</template>

<script setup lang="ts"></script>
