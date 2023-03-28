<template>
  <div class="navbar bg-accent sticky top-0 z-50">
    <div class="navbar-start">
      <div class="dropdown">
        <label
          tabindex="0"
          class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </label>
        <ul
          tabindex="0"
          class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded w-52">
          <li class="rounded">
            <router-link
              active-class="bg-neutral text-neutral-content "
              to="/tasks">
              Tasks
            </router-link>
          </li>
          <li>
            <router-link
              active-class="bg-neutral text-neutral-content "
              to="/notes">
              Notes
            </router-link>
          </li>
        </ul>
      </div>
      <div class="flex-none">
        <button
          class="btn btn-square btn-ghost"
          @click="store.toggleMenu()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-5 h-5 stroke-current">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      <router-link
        to="/"
        class="btn btn-ghost normal-case text-xl">
        Donuts
      </router-link>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal gap-4">
        <li>
          <router-link
            active-class="bg-neutral text-neutral-content rounded"
            to="/tasks">
            Tasks
          </router-link>
        </li>
        <li>
          <router-link
            active-class="bg-neutral text-neutral-content rounded"
            to="/notes">
            Notes
          </router-link>
        </li>
      </ul>
    </div>
    <div class="navbar-end">
      <router-link
        to="login"
        class="btn btn-accent">
        Login
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/stores/SettingsStore';

const store = useSettingsStore();
</script>
