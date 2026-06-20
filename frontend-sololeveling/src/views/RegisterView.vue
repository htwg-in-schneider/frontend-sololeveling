<template>
  <div class="register-page">
    <div class="register-card">
      <h2>Sei bereit für<br />dein Abenteuer</h2>

      <label>Benutzername:</label>
      <input v-model="username" type="text" />

      <label>Passwort:</label>
      <input v-model="password" type="password" />

      <label>Email:</label>
      <input v-model="email" type="email" />

      <label>Geburtsdatum:</label>
      <input v-model="birthdate" type="date" />

      <button @click="register">Registrieren</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const password = ref('')
const email = ref('')
const birthdate = ref('')

function register() {
  if (!username.value || !password.value || !email.value || !birthdate.value) {
    alert('Bitte alle Felder ausfüllen')
    return
  }

  localStorage.setItem('username', username.value)
  localStorage.setItem('email', email.value)

  router.push('/login')
}
</script>

<style scoped>
.register-page {
  min-height: 75vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-card {
  width: 260px;
  padding: 32px 28px;
  background: #d9d9d9;
  color: black;
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  gap: 9px;
}

h2 {
  color: #500d87;
  margin-bottom: 20px;
  font-size: 20px;
  text-shadow: 0 8px 16px rgba(0,0,0,0.35);
}

label {
  font-size: 14px;
}

input {
  border: 1px solid #333;
  border-radius: 999px;
  padding: 7px 12px;
  background: transparent;
}

button {
  margin-top: 28px;
  border: none;
  border-radius: 999px;
  padding: 10px;
  background: #3b333b;
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
}
</style>