<template>
  <section class="banner-wrapper">

    <div class="banner-box">

      <h2>Sei bereit für dein Abenteuer</h2>

      <p class="subtitle">Solo Leveling Habit Tracker System</p>

      <button
        class="register-btn"
        @click="$router.push('/register')"
       >
        Registrieren
       </button>

    </div>

  </section>
</template>

<script setup>
</script>

<style scoped>
.banner-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 20px;
}

.banner-box {
  background: rgba(255, 255, 255, 0.646);
  color: #11001C;
  padding: 50px;
  border-radius: 20px;
  max-width: 700px;
  width: 100%;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);


}

h2 {
  font-size: 36px;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 20px;
  opacity: 0.8;
  margin-bottom: 20px;
}

.register-btn {
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  background: #500D87;
  color: rgb(255, 255, 255);
  cursor: pointer;
}
</style>