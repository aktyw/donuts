<template>
  <header class="sticky p-0 navbar bg-accent z-50">
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
        <BaseButton
          class="btn btn-square btn-ghost"
          @click="settingsStore.toggleMenu()">
          <template #icon>
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
          </template>
        </BaseButton>
        <BaseButton
          class="btn btn-square btn-ghost"
          @click="router.push({ name: 'project', params: { id: home } })">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 96 960 960"
            width="24">
            <path
              d="M240 856h133.847V618.308h212.306V856H720V496L480 315.231 240 496v360Zm-59.999 59.999V466.001L480 240.233l299.999 225.768v449.998H526.154V678.306h-92.308v237.693H180.001ZM480 585.615Z" />
          </svg>
        </BaseButton>
      </div>
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
        to="/"
        class="btn btn-ghost uppercase">
        About
      </router-link>
      <router-link
        to="login"
        class="btn btn-accent">
        Login
      </router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/stores/SettingsStore';
import { storeToRefs } from 'pinia';
import BaseButton from '@/components/ui/BaseButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const settingsStore = useSettingsStore();
const { getHomeView: home } = storeToRefs(settingsStore);
</script>
