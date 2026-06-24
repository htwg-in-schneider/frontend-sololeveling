<template>
  <div class="friend-tasks-view">
    <section class="friend-header">
      <img :src="currentFriend.image" :alt="currentFriend.name" />

      <div>
        <h2>{{ currentFriend.name }}</h2>
        <small>Lv.{{ currentFriend.level }}</small>

        <div class="xp-bar">
          <div
            class="xp-fill"
            :style="{ width: `${(currentFriend.xp / currentFriend.maxXp) * 100}%` }"
          ></div>
        </div>
      </div>
    </section>

    <h1>Aktive Tasks</h1>

    <section class="task-list">
      <div
        v-for="task in currentFriend.tasks"
        :key="task"
        class="task-row"
      >
        <span>{{ task }}</span>

        <button
          class="circle"
          @click="addTask(task)"
        ></button>
      </div>
    </section>

    <button class="arrow left" @click="previousFriend">‹</button>
    <button class="arrow right" @click="nextFriend">›</button>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

import CharlotteImg from '../assets/img/Charlotte.jpeg'
import MarleneImg from '../assets/img/Marlene.jpeg'
import NickiImg from '../assets/img/Nicki.jpeg'
import NellyImg from '../assets/img/Nelly.jpeg'



const friends = [
  {
    name: 'Charlotte',
    level: 2,
    xp: 120,
    maxXp: 300,
    image: CharlotteImg,
    tasks: ['Abgabe', 'Blumen Gießen', 'gym', 'Ein Buch lesen', 'Spazieren']
  },
  {
    name: 'Marlene',
    level: 13,
    xp: 780,
    maxXp: 1000,
    image: MarleneImg,
    tasks: ['Tägliches Training', 'Blumen Gießen', 'Lernen', 'Ein Buch lesen', 'Spazieren']
  },
  {
    name: 'Nicki',
    level: 60,
    xp: 4500,
    maxXp: 5000,
    image: NickiImg,
    tasks: ['Tägliches Training', 'Blumen Gießen', 'Lernen', 'Ein Buch lesen', 'Spazieren']
  },
  {
    name: 'Nelly',
    level: 20,
    xp: 1500,
    maxXp: 2000,
    image: NellyImg,
    tasks: ['Tägliches Training', 'Blumen Gießen', 'Lernen', 'Ein Buch lesen', 'Spazieren']
  }
]

import { useRoute } from 'vue-router'

const route = useRoute()

const startIndex = friends.findIndex(friend =>
  friend.name.toLowerCase() === route.params.name.toLowerCase()
)

const currentIndex = ref(startIndex >= 0 ? startIndex : 0)

const currentFriend = computed(() => {
  return friends[currentIndex.value]
})

function nextFriend() {
  currentIndex.value = (currentIndex.value + 1) % friends.length
}

function previousFriend() {
  currentIndex.value =
    (currentIndex.value - 1 + friends.length) % friends.length
}

async function addTask(taskName) {
  const payload = {
    name: taskName,
    description: `Von ${currentFriend.value.name} übernommen`,
    type: 'once',
    deadline: null,
    interval: null
  }

  try {
    await fetch('http://127.0.0.1:3000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    alert(`Task "${taskName}" wurde zu deinen Tasks hinzugefügt`)
  } catch (err) {
    console.error(err)
    alert('Task konnte nicht hinzugefügt werden')
  }
}
</script>

<style scoped>
.friend-tasks-view {
  max-width: 390px;
  margin: 0 auto;
  padding: 0 18px 90px;
  color: white;
  position: relative;
  min-height: 80vh;
}

.friend-header {
  display: grid;
  grid-template-columns: 70px 1fr;
  gap: 16px;
  align-items: center;
  margin-bottom: 26px;
}

.friend-header img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 3px solid white;
  object-fit: cover;
}

.friend-header h2 {
  margin: 0;
  font-size: 20px;
}

.friend-header small {
  border: 1px solid white;
  border-radius: 999px;
  padding: 2px 6px;
}

.xp-bar {
  margin-top: 10px;
  height: 5px;
  background: rgba(255,255,255,0.3);
  border-radius: 999px;
  overflow: hidden;
}

.xp-fill {
  height: 100%;
  background: white;
}

h1 {
  text-align: center;
  font-size: 32px;
  margin-bottom: 20px;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.task-row {
  background: #2b0046;
  border-radius: 999px;
  padding: 13px 10px 13px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background: #e7e7e7;
  cursor: pointer;
}

.circle:hover {
  background: #c9a8ff;
}

.arrow {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: white;
  font-size: 34px;
  cursor: pointer;
}

.arrow.left {
  left: 8px;
}

.arrow.right {
  right: 8px;
}
</style>