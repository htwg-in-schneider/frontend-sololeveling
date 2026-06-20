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
        <p>XP Fortschritt <span>467/1000xp</span></p>

        <div class="xp-bar">
          <div class="xp-fill"></div>
        </div>

        <p>Nächstes Level: <b>28</b></p>
        <p>Benötigt: <b>533xp</b></p>
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
import rankingImage from '../assets/img/Ranking.jpeg'
</script>

<style scoped>
.level-view {
  max-width: 420px;
  margin: 0 auto;
  padding: 0 20px 60px;
  color: white;
}

h1 {
  font-size: 32px;
  margin-bottom: 24px;
}

.level-box {
  display: flex;
  gap: 20px;
  align-items: center;
  border-bottom: 1px solid rgba(255,255,255,0.5);
  padding-bottom: 25px;
}

.circle {
  width: 150px;
  height: 150px;
  border: 8px solid rgba(255,255,255,0.8);
  border-radius: 50%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
  color: rgba(255,255,255,0.9);
}

.circle strong {
  font-size: 58px;
  line-height: 1;
  margin: 4px 0;
}

.circle span:first-child {
  font-size: 16px;
  margin-bottom: 2px;
}

.circle span:last-child {
  font-size: 16px;
  margin-top: 2px;
}

.level-info {
  flex: 1;
}

.level-info p {
  display: flex;
  justify-content: space-between;
}

.xp-bar {
  height: 4px;
  background: rgba(255,255,255,0.3);
  margin: 10px 0 20px;
}

.xp-fill {
  width: 47%;
  height: 100%;
  background: white;
}

.history {
  text-align: center;
  border-bottom: 1px solid rgba(255,255,255,0.5);
  padding: 30px 0;
}

.history h2 {
  font-size: 52px;
  margin-bottom: 25px;
}

.history p {
  font-size: 22px;
  margin: 10px 0;
}

.ranking {
  padding-top: 25px;
}

.ranking h2 {
  text-align: center;
  font-size: 52px;
  margin-bottom: 20px;
}

.ranking-image {
  width: 100%;
  border-radius: 0 0 25px 25px;
  display: block;
}
</style>