<template>
  <TransitionGroup
    enter-from-class="translate-x-[70%] opacity-0 "
    enter-active-class="transition duration-500 "
    enter-to-class="opacity-100 translate-x-0"
    leave-from-class="opacity-100 translate-x-0"
    leave-active-class="transition duration-500 "
    leave-to-class="translate-x-[-170%] opacity-0"
    move-class="transition">
    <slot></slot>
  </TransitionGroup>
</template>
