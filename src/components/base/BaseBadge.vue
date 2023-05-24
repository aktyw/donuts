<template>
  <button class="btn-ghost btn-xs btn px-1 font-normal capitalize tracking-wide hover:bg-base-200 lg:px-2.5">
    <span>
      <slot name="title" />
    </span>
    <span class="pl-1 font-bold">
      <slot name="amount" />
    </span>
  </button>
</template>
