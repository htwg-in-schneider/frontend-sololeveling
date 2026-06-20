<template>
  <div class="login-page">
    <div class="login-card">
      <h1>Anmelden</h1>
      <p>Melde dich an, um deine Tasks und dein Level zu verwalten.</p>

      <form @submit.prevent="login">
        <input
          v-model="email"
          type="email"
          placeholder="E-Mail"
          required
        />

        <input
          v-model="password"
          type="password"
          placeholder="Passwort"
          required
        />

        <p v-if="error" class="error">{{ error }}</p>

        <button type="submit">Anmelden</button>
      </form>

      <RouterLink to="/register" class="register-link">
        Noch keinen Account? Registrieren
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')

function login() {
  if (!email.value || !password.value) {
    error.value = 'Bitte E-Mail und Passwort eingeben.'
    return
  }

  // Einfache Demo-Anmeldung für Aufgabe 5
  localStorage.setItem('isLoggedIn', 'true')
  localStorage.setItem('userEmail', email.value)

  router.push('/dashboard')
}
</script>

<style scoped>
.login-page {
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

.login-card {
  width: 100%;
  max-width: 420px;
  padding: 30px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.25);
  text-align: center;
}

h1 {
  margin-bottom: 10px;
}

p {
  opacity: 0.85;
}

form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 25px;
}

input {
  padding: 12px;
  border-radius: 10px;
  border: none;
}

button {
  padding: 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
}

.error {
  color: #ffb3b3;
  font-size: 14px;
}

.register-link {
  display: inline-block;
  margin-top: 20px;
  color: white;
  opacity: 0.85;
  text-decoration: none;
}

.register-link:hover {
  opacity: 1;
  text-decoration: underline;
}
</style>