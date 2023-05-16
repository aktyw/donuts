<template>
  <div class="flex flex-col w-full lg:w-1/2 gap-4 text-center">
    <div class="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
      <div class="card-body">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input
            v-model.trim="formData.email"
            type="text"
            placeholder="email"
            class="input input-bordered" />
          <span
            v-if="v$.email.$error"
            class="label-text text-red-500"
            >{{ v$.email.$errors[0].$message }}</span
          >
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input
            v-model.trim="formData.password"
            type="text"
            placeholder="password"
            class="input input-bordered" />
          <span
            v-if="v$.password.$error"
            class="label-text text-red-500"
            >{{ v$.password.$errors[0].$message }}</span
          >
          <label class="label">
            <a
              href="#"
              class="label-text-alt link link-hover"
              >Forgot password?</a
            >
          </label>
        </div>
        <div class="flex flex-row justify-between flex-1 form-control mt-6">
          <button
            class="btn btn-primary w-full"
            @click.prevent="submitForm">
            Login
          </button>
        </div>
      </div>
    </div>
    <a
      class="link text-primary"
      @click="switchAuthMode">
      Don't have an account? Signup!
    </a>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { email, maxLength, minLength, required } from '@vuelidate/validators';
import { computed, reactive } from 'vue';

const formData = reactive({
  email: '',
  password: '',
});

const rules = computed(() => {
  return {
    email: { required, email },
    password: { required, minLength: minLength(8), maxLength: maxLength(64) },
  };
});

const v$ = useVuelidate(rules, formData, { $lazy: true });

async function submitForm(params: type) {
  try {
    const result = await v$.value.$validate();
  } catch (error) {
    console.log(error);
  }
}

function switchAuthMode(params: type) {}
</script>
