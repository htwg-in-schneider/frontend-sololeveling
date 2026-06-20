<template>
  <div class="friends-view">

    <h1>👥 Deine Freunde</h1>

    <section class="friend-list">
      <div
        v-for="friend in friends"
        :key="friend.name"
        class="friend-row"
        @click="$router.push(`/friends/${friend.name}/tasks`)"
      >
        <img
          :src="friend.image"
          :alt="friend.name"
          class="friend-image"
        />

        <div class="friend-info">
          <span class="name">
            {{ friend.name }}
          </span>

          <div class="xp-bar">
            <div
              class="xp-fill"
              :style="{ width: `${(friend.xp / friend.maxXp) * 100}%` }"
            ></div>
          </div>

          <small>
            {{ friend.xp }}/{{ friend.maxXp }} XP
          </small>
        </div>

        <small class="level-badge">
          Lv.{{ friend.level }}
        </small>

        <button @click.stop="removeFriend(friend.name)">
          Entfernen
        </button>
      </div>
    </section>

    <section class="add-friend">
      <h2>Freunde hinzufügen</h2>

      <label>Name eingeben:</label>

      <div class="add-row">
        <input v-model="newFriendName" />

        <button @click="sendRequest">
          Anfrage schicken
        </button>
      </div>
    </section>

    <section class="ranking">
      <h2>Ranking</h2>

      <div class="podium">
        <div
          v-for="person in podiumRanking"
          :key="person.name"
          class="place"
          :class="person.positionClass"
        >
          <span class="rank-number">
            {{ person.rank }}
          </span>

          <img
            :src="person.image"
            :alt="person.name"
            class="podium-image"
          />

          <p>{{ person.name }}</p>

          <div class="bar"></div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

import CharlotteImg from '../assets/img/Charlotte.jpeg'
import MarleneImg from '../assets/img/Marlene.jpeg'
import NickiImg from '../assets/img/Nicki.jpeg'
import NellyImg from '../assets/img/Nelly.jpeg'

const newFriendName = ref('')

const friends = ref([
  {
    name: 'Charlotte',
    level: 2,
    xp: 120,
    maxXp: 300,
    image: CharlotteImg
  },
  {
    name: 'Marlene',
    level: 13,
    xp: 780,
    maxXp: 1000,
    image: MarleneImg
  },
  {
    name: 'Nicki',
    level: 60,
    xp: 4500,
    maxXp: 5000,
    image: NickiImg
  },
  {
    name: 'Nelly',
    level: 20,
    xp: 1500,
    maxXp: 2000,
    image: NellyImg
  }
])

const me = {
  name: 'Ich',
  level: 27,
  xp: 467,
  maxXp: 1000,
  image: NickiImg
}

const ranking = computed(() => {
  return [...friends.value, me]
    .sort((a, b) => b.level - a.level)
})

const podiumRanking = computed(() => {
  const topThree = ranking.value.slice(0, 3)

  return [
    {
      ...topThree[2],
      rank: 3,
      positionClass: 'third'
    },
    {
      ...topThree[0],
      rank: 1,
      positionClass: 'first'
    },
    {
      ...topThree[1],
      rank: 2,
      positionClass: 'second'
    }
  ].filter(Boolean)
})

function removeFriend(name) {
  friends.value = friends.value.filter(
    friend => friend.name !== name
  )
}

function sendRequest() {
  const name = newFriendName.value.trim()

  if (!name) {
    alert('Bitte Namen eingeben')
    return
  }

  const availableFriends = [
    {
      name: 'Charlotte',
      level: 2,
      xp: 120,
      maxXp: 300,
      image: CharlotteImg
    },
    {
      name: 'Marlene',
      level: 13,
      xp: 780,
      maxXp: 1000,
      image: MarleneImg
    },
    {
      name: 'Nicki',
      level: 60,
      xp: 4500,
      maxXp: 5000,
      image: NickiImg
    },
    {
      name: 'Nelly',
      level: 20,
      xp: 1500,
      maxXp: 2000,
      image: NellyImg
    }
  ]

  const friend = availableFriends.find(
    f => f.name.toLowerCase() === name.toLowerCase()
  )

  if (!friend) {
    alert('Freund nicht gefunden')
    return
  }

  const alreadyExists = friends.value.some(
    f => f.name === friend.name
  )

  if (!alreadyExists) {
    friends.value.push(friend)
  }

  newFriendName.value = ''
}
</script>

<style scoped>
.friends-view {
  max-width: 420px;
  margin: 0 auto;
  padding: 0 18px 70px;
  color: white;
}

.friend-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.friend-row {
  display: grid;
  grid-template-columns: 60px 1fr 55px 95px;
  gap: 12px;
  align-items: center;
  cursor: pointer;
  border-radius: 18px;
  padding: 4px;
  transition: 0.2s;
}

.friend-row:hover {
  background: rgba(255, 255, 255, 0.08);
}

.friend-image {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
}

.friend-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.name {
  font-size: 17px;
  font-weight: bold;
}

.level-badge {
  border: 1px solid white;
  border-radius: 999px;
  padding: 4px 6px;
  text-align: center;
}

.xp-bar {
  width: 100%;
  height: 8px;
  background: rgba(255,255,255,0.2);
  border-radius: 999px;
  overflow: hidden;
}

.xp-fill {
  height: 100%;
  background: #b983ff;
}

.friend-row button {
  background: #b00000;
  color: white;
  border: none;
  border-radius: 999px;
  padding: 8px;
  cursor: pointer;
}

.add-friend {
  margin-top: 30px;
  padding-top: 20px;
}

.add-row {
  display: flex;
  gap: 10px;
}

.add-row input {
  flex: 1;
  padding: 14px 18px;
  border-radius: 25px;
  border: 1px solid white;
  outline: none;
  font-size: 15px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.add-row button {
  border: none;
  border-radius: 999px;
  padding: 10px 16px;
  cursor: pointer;
}

.ranking {
  margin-top: 35px;
  text-align: center;
}

.podium {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 18px;
  min-height: 220px;
}

.place {
  width: 90px;
}

.rank-number {
  display: block;
  font-size: 26px;
  font-weight: bold;
}

.first .rank-number {
  color: gold;
}

.second .rank-number {
  color: silver;
}

.third .rank-number {
  color: #cd7f32;
}

.podium-image {
  width: 66px;
  height: 66px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
}

.first .bar {
  height: 90px;
  background: gold;
}

.second .bar {
  height: 55px;
  background: silver;
}

.third .bar {
  height: 28px;
  background: #cd7f32;
}

.bar {
  width: 62px;
  margin: 0 auto;
}
</style>