<template>
  <div class="dashboard">
    <nav class="menu">
      <button @click="$router.push('/tasks')">📋<span>Tasks</span></button>
      <button @click="$router.push('/friends')">👥<span>Freunde</span></button>
      <button @click="$router.push('/level')">📊<span>Level</span></button>
      <button @click="$router.push('/settings')">⚙️<span>Einstellungen</span></button>
    </nav>

    <section class="block">
      <div class="section-title">
        <h2>📋 Deine Tasks</h2>
        <button @click="$router.push('/tasks')">Alle Anzeigen</button>
      </div>

      <div v-for="task in topTasks" :key="task.id" class="task">
        {{ task.name }}

        <button
          class="check"
          :class="{ done: task.done }"
          @click="toggleTask(task)"
        ></button>
      </div>
    </section>

    <section class="block">
      <div class="section-title">
        <h2>👥 Deine Freunde</h2>
        <button @click="$router.push('/friends')">Alle Anzeigen</button>
      </div>

      <div class="friends">
        <div
          v-for="friend in friends"
          :key="friend.name"
          class="friend"
        >
          <img
            :src="friend.image"
            :alt="friend.name"
            class="friend-image"
          />

          <p>
            {{ friend.name }}<br>
            <small>Lv.{{ friend.level }}</small>
          </p>
        </div>
      </div>
    </section>

    <section class="block">
      <div class="section-title">
        <h2>📊 Level Übersicht</h2>
        <button @click="$router.push('/level')">Mehr Infos</button>
      </div>

      <div class="level-box">
        <div class="circle">
          <span>Level</span>
          <strong>27</strong>
          <span>Rank C</span>
        </div>

        <div class="level-info">
          <p>XP Fortschritt <span>467/1000xp</span></p>
          <div class="bar"><div></div></div>
          <p>Nächstes Level: <b>28</b></p>
          <p>Benötigt: <b>533xp</b></p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

import CharlotteImg from '../assets/img/Charlotte.jpeg'
import MarleneImg from '../assets/img/Marlene.jpeg'
import NickiImg from '../assets/img/Nicki.jpeg'
import NellyImg from '../assets/img/Nelly.jpeg'

const tasks = ref([])

const friends = [
  { name: 'Charlotte', level: 2, image: CharlotteImg },
  { name: 'Marlene', level: 13, image: MarleneImg },
  { name: 'Nicki', level: 60, image: NickiImg },
  { name: 'Nelly', level: 20, image: NellyImg }
]

const topTasks = computed(() => {
  return tasks.value.slice(0, 3)
})

function toggleTask(task) {
  task.done = !task.done
}

onMounted(async () => {
  try {
    const res = await fetch('http://127.0.0.1:3000/tasks')
    const data = await res.json()

    tasks.value = Array.isArray(data)
      ? data
      : (data.tasks || [])
  } catch (err) {
    console.error(err)
  }
})
</script>

<style scoped>
.dashboard {
  max-width: 390px;
  margin: 0 auto;
  padding: 0 16px 70px;
  color: white;
}

.menu {
  background: #3a2b3f;
  border-radius: 40px;
  padding: 12px;
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
}

.menu button {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.menu span {
  font-size: 12px;
}

.block {
  border-top: 1px solid rgba(255,255,255,0.6);
  padding: 18px 0;
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title h2 {
  font-size: 16px;
}

.section-title button {
  border: none;
  border-radius: 20px;
  background: #8d20ff;
  color: white;
  padding: 8px 14px;
  cursor: pointer;
}

.task {
  background: #2b0046;
  border-radius: 25px;
  padding: 14px 18px;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.check {
  width: 28px;
  height: 28px;
  background: #ddd;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
}

.check.done::after {
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

.friends {
  display: flex;
  justify-content: space-between;
  text-align: center;
  gap: 8px;
}

.friend {
  width: 72px;
}

.friend-image {
  width: 64px;
  height: 80px;
  object-fit: cover;
  border-radius: 18px;
  border: 2px solid rgba(255,255,255,0.8);
}

.friend p {
  font-size: 11px;
  margin: 6px 0 0;
}

.level-box {
  display: flex;
  gap: 18px;
  align-items: center;
}

.circle {
  width: 130px;
  height: 130px;
  border: 8px solid #ddd;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ddd;
}

.circle strong {
  font-size: 42px;
}

.level-info {
  flex: 1;
  font-size: 13px;
}

.level-info p {
  display: flex;
  justify-content: space-between;
}

.bar {
  height: 4px;
  background: white;
  margin: 8px 0;
}

.bar div {
  width: 46%;
  height: 100%;
  background: #b983ff;
}
</style>