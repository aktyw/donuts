<template>
  <div class="ml-1 flex w-full cursor-pointer flex-col gap-2 rounded-md p-2">
    <span class="font-bold">
      <slot />
    </span>
    <span>
      <slot name="desc"></slot>
    </span>
  </div>
</template>
