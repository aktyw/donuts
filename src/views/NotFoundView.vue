<template>
  <main class="fixed grid h-screen place-items-center">
    <div class="flex flex-col gap-8 text-center">
      <h1 class="text-2xl">
        <span class="flex justify-center">
          <img
            class="pointer-events-none w-full max-w-[260px] pb-6"
            src="@/assets/illustrations/donut-stop.svg"
            alt="Illustration of happy donut" />
        </span>
        Oh! <span class="font-semibold">404</span> Page Not Found. You need to take an another route!
      </h1>
      <h2 class="text-xl font-semibold text-primary hover:underline">
        <router-link :to="{ name: 'about' }">Go back to app</router-link>
      </h2>
    </div>
  </main>
</template>

<script setup lang="ts"></script>
