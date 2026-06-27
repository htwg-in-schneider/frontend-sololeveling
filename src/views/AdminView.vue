<template>
  <div class="admin-view">
    <h1>👑 Admin Bereich</h1>

    <section class="admin-section">
      <h2>📋 Tasks verwalten</h2>

      <div class="filters">
        <input v-model="adminTaskSearch" placeholder="Task suchen..." />

        <select v-model="adminTypeFilter">
           <option value="all">Alle</option>
           <option value="once">Einmalig</option>
           <option value="repeat">Wiederholung</option>
        </select>
      </div>

      <div class="person-task-admin">
        <button class="arrow" @click="previousPerson">‹</button>

        <div class="person-card">
          <h3>{{ currentPerson?.name }}</h3>

          <div class="task-edit-list">
            <div
              v-for="task in filteredCurrentPersonTasks"
              :key="task.source + '-' + task.id"
              class="task-edit-row"
            >
              <input v-model="task.name" class="field" />

              <textarea
                v-model="task.description"
                class="field textarea"
              ></textarea>

              <select v-model="task.type" class="field">
                <option value="once">Einmalig</option>
                <option value="repeat">Wiederholung</option>
              </select>

              <div class="actions">
                <button class="save" @click="saveAnyTask(task)">
                  Speichern
                </button>

                <button class="delete" @click="deleteAnyTask(task)">
                  Löschen
                </button>
              </div>
            </div>
          </div>

          <p v-if="filteredCurrentPersonTasks.length === 0">
            Keine Tasks vorhanden
          </p>
        </div>

        <button class="arrow" @click="nextPerson">›</button>
      </div>
    </section>

    <section class="admin-section">
      <h2>👥 Benutzer verwalten</h2>

      <div class="user-list">
        <div
          v-for="user in users"
          :key="user.id"
          class="user-card"
        >
          <input v-model="user.username" class="field" />
          <input v-model="user.email" class="field" />
          <input v-model="user.password" class="field" />

          <select v-model="user.role" class="field">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <div class="actions">
            <button class="save" @click="saveUser(user)">
              Speichern
            </button>

            <button class="delete" @click="deleteUser(user)">
              Löschen
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const tasks = ref([])
const users = ref([])
const friendTasks = ref([])

const currentPersonIndex = ref(0)

function token() {
  return localStorage.getItem('token')
}

const adminTaskSearch = ref('')
const adminTypeFilter = ref('all')

const filteredCurrentPersonTasks = computed(() => {
  return currentPersonTasks.value.filter(task => {
    const matchesSearch =
      task.name?.toLowerCase().includes(adminTaskSearch.value.toLowerCase())

    const matchesType =
      adminTypeFilter.value === 'all' || task.type === adminTypeFilter.value

    return matchesSearch && matchesType
  })
})

async function loadTasks() {
  const res = await fetch('https://backend-sololeveling.onrender.com/admin/tasks', {
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })

  tasks.value = await res.json()
}

async function loadUsers() {
  const res = await fetch('https://backend-sololeveling.onrender.com/admin/users', {
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })

  users.value = await res.json()
}

async function loadFriendTasks() {
  const res = await fetch('https://backend-sololeveling.onrender.com/admin/friend-tasks', {
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })

  friendTasks.value = await res.json()
}

const allPersons = computed(() => {
  const persons = [
    {
      name: 'User',
      source: 'user'
    }
  ]

  const friendNames = [
    ...new Set(
      friendTasks.value.map(task => task.owner)
    )
  ]

  friendNames.forEach(name => {
    persons.push({
      name,
      source: 'friend'
    })
  })

  return persons
})

const currentPerson = computed(() => {
  return allPersons.value[currentPersonIndex.value]
})

const currentPersonTasks = computed(() => {
  if (!currentPerson.value) return []

  if (currentPerson.value.source === 'user') {
    return tasks.value.map(task => ({
      ...task,
      source: 'user'
    }))
  }

  return friendTasks.value
    .filter(
      task =>
        task.owner === currentPerson.value.name
    )
    .map(task => ({
      ...task,
      source: 'friend'
    }))
})

function nextPerson() {
  if (!allPersons.value.length) return

  currentPersonIndex.value =
    (currentPersonIndex.value + 1) %
    allPersons.value.length
}

function previousPerson() {
  if (!allPersons.value.length) return

  currentPersonIndex.value =
    (currentPersonIndex.value - 1 +
      allPersons.value.length) %
    allPersons.value.length
}

async function saveAnyTask(task) {
  const url =
    task.source === 'user'
      ? `https://backend-sololeveling.onrender.com/admin/tasks/${task.id}`
      : `https://backend-sololeveling.onrender.com/admin/friend-tasks/${task.id}`

  await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token()}`
    },
    body: JSON.stringify(task)
  })

  alert('Task gespeichert')
}

async function deleteAnyTask(task) {
  const url =
    task.source === 'user'
      ? `https://backend-sololeveling.onrender.com/admin/tasks/${task.id}`
      : `https://backend-sololeveling.onrender.com/admin/friend-tasks/${task.id}`

  await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })

  if (task.source === 'user') {
    tasks.value = tasks.value.filter(
      t => t.id !== task.id
    )
  } else {
    friendTasks.value =
      friendTasks.value.filter(
        t => t.id !== task.id
      )
  }
}

async function saveUser(user) {
  await fetch(
    `https://backend-sololeveling.onrender.com/admin/users/${user.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token()}`
      },
      body: JSON.stringify(user)
    }
  )

  alert('User gespeichert')
}

async function deleteUser(user) {
  await fetch(
    `https://backend-sololeveling.onrender.com/admin/users/${user.id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token()}`
      }
    }
  )

  users.value = users.value.filter(
    u => u.id !== user.id
  )

  friendTasks.value =
    friendTasks.value.filter(
      task => task.owner !== user.username
    )
}

onMounted(() => {
  loadTasks()
  loadUsers()
  loadFriendTasks()
})
</script>

<style scoped>
.admin-view {
  width: 95%;
  max-width: 1200px;
  margin: 0 auto;
  color: white;
  padding-bottom: 80px;
}

h1 {
  text-align: center;
  font-size: 42px;
}

.admin-section {
  margin-top: 40px;
}

.task-switch,
.friend-admin {
  display: grid;
  grid-template-columns: 70px 1fr 70px;
  gap: 20px;
  align-items: center;
}

.arrow {
  background: none;
  border: none;
  color: white;
  font-size: 48px;
  cursor: pointer;
}

.card,
.user-card,
.friend-card {
  background: #2b0046;
  border-radius: 28px;
  padding: 24px;
}

.friend-card h3 {
  text-align: center;
  font-size: 32px;
  margin-top: 0;
}

.friend-task-row {
  background: rgba(255,255,255,0.08);
  border-radius: 24px;
  padding: 18px;
  margin-bottom: 16px;
}

.user-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.field {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 12px;
  padding: 12px;
  border-radius: 18px;
  border: none;
}

.textarea {
  min-height: 120px;
}

.actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.save,
.delete {
  border: none;
  border-radius: 999px;
  padding: 12px 18px;
  cursor: pointer;
}

.save {
  background: #8d20ff;
  color: white;
}

.delete {
  background: #b00020;
  color: white;
}

.person-task-admin {
  display: grid;
  grid-template-columns: 70px 1fr 70px;
  gap: 20px;
  align-items: center;
}

.person-card {
  background: #2b0046;
  border-radius: 28px;
  padding: 24px;
}

.person-card h3 {
  text-align: center;
  font-size: 32px;
  margin-top: 0;
}

.task-edit-row {
  background: rgba(255,255,255,0.08);
  border-radius: 24px;
  padding: 18px;
  margin-bottom: 16px;
}

.task-edit-list{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;

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

@media (max-width: 700px) {
  .task-switch,
  .friend-admin {
    grid-template-columns: 40px 1fr 40px;
  }

  .user-list {
    grid-template-columns: 1fr;
  }

  .task-edit-list{
    grid-template-columns: 1fr;
  }
  
}


</style>

