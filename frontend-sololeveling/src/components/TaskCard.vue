<template>
  <div class="task-row" :class="{ expired: isExpired }">
    <div class="task-info">
      <h3>{{ task.name }}</h3>
      <p v-if="task.description">{{ task.description }}</p>
    </div>

    <div class="task-status">
      <span class="time">{{ displayTime }}</span>

      <button
        class="circle"
        :class="{ done: isDone }"
        @click="toggleDone"
        title="Task abschließen"
      ></button>
    </div>

    <div v-if="showActions" class="actions">
     <button @click="goToEdit(task.id)">Bearbeiten</button>
     <button class="delete" @click="deleteTask(task.id)">Löschen</button>
    </div>

  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  task: Object,
  showActions: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['deleted'])

const router = useRouter()

const isDone = ref(props.task.done || false)

function toggleDone() {
  isDone.value = !isDone.value
}

const isExpired = computed(() => {
  if (isDone.value) return false
  if (!props.task.deadline) return false

  return new Date(props.task.deadline).getTime() <= Date.now()
})

const displayTime = computed(() => {
  if (props.task.interval_field === 'daily') return 'd'
  if (props.task.interval_field === 'weekly') return 'w'

  if (!props.task.deadline) return ''

  const diff = new Date(props.task.deadline).getTime() - Date.now()

  if (diff <= 0) return '0s'

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days}d`
  if (hours > 0) return `${hours}h`
  if (minutes > 0) return `${minutes}m`
  return `${seconds}s`
})



function goToEdit(id) {
  router.push(`/task/edit/${id}`)
}

async function deleteTask(id) {
  try {
    const res = await fetch(`http://127.0.0.1:3000/tasks/${id}`, {
      method: 'DELETE'
    })

    if (!res.ok) throw new Error('Delete failed')

    emit('deleted', id)
  } catch (err) {
    console.error(err)
    alert('Task konnte nicht gelöscht werden')
  }
}
</script>

<style scoped>
.task-row {
  background: #2b0046;
  border-radius: 28px;
  padding: 12px 18px;
  color: white;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  align-items: center;
}

.task-row.expired {
  background: #b00000;
}

.task-info h3 {
  margin: 0;
  font-size: 17px;
}

.task-info p {
  margin: 4px 0 0;
  font-size: 13px;
  opacity: 0.8;
}

.task-status {
  display: flex;
  align-items: center;
  gap: 10px;
}

.time {
  min-width: 24px;
  font-weight: bold;
  text-align: right;
}

.circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: #e7e7e7;
  cursor: pointer;
  position: relative;
}

.circle.done::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 34px;
  background: #111;
  top: -3px;
  left: 12px;
  transform: rotate(25deg);
  border-radius: 4px;
}

.actions {
  grid-column: 1 / -1;
  display: flex;
  gap: 10px;
  margin-top: 6px;
}

.actions button {
  padding: 7px 12px;
  border-radius: 9px;
  border: none;
  cursor: pointer;
  background: #500d87;
  color: white;
}

.actions .delete {
  background: #b00020;
}
</style>