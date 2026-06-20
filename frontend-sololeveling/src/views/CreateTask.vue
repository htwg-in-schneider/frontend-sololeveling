<template>
  <div class="form">

    <h1>Neuer Task</h1>

    <!-- NAME -->
    <input v-model="name" placeholder="Task Name" />

    <!-- DESCRIPTION -->
    <textarea v-model="description" placeholder="Beschreibung"></textarea>

    <!-- TYPE -->
    <div class="type-select">
      <label>
        <input type="radio" value="once" v-model="type" />
        Einmalig
      </label>

      <label>
        <input type="radio" value="repeat" v-model="type" />
        Mehrfach
      </label>
    </div>

    <!-- EINMALIG -->
    <div v-if="type === 'once'">
      <input v-model="deadline" placeholder="Zeitlimit (z.B. 2h / 3 Tage)" />
    </div>

    <!-- MEHRFACH -->
    <div v-if="type === 'repeat'">
      <input v-model="interval" placeholder="Wiederholung (z.B. täglich / 3 Tage)" />
    </div>

    <button @click="createTask">
      Task erstellen
    </button>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const description = ref('')
const type = ref('once')

const deadline = ref('')
const interval = ref('')

function parseDeadline(input) {
  const value = input.trim().toLowerCase()

  const match = value.match(/^(\d+)\s*(s|m|h|d|tag|tage)$/)

  if (!match) {
    return input
  }

  const amount = Number(match[1])
  const unit = match[2]

  const now = new Date()

  if (unit === 's') now.setSeconds(now.getSeconds() + amount)
  if (unit === 'm') now.setMinutes(now.getMinutes() + amount)
  if (unit === 'h') now.setHours(now.getHours() + amount)
  if (unit === 'd' || unit === 'tag' || unit === 'tage') {
    now.setDate(now.getDate() + amount)
  }

  return now.toISOString()
}

async function createTask() {
  const payload = {
    name: name.value,
    description: description.value,
    type: type.value,
    deadline: type.value === 'once' ? parseDeadline(deadline.value) : null,
    interval: type.value === 'repeat' ? interval.value : null
  }

  try {
    await fetch('http://127.0.0.1:3000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    alert('Task erstellt')
    router.push('/tasks')
    
  } catch (err) {
  console.error('CREATE TASK FEHLER:', err)

  alert(
    'Fehler beim Erstellen\n\n' +
    (err?.message || 'Unbekannter Fehler')
  )
  }
}
</script>

<style scoped>
.form {
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form h1 {
  text-align: center;
  margin-bottom: 20px;
}

input,
textarea {
  padding: 14px 18px;
  border-radius: 25px;
  border: none;
  outline: none;
  font-size: 15px;
}

textarea {
  min-height: 100px;
  resize: vertical;
}

.type-select {
  display: flex;
  gap: 15px;
}

.type-select label {
  flex: 1;
  background: #500d87;
  padding: 12px;
  border-radius: 25px;
  text-align: center;
  cursor: pointer;
}

.type-select input[type="radio"] {
  margin-right: 8px;
}

button {
  margin-top: 10px;
  padding: 14px;
  border: none;
  border-radius: 25px;
  background: #11001c;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
</style>