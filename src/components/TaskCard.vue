<template>
  <li class="w-full flex justify-between py-2">
    <div class="flex gap-4 cursor-pointer" @click="toggleIsDone(task.id)">
      <label class="flex items-start h-full">
        <input
          type="checkbox"
          class="checkbox"
          :checked="isDone"
          :class="{ 'checkbox-accent': isImportant }"
        />
      </label>
      <div class="flex flex-col">
        <p
          class="break-all h-full w-full flex"
          :class="{ 'line-through': isDone, 'decoration-accent': isImportant }"
        >
          <slot name="content" />
        </p>
        <TaskTimeDetail v-if="timeDetail" :class="overdue" class="pt-0.5">
          <template #time>
            <span class="pt-0.5 w-full">{{ timeDetail }}</span>
          </template>
        </TaskTimeDetail>
      </div>
    </div>
    <TaskOptions
      class="ml-3"
      @deleteTask="handleDeleteTask"
      @toggleIsImportant="toggleIsImportant"
      @toggleIsDone="toggleIsDone"
      @editTask="toggleModal"
      @handleDate="handleUpdateDate"
      :taskId="task.id"
      :taskIsDone="task.done"
      :taskIsImportant="task.isImportant"
      :taskDate="props.task.date"
    ></TaskOptions>
    <Teleport to="body">
      <AddEditTask
        v-if="editTask"
        v-model.trim="newContent"
        :title="'Edit Task'"
      >
        <template #action>
          <button @click="cancelEditTask" class="btn btn-ghost">Cancel</button>
          <button
            :disabled="!newContent.length"
            class="btn"
            @click="handleUpdateTask(newContent)"
          >
            Save
          </button></template
        >
      </AddEditTask>
    </Teleport>
  </li>
</template>

<script setup>
import { ref, onUpdated, onMounted, computed } from 'vue';
import { useStoreTasks } from '@/stores/TasksStore';
import TaskOptions from '@/components/TaskOptions.vue';
import AddEditTask from '@/components/AddEditTask.vue';
import TaskTimeDetail from '@/components/TaskTimeDetail.vue';
import { isOverdue, isToday, isTomorrow } from '@/helpers/checkTime';

const store = useStoreTasks();
const props = defineProps(['task', 'taskContent', 'taskId', 'taskDate']);
const emits = defineEmits(['deleteTask']);

const newContent = ref(props.taskContent);
// to refactor
const isDone = ref(props.task.done);
const isImportant = ref(props.task.isImportant);
const editTask = ref(false);
const timeDetail = ref(null);

onUpdated(() => {
  setTimeDetail();
});

onMounted(() => {
  setTimeDetail();
});

const overdue = computed(() =>
  timeDetail.value === 'Overdue' ? '[&>span]:text-error [&>svg]:fill-error' : ''
);

function setTimeDetail() {
  const deadline = props.taskDate;
  if (!deadline) return;
  const date = deadline.toDateString().split(' ');
  if (isOverdue(deadline)) {
    timeDetail.value = 'Overdue';
  } else if (isToday(deadline)) {
    timeDetail.value = `Today at ${deadline
      .getHours()
      .toString()
      .padStart(2, '0')}:${deadline.getMinutes().toString().padStart(2, '0')}`;
  } else if (isTomorrow(deadline)) {
    timeDetail.value = 'Tomorrow';
  } else {
    timeDetail.value = `${date[1]} ${date[2]}`;
  }
}

function toggleModal() {
  editTask.value = !editTask.value;
}

function cancelEditTask() {
  newContent.value = props.taskContent;
  toggleModal();
}

function handleUpdateDate(date) {
  store.updateDate(props.task.id, date);
}

function handleUpdateTask(content) {
  toggleModal();
  store.updateTask(props.taskId, content);
}

function handleDeleteTask(id) {
  emits('deleteTask', id);
}

function toggleIsDone(id) {
  isDone.value = !isDone.value;
  store.toggleIsDone(id);
}

function toggleIsImportant(id) {
  isImportant.value = !isImportant.value;
  store.toggleIsImportant(id);
}
</script>
