<template>
  <Transition
    appear
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
    enter-active-class="transition duration-1000"
    leave-active-class="transition duration-500">
    <slot></slot>
  </Transition>
</template>
