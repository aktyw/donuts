<template>
  <button
    class="btn btn-xs btn-ghost hover:bg-base-200 px-1 lg:px-2.5 font-normal tracking-wide capitalize"
  >
    <span>
      <slot name="title" />
    </span>
    <span class="pl-1 font-bold">
      <slot name="amount" />
    </span>
  </button>
</template>
