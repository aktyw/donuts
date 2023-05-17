<template>
  <div class="navbar-start flex flex-row-reverse justify-between w-full lg:w-1/2">
    <div
      ref="item"
      class="dropdown dropdown-left [&>.dropdown-content]:right-0 dropdown-bottom gap-2">
      <label
        tabindex="0"
        class="btn btn-sm btn-ghost lg:hidden px-1">
        <IconList />
      </label>
      <ul
        tabindex="0"
        class="menu menu-compact dropdown-content dropdown-left mt-2 shadow bg-base-200 w-48 gap-2 p-2 rounded-xl"
        @click="blurDropdown">
        <NavLink to="/login"> Login </NavLink>
        <NavLink
          class="bg-primary text-primary-content"
          to="/signup">
          Try for free
        </NavLink>
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
