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
      <div
  v-for="task in topTasks"
  :key="task.id"
  class="task"
>
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
    <button @click="$router.push('/friends')">
      Alle Anzeigen
    </button>
  </div>

  <div class="friends">
    <div
      v-for="friend in friends"
      :key="friend.name"
      class="friend"
      @click="$router.push(`/friends/${friend.name}/tasks`)"
    >
      <img
        :src="friend.image"
        :alt="friend.name"
        class="friend-image"
      />

      <p>
        {{ friend.name }}
        <br>
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
          <p>XP Fortschritt <span>{{ xp }}/ 1000xp</span></p>
            <div class="bar">
                <div
                 :style="{
                  width: `${Math.min((xp / 1000) * 100, 100)}%`
                }"
            ></div>
           </div>
          <p>Nächstes Level: <b>28</b></p>
          <p>Benötigt: <b>533xp</b></p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
const xp = ref(
  Number(localStorage.getItem('xp') || 467)
)
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
async function toggleTask(task) {
  task.done = !task.done
}

onMounted(async () => {
  try {
   const token = localStorage.getItem('token')

   const res = await fetch('https://backend-sololeveling.onrender.com/tasks', {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
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
  width: 95%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 16px 70px;
  color: white;
}

.menu {
  background: #3a2b3f;
  border-radius: 40px;
  padding: 16px;
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
}

.menu button {
  background: none;
  border: none;
  color: white;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.menu span {
  font-size: 16px;
}

.block {
  border-top: 1px solid rgba(255,255,255,0.6);
  padding: 24px 0;
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title h2 {
  font-size: 28px;
}

.section-title button {
  border: none;
  border-radius: 20px;
  background: #8d20ff;
  color: white;
  padding: 10px 18px;
  cursor: pointer;
  font-size: 16px;
}

.task {
  background: #2b0046;
  border-radius: 25px;
  padding: 18px 24px;
  margin: 12px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
}

.check {
  width: 34px;
  height: 34px;
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
  height: 40px;
  background: #111;
  top: -4px;
  left: 15px;
  transform: rotate(25deg);
  border-radius: 4px;
}

.friends {
  display: flex;
  justify-content: space-around;
  text-align: center;
  gap: 20px;
  flex-wrap: wrap;
}

.friend {
  width: auto;
}

.friend-image {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.8);
}

.friend p {
  font-size: 16px;
  margin: 8px 0 0;
}

.level-box {
  display: flex;
  gap: 40px;
  align-items: center;
}

.circle {
  width: 180px;
  height: 180px;
  border: 8px solid #ddd;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ddd;
}

.circle strong {
  font-size: 60px;
}

.circle span {
  font-size: 22px;
}

.level-info {
  flex: 1;
  font-size: 20px;
}

.level-info p {
  display: flex;
  justify-content: space-between;
}

.bar {
  height: 6px;
  background: white;
  margin: 12px 0;
}

.bar div {
  width: 46%;
  height: 100%;
  background: #b983ff;
}

@media (max-width: 600px) {
  .dashboard {
    width: 100%;
    max-width: 390px;
    padding: 0 16px 70px;
  }

  .menu button {
    font-size: 24px;
  }

  .menu span {
    font-size: 12px;
  }

  .section-title h2 {
    font-size: 16px;
  }

  .task {
    font-size: 16px;
    padding: 14px 18px;
  }

  .friend {
    width: 72px;
  }

  .friend-image {
    width: 64px;
    height: 80px;
  }

  .friend p {
    font-size: 11px;
  }

  .circle {
    width: 130px;
    height: 130px;
  }

  .circle strong {
    font-size: 42px;
  }

  .circle span {
    font-size: 16px;
  }

  .level-info {
    font-size: 13px;
  }
}

</style>