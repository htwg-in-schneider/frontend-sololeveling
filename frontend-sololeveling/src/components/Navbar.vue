<template>
  <header class="navbar">

    <img class="logo" src="../assets/img/logo.jpeg" />

    <nav class="nav-buttons">
      <a href="#features">Guide</a>
      <a href="#home">Home</a>
      <a href="#">Anmelden</a>
    </nav>

    <div class="actions">
      <Button variant="accent">Start</Button>
    </div>

    

  </header>
</template>

<script setup>
import Button from './Button.vue'
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

/* MOBILE */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
}
</style>