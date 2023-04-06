<!-- <template>
  <div class="drawer z-50">
    <input
      id="my-drawer-2"
      type="checkbox"
      class="drawer-toggle" />
    <div class="drawer-side">
      <ul
        class="menu p-4 w-80 bg-base-200 text-base-content [&>li>a]:justify-between [&>li>.router-link-exact-active]:bg-base-300">
        <slot name="links"></slot>
      </ul>
    </div>
  </div>
</template> -->
<template>
  <div class="fixed z-50 h-full">
    <ul
      class="menu p-4 w-80 bg-base-200 text-base-content [&>li>a]:justify-between [&>li>.router-link-exact-active]:bg-base-300 h-full">
      <slot name="links"></slot>
    </ul>
  </div>
</template>

<script setup lang="ts"></script>
