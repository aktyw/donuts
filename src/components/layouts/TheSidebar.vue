<template>
  <div class="drawer drawer-mobile absolute">
    <input
      id="my-drawer-2"
      type="checkbox"
      class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-center justify-center">
      <!-- Page content here -->
      <label
        for="my-drawer-2"
        class="btn btn-primary drawer-button lg:hidden"
        >Open drawer</label
      >
    </div>
    <div class="drawer-side">
      <ul
        class="menu p-4 w-80 bg-base-200 text-base-content [&>li>a]:justify-between [&>li>.router-link-exact-active]:bg-base-300">
        <slot name="links"></slot>
        <div class="divider"></div>
        <slot name="projects">
          <li><a>Sidebar Item 1</a></li>
          <li><a>Sidebar Item 2</a></li>
        </slot>
      </ul>
    </div>
  </div>
</template>
