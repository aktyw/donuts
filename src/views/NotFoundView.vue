<template>
  <main class="fixed grid place-items-center h-screen">
    <div class="flex flex-col gap-8 text-center">
      <h1 class="text-2xl">
        <span class="flex justify-center">
          <img
            class="max-w-[260px] w-full pointer-events-none pb-6"
            src="@/assets/illustrations/donut-stop.svg"
            alt="Illustration of happy donut" />
        </span>
        Oh! <span class="font-semibold">404</span> Page Not Found. You need to take an another route!
      </h1>
      <h2 class="text-xl hover:underline text-primary font-semibold">
        <router-link :to="{ name: 'about' }">Go back to app</router-link>
      </h2>
    </div>
  </main>
</template>

<script setup lang="ts"></script>
