<template>
  <div class="navbar bg-base-100 sticky top-0 z-50">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        <ul
          tabindex="0"
          class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li><router-link to="/tasks">Tasks</router-link></li>
          <li><router-link to="/notes">Notes</router-link></li>
        </ul>
      </div>
      <router-link to="/" class="btn btn-ghost normal-case text-xl"
        >Donuts</router-link
      >
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal">
        <li><router-link to="/tasks">Tasks</router-link></li>
        <li><router-link to="/notes">Notes</router-link></li>
      </ul>
    </div>
    <div class="navbar-end">
      <router-link to="login" class="btn">Login</router-link>
    </div>
  </div>
</template>
