<template>
    <div>
      <BreadCrumbs
      :isRtl="isRtl"
      :breadCrumb="routeName">
      </BreadCrumbs>
    </div>
    <div style="margin: 0 auto;max-width: 600px;">
      <Card style="margin: 20px;">
        <h1 :class="isRtl ? 'text-right' : 'text-left'" style="font-size: 16px;margin: 16px 0;">{{ $t('addNewTask') }}</h1>
        <p :class="isRtl ? 'text-right' : 'text-left'" style="font-size: 12px;margin: 10px 0;">{{ $t('description') }}</p>
        <Input
        :class="isRtl ? 'rtl' : 'ltr'"
          v-model:value="newTask"
          :placeholder="$t('enterTask')"
          style="margin-bottom: 16px"
          @keyup.enter="addTask"
        />
        <List
          :data-source="tasks"
          bordered
          v-for="task in tasks"
          :key="task.id"
          style="margin: 10px 0;"
        >
          <List.Item>
            <div :class="isRtl ? 'rtl' : 'ltr'" style="display: flex;justify-content: space-between;width: 100%;">
              <div>{{ task.text }}</div>
              <div>
                <EditOutlined style="margin: 0 10px;" @click="startEdit(task)"/>
                <DeleteOutlined @click="removeTask(task.id)"/>
              </div>
            </div>
          </List.Item>
        </List>
      </Card>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import BreadCrumbs from '../layout/BreadCrumbs.vue';
  import { EditOutlined ,DeleteOutlined} from '@ant-design/icons-vue';
  import { Card,Input, List, message, Breadcrumb, BreadcrumbItem } from 'ant-design-vue';
  import { Task } from '../types/Task'
  import { useI18n } from 'vue-i18n';

  const router = useRouter();
  const routeName = router.currentRoute.value.name;
  const newTask = ref('');
  const tasks = ref<Task[]>([]);
  let taskId = ref(1);
  const editingTask = ref<Task | null>(null);
  const i18n = useI18n();
  const isRtl = ref<boolean>(i18n.locale.value === 'fa');
  
  // Retrieve tasks from localStorage on component mount
  onMounted(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      tasks.value = JSON.parse(savedTasks);
      taskId.value = tasks.value.length > 0 ? Math.max(...tasks.value.map(t => t.id)) + 1 : 1;
    }
  });
  
  // Watch the tasks array for changes and update localStorage
  watch(tasks, (newTasks) => {
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }, { deep: true });
  
  const addTask = () => {
    if (newTask.value.trim() === '') {
      message.warning('Please enter a task.');
      return;
    }

    // Check if we are editing an existing task
    if (editingTask.value) {
      const index = editingTask.value 
    ? tasks.value.findIndex((task) => task.id === editingTask.value.id)
    : -1;
      if (index !== -1) {
        // Update the existing task
        tasks.value[index].text = newTask.value;
      }
      editingTask.value = null; // Reset editingTask after the update
    } else {
      // Check if the new task text already exists
      const existingTaskIndex = tasks.value.findIndex((task) => task.text === newTask.value.trim());
      if (existingTaskIndex === -1) {
        // Add a new task if it doesn't exist
        tasks.value.push({ id: taskId.value++, text: newTask.value.trim() });
      } else {
        // Optionally, handle the case where the task already exists
        message.info('This task already exists.');
      }
    }
    newTask.value = ''; // Clear the input field
  };

  
  const removeTask = (id: number) => {
    const index = tasks.value.findIndex((task) => task.id === id);
    if (index !== -1) {
      tasks.value.splice(index, 1);
    }
  };
  
  const startEdit = (task: Task) => {
    editingTask.value = { ...task };
    newTask.value = task.text;
  };
  watch(
    () => i18n.locale.value,
    (newLocale) => {
      isRtl.value = newLocale === 'fa';
    }
  );
  </script>

  

  