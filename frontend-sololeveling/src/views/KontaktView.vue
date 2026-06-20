<template>
  <div class="page">
    <h1>Kontakt</h1>

    <form @submit.prevent="sendMail">
      <input
        v-model="name"
        type="text"
        placeholder="Name"
        required
      />

      <input
        v-model="email"
        type="email"
        placeholder="E-Mail"
        required
      />

      <textarea
        v-model="message"
        placeholder="Nachricht"
        rows="6"
        required
      ></textarea>

      <button type="submit">
        Nachricht senden
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')

function sendMail() {
  window.location.href =
    `mailto:darya@example.de?subject=Kontaktanfrage von ${name.value}&body=${message.value}%0A%0AAbsender: ${email.value}`
}
</script>

<style scoped>
.page {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input,
textarea {
  padding: 10px;
}

button {
  padding: 10px;
}
</style>