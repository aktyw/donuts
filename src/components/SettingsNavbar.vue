<template>
  <div class="w-full flex justify-end gap-2 py-2 relative">
    <SettingsDropdown>
      <template #btn>
        <button
          :disabled="!tasks.length"
          class="hover:bg-base-200 p-0.5 rounded focus:bg-base-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
            <path
              d="M8.5 12.5V4.625L5.4 7.7 4.7 7 9 2.7 13.3 7l-.7.7-3.1-3.075V12.5Zm6.5 8.8L10.7 17l.7-.7 3.1 3.075V11.5h1v7.875l3.1-3.075.7.7Z"
            />
          </svg>
        </button>
      </template>
    </SettingsDropdown>

    <SettingsDropdown>
      <template #btn>
        <button
          :disabled="!tasks.length"
          class="hover:bg-base-200 p-0.5 rounded focus:bg-base-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
            <path
              d="M6.225 13.5q-.625 0-1.062-.438-.438-.437-.438-1.062t.438-1.062Q5.6 10.5 6.225 10.5t1.063.438q.437.437.437 1.062t-.437 1.062q-.438.438-1.063.438Zm5.775 0q-.625 0-1.062-.438Q10.5 12.625 10.5 12t.438-1.062Q11.375 10.5 12 10.5t1.062.438q.438.437.438 1.062t-.438 1.062q-.437.438-1.062.438Zm5.775 0q-.625 0-1.062-.438-.438-.437-.438-1.062t.438-1.062q.437-.438 1.062-.438t1.063.438q.437.437.437 1.062t-.437 1.062q-.438.438-1.063.438Z"
            />
          </svg>
        </button>
      </template>
    </SettingsDropdown>
  </div>
</template>

<script setup>
import SettingsDropdown from '@/components/SettingsDropdown.vue';
const props = defineProps(['tasks']);
</script>
