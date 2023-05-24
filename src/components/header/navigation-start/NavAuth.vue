<template>
  <div class="navbar-end hidden lg:flex">
    <ul class="flex flex-row items-center gap-4">
      <NavLink to="/auth/login"> Log in </NavLink>
      <NavLink
        class="rounded-md bg-primary font-semibold text-primary-content hover:bg-primary-focus hover:text-white"
        to="/auth/signup">
        Try for free
      </NavLink>
    </ul>
  </div>
</template>

<script setup lang="ts">
import NavLink from '@/components/header/navigation/NavLink.vue';
</script>
