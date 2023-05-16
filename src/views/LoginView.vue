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
                v-model.trim="email"
                type="text"
                placeholder="email"
                class="input input-bordered" />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                v-model.trim="password"
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
            <div class="flex flex-row justify-between flex-1 form-control mt-6">
              <button class="btn btn-primary">Login</button>
              <button
                class="btn btn-accent"
                @click="switchAuthMode">
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FadeTransitionLong>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import { ref } from 'vue';

import FadeTransitionLong from '@/components/ui/transitions/FadeTransitionLong.vue';

// const email = ref();
const password = ref();

function submitForm(params: type) {}

function switchAuthMode(params: type) {}
</script>
