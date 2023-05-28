<template>
  <div class="navbar-start flex w-full flex-row-reverse justify-between lg:w-1/2">
    <div
      ref="item"
      class="dropdown-bottom dropdown dropdown-left gap-2 [&>.dropdown-content]:right-0">
      <label
        tabindex="0"
        class="btn-ghost btn-sm btn px-1 lg:hidden">
        <IconList />
      </label>
      <ul
        tabindex="0"
        class="dropdown-left dropdown-content menu menu-compact mt-2 w-48 gap-2 rounded-xl bg-base-200 p-2 shadow"
        @click="blurDropdown">
        <NavLink to="/tasks">Tasks</NavLink>
        <NavLink to="/notes">Notes</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavLink from '@/components/header/navigation/NavLink.vue';
import IconList from '@/components/icons/IconList.vue';
import blurElement from '@/helpers/blur';

function blurDropdown() {
  blurElement();
}
</script>
