<template>
  <div class="drawer drawer-mobile absolute">
    <input
      id="my-drawer-2"
      type="checkbox"
      class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-center justify-center">
      <label
        for="my-drawer-2"
        class="btn btn-primary drawer-button lg:hidden"
        >Open drawer</label
      >
    </div>
    <div class="drawer-side">
      <ul
        class="menu p-4 w-80 bg-base-200 text-base-content [&>li>a]:justify-between [&>li>.router-link-exact-active]:bg-base-300">
        <slot name="links"></slot>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
