<template>
  <div class="task-view">
    <div class="top">
      <h1>Deine Tasks</h1>
      
    </div>


    <div class="filters">
     <input v-model="search" placeholder="Task suchen..." />

      <select v-model="typeFilter">
       <option value="all">Alle</option>
       <option value="once">Einmalig</option>
       <option value="repeat">Wiederholung</option>
      </select>
    </div>

    <section class="task-list">
      <TaskCard
        v-for="task in filteredTasks"
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

      <label> XP: </label>
      <select v-model="xpReward">
        <option :value="10">10 XP</option>
        <option :value="20">20 XP</option>
        <option :value="30">30 XP</option>
        <option :value="40">40 XP</option>
        <option :value="50">50 XP</option>
      </select>

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
import { ref, onMounted, computed } from 'vue'
import TaskCard from '../components/TaskCard.vue'

const tasks = ref([])
const xpReward = ref(10)
const name = ref('')
const description = ref('')
const type = ref('once')
const deadline = ref('')
const interval = ref('')

const search = ref('')
const typeFilter = ref('all')

const filteredTasks = computed(() => {
  return tasks.value.filter(task => {
    const matchesSearch =
      task.name?.toLowerCase().includes(search.value.toLowerCase())

    const matchesType =
      typeFilter.value === 'all' || task.type === typeFilter.value

    return matchesSearch && matchesType
  })
})

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
  const token = localStorage.getItem('token')

const res = await fetch('http://127.0.0.1:3000/tasks', {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
  const data = await res.json()
  tasks.value = Array.isArray(data) ? data : (data.tasks || [])
}

async function createTask() {
  const payload = {
    name: name.value,
    description: description.value,
    type: type.value,
    deadline: type.value === 'once' ? parseDeadline(deadline.value) : null,
    interval: type.value === 'repeat' ? interval.value : null,
    xpReward: xpReward.value
  }

  const token = localStorage.getItem('token')

  const res = await fetch('http://127.0.0.1:3000/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  })

  if (!res.ok) {
    const data = await res.json()
    alert(data.error || 'Task konnte nicht erstellt werden')
    return
  }

  const createdTask = await res.json()

  const rewards = JSON.parse(localStorage.getItem('taskRewards') || '{}')
  rewards[createdTask.id] = xpReward.value
  localStorage.setItem('taskRewards', JSON.stringify(rewards))

  tasks.value = [createdTask, ...tasks.value]

  name.value = ''
  description.value = ''
  deadline.value = ''
  interval.value = ''
  xpReward.value = 10
}

function removeTask(id) {
  tasks.value = tasks.value.filter(task => task.id !== id)
}


onMounted(loadTasks)
</script>

<style scoped>
.task-view {
  width: 95%;
  max-width: 1400px;
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
  font-size: 42px;
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
  gap: 14px;
}

.create-box {
  margin-top: 34px;
  border-top: 2px solid rgba(255,255,255,0.5);
  padding-top: 24px;
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 18px 30px;
  align-items: center;
}

.create-box h2 {
  grid-column: 1 / -1;
  text-align: center;
  font-size: 44px;
  margin: 0 0 10px;
}

label {
  font-weight: bold;
  font-size: 20px;
}

input {
  width: 100%;
  box-sizing: border-box;
  border-radius: 999px;
  border: 1px solid white;
  padding: 16px 20px;
  background: rgba(255,255,255,0.2);
  color: white;
  font-size: 18px;
}

.type-buttons {
  display: flex;
  flex-direction: column;
  width: 250px;
  justify-self: start;

  gap: 10px;
}

.type-buttons button,
.create-btn {
  width: 220px;
  border: none;
  border-radius: 999px;
  padding: 12px 18px;
  cursor: pointer;
  font-size: 16px;
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

.filters {
  display: flex;
  gap: 12px;
  margin: 20px 0;
}

.filters input,
.filters select {
  padding: 12px 18px;
  border-radius: 999px;
  border: 1px solid white;
  background: rgba(255,255,255,0.2);
  color: white;
}

.filters select {
  background: rgba(255,255,255,0.2);
  color: white;
}

.filters select option {
  background: #2c064b;
  color: white;
}

@media (max-width: 600px) {
  .task-view {
    width: 100%;
    max-width: 420px;
    padding: 24px 16px 80px;
  }

  h1 {
    font-size: 32px;
  }

  .create-box {
    grid-template-columns: 120px;
    gap: 12px;
  }

  .create-box h2 {
    font-size: 34px;
  }

  label {
    font-size: 16px;
  }

  input {
    padding: 8px 12px;
    font-size: 14px;
  }

  .type-buttons button{
    padding: 8px 14px;
    font-size: 14px;
    width: 100%;

  }
  .create-btn {
    padding: 8px 14px;
    font-size: 14px;
    width: 100%;
    grid-column: 1;
  }
}
</style>