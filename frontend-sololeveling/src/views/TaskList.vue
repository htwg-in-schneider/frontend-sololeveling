<template>
  <div class="task-view">
    <div class="top">
      <h1>Deine Tasks</h1>
      <button class="back" @click="$router.push('/')">Zurück</button>
    </div>

    <section class="task-list">
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        :show-actions="true"
        @deleted="removeTask"
      />

      <p v-if="tasks.length === 0">Keine Tasks vorhanden</p>
    </section>

    <section class="create-box">
      <h2>Neuer Task</h2>

      <label>Taskname:</label>
      <input v-model="name" />

      <label>Beschreibung:</label>
      <input v-model="description" />

      <div class="type-buttons">
        <button
          :class="{ active: type === 'once' }"
          @click="type = 'once'"
        >
          Einmalig
        </button>

        <button
          :class="{ active: type === 'repeat' }"
          @click="type = 'repeat'"
        >
          Wiederholung
        </button>
      </div>

      <input
        v-if="type === 'once'"
        v-model="deadline"
        placeholder="z.B. 5s, 10m, 2h"
      />

      <input
        v-if="type === 'repeat'"
        v-model="interval"
        placeholder="daily oder weekly"
      />

      <button class="create-btn" @click="createTask">
        Erstellen
      </button>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TaskCard from '../components/TaskCard.vue'

const tasks = ref([])

const name = ref('')
const description = ref('')
const type = ref('once')
const deadline = ref('')
const interval = ref('')

function parseDeadline(input) {
  const value = input.trim().toLowerCase()
  const match = value.match(/^(\d+)\s*(s|m|h|d)$/)

  if (!match) return input

  const amount = Number(match[1])
  const unit = match[2]
  const date = new Date()

  if (unit === 's') date.setSeconds(date.getSeconds() + amount)
  if (unit === 'm') date.setMinutes(date.getMinutes() + amount)
  if (unit === 'h') date.setHours(date.getHours() + amount)
  if (unit === 'd') date.setDate(date.getDate() + amount)

  return date.toISOString()
}

async function loadTasks() {
  const res = await fetch('http://127.0.0.1:3000/tasks')
  const data = await res.json()
  tasks.value = Array.isArray(data) ? data : (data.tasks || [])
}

async function createTask() {
  const payload = {
    name: name.value,
    description: description.value,
    type: type.value,
    deadline: type.value === 'once' ? parseDeadline(deadline.value) : null,
    interval: type.value === 'repeat' ? interval.value : null
  }

  await fetch('http://127.0.0.1:3000/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  name.value = ''
  description.value = ''
  deadline.value = ''
  interval.value = ''

  await loadTasks()
}

function removeTask(id) {
  tasks.value = tasks.value.filter(task => task.id !== id)
}

onMounted(loadTasks)
</script>

<style scoped>
.task-view {
  max-width: 420px;
  margin: 0 auto;
  min-height: 100vh;
  padding: 24px 16px 80px;
  color: white;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  font-size: 32px;
  text-decoration: underline;
}

.back {
  background: transparent;
  color: white;
  border: none;
  cursor: pointer;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.create-box {
  margin-top: 22px;
  border-top: 2px solid rgba(255,255,255,0.5);
  padding-top: 12px;
  display: grid;
  grid-template-columns: 1fr 120px;
  gap: 8px 14px;
  align-items: center;
}

.create-box h2 {
  grid-column: 1 / -1;
  text-align: center;
  font-size: 34px;
  margin: 0;
}

label {
  font-weight: bold;
}

input {
  border-radius: 999px;
  border: 1px solid white;
  padding: 8px 12px;
  background: rgba(255,255,255,0.2);
  color: white;
}

.type-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.type-buttons button,
.create-btn {
  border: none;
  border-radius: 999px;
  padding: 8px 14px;
  cursor: pointer;
}

.type-buttons .active {
  background: white;
  color: #500d87;
  font-weight: bold;
}

.create-btn {
  grid-column: 2;
  background: white;
  color: #500d87;
  font-weight: bold;
}
</style>