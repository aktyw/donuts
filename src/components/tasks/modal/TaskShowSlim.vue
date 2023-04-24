<template>
  <div class="flex flex-col rounded-md p-2 cursor-pointer gap-2 w-full ml-1">
    <span class="font-bold">
      <slot />
    </span>
    <span>
      <slot name="desc"></slot>
    </span>
  </div>
</template>
