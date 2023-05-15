<template>
  <FadeTransitionLong>
    <div class="hero full-h min-h-screen bg-base-200">
      <div class="hero-content flex-col lg:flex-row-reverse gap-12">
        <div class="text-center lg:text-left">
          <h1 class="text-5xl font-bold">Login to Donuts!</h1>
          <p class="py-6 max-w-prose">
            Donuts is a simple and intuitive application that allows users to easily manage their tasks and notes. With
            multiple features, Donuts helps users stay on top of their schedule and get things done more efficiently.
          </p>
        </div>
        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div class="card-body">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                class="input input-bordered" />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                type="text"
                placeholder="password"
                class="input input-bordered" />
              <label class="label">
                <a
                  href="#"
                  class="label-text-alt link link-hover"
                  >Forgot password?</a
                >
              </label>
            </div>
            <div class="form-control mt-6">
              <button class="btn btn-primary">Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FadeTransitionLong>
</template>

<script setup lang="ts">
import FadeTransitionLong from '@/components/ui/transitions/FadeTransitionLong.vue';
</script>
