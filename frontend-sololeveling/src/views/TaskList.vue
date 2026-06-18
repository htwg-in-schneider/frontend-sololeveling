<template>
  <div class="page">

    

    <section class="hero-small">
      <h1>Deine Tasks</h1>

      <button @click="$router.push('/task/create')">
        Neuer Task
      </button>
    </section>

    <section class="task-grid">

      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @deleted="removeTask"
      />

    </section>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import Navbar from '../components/Navbar.vue'
import TaskCard from '../components/TaskCard.vue'

const tasks = ref([])

function removeTask(id) {
  tasks.value = tasks.value.filter(t => t.id !== id)
}

onMounted(async () => {
  const res = await fetch('http://127.0.0.1:3000/tasks')
  const data = await res.json()

  console.log("TASK RESPONSE:", data)

  tasks.value = Array.isArray(data)
    ? data
    : (data.tasks || [])
})
</script>

<style scoped>
.page {
  width: 100%;
  min-height: 100vh;
  color: white;
}

.hero-small {
  padding: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  padding: 40px;
}
</style>