<template>
  <TransitionGroup
    appear
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
    enter-active-class="transition duration-300"
    leave-active-class="transition duration-300">
    <slot></slot>
  </TransitionGroup>
</template>
