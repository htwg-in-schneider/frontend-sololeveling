<template>
  <div class="page">
    <section class="hero" id="home">
      <div class="hero-left">
        <p class="subtitle">Solo Leveling</p>

        <h2>Verwandle dein Leben in ein episches Abenteuer</h2>

        <p class="description">
          Hör auf, mit Motivation und Durchhaltevermögen zu kämpfen.
          Unser bewährtes System verwandelt langweilige Gewohnheiten in spannende Herausforderungen und macht persönliches Wachstum sichtbar und unvermeidlich.
          <br><br>
          Der ultimative „Solo Leveling“-Habit-Tracker, der deine persönliche Entwicklung in ein RPG-Abenteuer verwandelt.
          Sammle XP und steige anhand deiner realen Erfolge vom F-Rang bis zum S-Rang auf.
        </p>

        <SpecialBanner />
      </div>

      <div class="hero-right">
        <img :src="flame" alt="Flamme">
      </div>
    </section>

    <section class="features" id="features">
      <div class="card">
        <h3>Freunde</h3>
        <p>
          Du kannst dich mit deinen Freunden connecten und dich mit ihnen messen.
          Werde der beste und sei im Ranking immer ganz oben.
        </p>
      </div>

      <div class="card">
        <h3>Tasks</h3>
        <p>
          Tasks sind wie deine Währung. Du erstellst deine eigenen Tasks mit zugehörigen Zeiten um sie zu schaffen.
          Wenn du deinen Task abschließt bekommst du XP und steigst im Level auf.
          Wenn du es jedoch nicht schaffst verlierst du XP und möglicherweise auch ein Level.
        </p>
      </div>

      <div class="card">
        <h3>Level</h3>
        <p>
          Level zeigen deinen Fortschritt. Für die ersten 2 Ranks musst du jeweils 5 Level aufsteigen und für alle weiteren bis S 10 Level pro Rank.
          Wenn du Rank S erreichst bist du Teil der besten 5%.
        </p>
      </div>
    </section>

    <section class="ranking-section">
      <img
        :src="rankingImage"
        alt="Rank Progression"
        class="ranking-image"
      />
    </section>
  </div>
</template>

<script setup>
import SpecialBanner from '../components/SpecialBanner.vue'

import flame from '../assets/img/Flame.jpeg'
import rankingImage from '../assets/img/Ranking.jpeg'
</script>

<style scoped>
.page {
  width: 100%;
  min-height: 100vh;
  color: white;
}

.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  padding: 80px 6vw;
  flex-wrap: wrap;
}

.hero-left {
  flex: 1;
  min-width: 280px;
}

.hero-right {
  flex: 1;
  display: flex;
  justify-content: center;
}

.hero-right img {
  width: 100%;
  max-width: 350px;
  filter: drop-shadow(0 0 30px #9333ea);
  border-radius: 0 0 50% 50%;
}

.features {
  display: flex;
  gap: 20px;
  padding: 40px 80px 20px;
}

.card {
  flex: 1;
  padding: 20px;
  border-radius: 12px;
  background: rgba(0,0,0,0.15);
}

.ranking-section {
  padding: 10px 80px 40px;
}

.ranking-image {
  width: 30%;
  min-width: 280px;
  max-width: 350px;
  border-radius: 20px;
  display: block;
}

@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    text-align: center;
    padding: 40px 24px;
  }

  .features {
    flex-direction: column;
    padding: 20px;
  }

  .ranking-section {
    padding: 20px;
  }

  .ranking-image {
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
  }
}
</style>