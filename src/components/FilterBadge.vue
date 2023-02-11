<template>
  <button class="btn btn-xs btn-ghost p-1">
    <span>
      <slot name="title" />
    </span>
    <span class="pl-1 font-bold">
      <slot name="amount" />
    </span>
  </button>
</template>
