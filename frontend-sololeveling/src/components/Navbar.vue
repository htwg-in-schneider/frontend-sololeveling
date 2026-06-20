<template>
 <header class="navbar">
  <img class="logo" src="../assets/img/logo.jpeg" />

  <nav v-if="route.path === '/'" class="nav-buttons">
    <a href="#features">Guide</a>
    <a href="#home">Home</a>
    <RouterLink to="/login">Anmelden</RouterLink>
  </nav>

  <button
    v-else
    class="back-button"
    @click="goBack"
  >
    Zurück
  </button>
 </header>
</template>

<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

function goBack() {
  router.back()
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 60px;
  flex-wrap: wrap;
}

/* LOGO */
.logo {
  height: 60px;
  border-radius: 20px;
}

/* NAV LINKS */
.nav-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.nav-buttons a {
  padding: 10px 20px;
  background: #11001C;
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-size: 14px;
}

/* BUTTON WRAPPER */
.actions {
  display: flex;
  align-items: center;
}

.back-button {
  padding: 10px 20px;
  background: #11001C;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 14px;
  cursor: pointer;
}

.back-button:hover {
  opacity: 0.85;
}

/* MOBILE */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
}
</style>