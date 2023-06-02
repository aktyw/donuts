<template>
  <div class="navbar-center hidden md:flex">
    <ul class="menu-horizontal gap-4">
      <NavLink to="/tasks">Tasks</NavLink>
      <NavLink to="/notes">Notes</NavLink>
    </ul>
  </div>
</template>

<script setup lang="ts">
import NavLink from '@/components/header/navigation/NavLink.vue';
</script>
