<template>
  <div class="form">

    <h1>Task bearbeiten</h1>

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

    <button @click="updateTask">
      Speichern
    </button>

    <button @click="deleteTask">
      Löschen
    </button>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const name = ref('')
const description = ref('')
const type = ref('once')
const deadline = ref('')
const interval = ref('')

onMounted(async () => {
  try {
    const res = await fetch(`http://127.0.0.1:3000/tasks/${route.params.id}`)
    const data = await res.json()

    name.value = data.name
    description.value = data.description
    type.value = data.type || 'once'
    deadline.value = data.deadline || ''
    interval.value = data.interval_field || ''

  } catch (err) {
    console.error('Fehler beim Laden:', err)
  }
})


async function updateTask() {
  try {
    const token = localStorage.getItem('token')

    const res = await fetch(
      `http://127.0.0.1:3000/tasks/${route.params.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: name.value,
          description: description.value,
          type: type.value,
          deadline: type.value === 'once'
            ? deadline.value
            : null,
          interval: type.value === 'repeat'
            ? interval.value
            : null
        })
      }
    )

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error || 'Update fehlgeschlagen')
    }

    alert('Task aktualisiert')
    router.push('/tasks')

  } catch (err) {
    console.error(err)
    alert(err.message || 'Fehler beim Speichern')
  }
}



async function deleteTask() {
  try {
    await fetch(`http://127.0.0.1:3000/tasks/${route.params.id}`, {
      method: 'DELETE'
    })

    alert('Task gelöscht')
    router.push('/tasks')

  } catch (err) {
    alert('Fehler beim Löschen')
    console.error(err)
  }
}
</script>

<style scoped>
.form {
  padding: 40px;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input, textarea {
  padding: 10px;
  border-radius: 8px;
  border: none;
}

.type-select {
  display: flex;
  gap: 20px;
}
</style>