<template>
  <TransitionGroup
    enter-from-class="translate-x-[100%] opacity-0"
    leave-to-class="translate-x-[-100%] opacity-0"
    enter-active-class="transition duration-500"
    leave-active-class="transition duration-500">
    <slot></slot>
  </TransitionGroup>
</template>

<script setup lang="ts"></script>
