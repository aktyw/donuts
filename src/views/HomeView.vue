<template>
  <div class="hero bg-base-200 h-screen">
    <div class="hero-content flex-col lg:flex-row-reverse lg:gap-8">
      <img
        src="@/assets/images/donut-air.png"
        class="rounded-lg lg:max-w-xl" />
      <div>
        <h1 class="text-5xl lg:text-7xl font-bold">
          Improve productivity with
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500">Donuts!</span>
        </h1>
        <p class="py-6 max-w-prose">
          Simple and intuitive app that allows users to easily manage their tasks and notes.
        </p>
        <router-link
          to="/login"
          class="btn btn-primary">
          Try now!
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
