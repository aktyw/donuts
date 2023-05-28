<template>
  <TransitionGroup
    enter-from-class="translate-y-[25px] opacity-0 "
    enter-active-class="transition duration-300 "
    enter-to-class="opacity-100 translate-x-0"
    leave-from-class="opacity-100 translate-x-0"
    leave-active-class="transition duration-300 absolute"
    leave-to-class="translate-y-[15px] opacity-0"
    move-class="transition">
    <slot />
  </TransitionGroup>
</template>
