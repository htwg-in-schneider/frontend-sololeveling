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

const allFriends = [
  {
    name: 'Charlotte',
    level: 2,
    xp: 120,
    maxXp: 300,
    image: CharlotteImg,
    tasks: ['Abgabe', 'Blumen Gießen', 'Gym']
  },
  {
    name: 'Marlene',
    level: 13,
    xp: 780,
    maxXp: 1000,
    image: MarleneImg,
    tasks: ['Lernen', 'Spazieren', 'Lesen']
  },
  {
    name: 'Nicki',
    level: 60,
    xp: 4500,
    maxXp: 5000,
    image: NickiImg,
    tasks: ['Training', 'Kochen', 'Aufräumen']
  },
  {
    name: 'Nelly',
    level: 20,
    xp: 1500,
    maxXp: 2000,
    image: NellyImg,
    tasks: ['Joggen', 'Lernen', 'Wäsche']
  }
]

const savedNames = JSON.parse(localStorage.getItem('activeFriends')) || [
  'Charlotte',
  'Marlene',
  'Nicki',
  'Nelly'
]

const friends = ref(
  allFriends.filter(friend =>
    savedNames.includes(friend.name)
  )
)

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

function saveFriends() {
  const names = friends.value.map(friend => friend.name)
  localStorage.setItem('activeFriends', JSON.stringify(names))
}

function removeFriend(name) {
  friends.value = friends.value.filter(friend => friend.name !== name)
  saveFriends()
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
    saveFriends()
  }

  newFriendName.value = ''
}
</script>

<style scoped>
.friends-view {
  width: 95%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 18px 70px;
  color: white;
}

.friend-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.friend-row {
  display: grid;
  grid-template-columns: 90px 1fr 80px 130px;
  gap: 20px;
  align-items: center;
  cursor: pointer;
  border-radius: 18px;
  padding: 8px;
  transition: 0.2s;
}

.friend-row:hover {
  background: rgba(255, 255, 255, 0.08);
}

.friend-image {
  width: 82px;
  height: 82px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
}

.friend-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.name {
  font-size: 22px;
  font-weight: bold;
}

.level-badge {
  border: 1px solid white;
  border-radius: 999px;
  padding: 6px 8px;
  text-align: center;
  font-size: 14px;
}

.xp-bar {
  width: 100%;
  height: 10px;
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
  padding: 10px 14px;
  cursor: pointer;
  font-size: 15px;
}

.add-friend {
  margin-top: 40px;
  padding-top: 24px;
}

.add-row {
  display: flex;
  gap: 14px;
}

.add-row input {
  flex: 1;
  padding: 14px 18px;
  border-radius: 25px;
  border: 1px solid white;
  outline: none;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.add-row button {
  border: none;
  border-radius: 999px;
  padding: 10px 18px;
  cursor: pointer;
  font-size: 15px;
}

.ranking {
  margin-top: 45px;
  text-align: center;
}

.podium {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 40px;
  min-height: 280px;
}

.place {
  width: 120px;
}

.rank-number {
  display: block;
  font-size: 32px;
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
  width: 86px;
  height: 86px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
}

.first .bar {
  height: 120px;
  background: gold;
}

.second .bar {
  height: 75px;
  background: silver;
}

.third .bar {
  height: 45px;
  background: #cd7f32;
}

.bar {
  width: 82px;
  margin: 0 auto;
}

@media (max-width: 600px) {
  .friends-view {
    width: 100%;
    max-width: 420px;
    padding: 0 18px 70px;
  }

  .friend-list {
    gap: 18px;
  }

  .friend-row {
    grid-template-columns: 60px 1fr 55px 95px;
    gap: 12px;
    padding: 4px;
  }

  .friend-image {
    width: 56px;
    height: 56px;
  }

  .name {
    font-size: 17px;
  }

  .level-badge {
    padding: 4px 6px;
    font-size: 11px;
  }

  .xp-bar {
    height: 8px;
  }

  .friend-row button {
    padding: 8px;
    font-size: 12px;
  }

  .add-row {
    gap: 10px;
  }

  .add-row input {
    font-size: 15px;
  }

  .add-row button {
    padding: 10px 16px;
    font-size: 12px;
  }

  .podium {
    gap: 18px;
    min-height: 220px;
  }

  .place {
    width: 90px;
  }

  .rank-number {
    font-size: 26px;
  }

  .podium-image {
    width: 66px;
    height: 66px;
  }

  .first .bar {
    height: 90px;
  }

  .second .bar {
    height: 55px;
  }

  .third .bar {
    height: 28px;
  }

  .bar {
    width: 62px;
  }
}
</style>