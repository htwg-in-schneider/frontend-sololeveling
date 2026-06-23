<template>
  <div class="level-view">

    <h1>📊 Level Übersicht</h1>

    <section class="level-box">

      <div class="circle">
        <span>Level</span>
        <strong>27</strong>
        <span>Rank C</span>
      </div>

      <div class="level-info">
        <p>XP Fortschritt <span>{{xp}}/1000xp</span></p>

        <div class="xp-bar">
           <div
            class="xp-fill"
            :style="{
               width: `${Math.min((xp / 1000) * 100, 100)}%`
            }"
         ></div>
        </div>

        <p>Nächstes Level: <b>28</b></p>
        <p>
          Benötigt:
          <b>{{ Math.max(0, 1000 - xp) }}xp</b>
        </p>
      </div>

    </section>

    <section class="history">

      <h2>Historie</h2>

      <p>Erfolgsprozente: <strong>85%</strong></p>
      <p>Durchschnittliche Tasks pro Monat: <strong>12</strong></p>
      <p>Durchschnittliches Ranking unter Freunden: <strong>3</strong></p>

    </section>

    <section class="ranking">

      <h2>Rank Übersicht</h2>

      <img
        :src="rankingImage"
        alt="Ranking"
        class="ranking-image"
      />

    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import rankingImage from '../assets/img/Ranking.jpeg'

const xp = ref(
  Number(localStorage.getItem('xp') || 467)
)
</script>

<style scoped>
.level-view {
  width: 95%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px 70px;
  color: white;
}

h1 {
  font-size: 42px;
  margin-bottom: 32px;
}

.level-box {
  display: flex;
  gap: 50px;
  align-items: center;
  border-bottom: 1px solid rgba(255,255,255,0.5);
  padding-bottom: 35px;
}

.circle {
  width: 220px;
  height: 220px;
  border: 10px solid rgba(255,255,255,0.8);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: rgba(255,255,255,0.9);
}

.circle strong {
  font-size: 82px;
  line-height: 1;
  margin: 6px 0;
}

.circle span:first-child,
.circle span:last-child {
  font-size: 24px;
}

.level-info {
  flex: 1;
  font-size: 22px;
}

.level-info p {
  display: flex;
  justify-content: space-between;
}

.xp-bar {
  height: 6px;
  background: rgba(255,255,255,0.3);
  margin: 14px 0 24px;
}

.xp-fill {
  width: 47%;
  height: 100%;
  background: white;
}

.history {
  text-align: center;
  border-bottom: 1px solid rgba(255,255,255,0.5);
  padding: 45px 0;
}

.history h2 {
  font-size: 64px;
  margin-bottom: 30px;
}

.history p {
  font-size: 26px;
  margin: 12px 0;
}

.ranking {
  padding-top: 35px;
}

.ranking h2 {
  text-align: center;
  font-size: 64px;
  margin-bottom: 25px;
}

.ranking-image {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  border-radius: 0 0 25px 25px;
  display: block;
}

@media (max-width: 600px) {
  .level-view {
    width: 100%;
    max-width: 420px;
    padding: 0 20px 60px;
  }

  h1 {
    font-size: 32px;
    margin-bottom: 24px;
  }

  .level-box {
    gap: 20px;
    padding-bottom: 25px;
  }

  .circle {
    width: 150px;
    height: 150px;
    border-width: 8px;
  }

  .circle strong {
    font-size: 58px;
  }

  .circle span:first-child,
  .circle span:last-child {
    font-size: 16px;
  }

  .level-info {
    font-size: 14px;
  }

  .history {
    padding: 30px 0;
  }

  .history h2,
  .ranking h2 {
    font-size: 52px;
  }

  .history p {
    font-size: 22px;
  }

  .ranking-image {
    max-width: 100%;
  }
}
</style>