<template>
  <div class="settings-view">

    <section class="settings-card">
      <h1>Passwort<br />ändern</h1>

      <label>Altes Passwort:</label>
      <input v-model="oldPassword" type="password" />

      <label>Neues Passwort:</label>
      <input v-model="newPassword" type="password" />

      <button @click="changePassword">
        Ändern
      </button>

      <button class="delete" @click="deleteAccount">
        Konto Löschen
      </button>
    </section>

    <section class="profile-section">
      <h2>Profilbild auswählen</h2>

      <div class="avatars">
        <button
          v-for="avatar in avatars"
          :key="avatar.name"
          class="avatar-button"
          :class="{ selected: selectedAvatar === avatar.name }"
          @click="selectAvatar(avatar.name)"
        >
          <img
            :src="avatar.image"
            :alt="avatar.name"
          />
        </button>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import CharlotteImg from '../assets/img/Charlotte.jpeg'
import MarleneImg from '../assets/img/Marlene.jpeg'
import NickiImg from '../assets/img/Nicki.jpeg'
import NellyImg from '../assets/img/Nelly.jpeg'
import BildImg from '../assets/img/Bild.jpeg'

const router = useRouter()

const oldPassword = ref('')
const newPassword = ref('')
const selectedAvatar = ref('')

const avatars = [
  { name: 'Charlotte', image: CharlotteImg },
  { name: 'Marlene', image: MarleneImg },
  { name: 'Nicki', image: NickiImg },
  { name: 'Nelly', image: NellyImg },
  { name: 'Bild', image: BildImg }
]

onMounted(() => {
  const savedAvatar = localStorage.getItem('selectedAvatar')

  if (savedAvatar) {
    selectedAvatar.value = savedAvatar
  } else {
    selectedAvatar.value = 'Bild'
  }
})

function selectAvatar(name) {
  selectedAvatar.value = name
  localStorage.setItem('selectedAvatar', name)
}

function changePassword() {
  if (!oldPassword.value || !newPassword.value) {
    alert('Bitte beide Passwortfelder ausfüllen')
    return
  }

  alert('Passwort wurde geändert')

  oldPassword.value = ''
  newPassword.value = ''
}

function deleteAccount() {
  if (confirm('Möchtest du dein Konto wirklich löschen?')) {

    localStorage.removeItem('selectedAvatar')

    alert('Konto wurde gelöscht')

    router.push('/')
  }
}
</script>

<style scoped>
.settings-view {
  max-width: 420px;
  margin: 0 auto;
  padding: 40px 20px 90px;
  color: white;
}

.settings-card {
  width: 260px;
  margin: 0 auto;
  padding: 35px 32px;
  background: #d9d9d9;
  color: black;
  border-radius: 42px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.settings-card h1 {
  color: #500d87;
  font-size: 28px;
  margin: 0 0 35px;
  text-shadow: 0 10px 20px rgba(0,0,0,0.35);
}

.settings-card label {
  font-size: 17px;
  font-weight: bold;
}

.settings-card input {
  padding: 9px 14px;
  border-radius: 999px;
  border: 1px solid black;
  background: transparent;
  font-size: 16px;
}

.settings-card button {
  margin-top: 10px;
  padding: 10px;
  border: none;
  border-radius: 999px;
  background: #3b333b;
  color: white;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
}

.settings-card .delete {
  margin-top: 12px;
}

.profile-section {
  margin-top: 35px;
  text-align: center;
}

.profile-section h2 {
  display: inline-block;
  background: #d9d9d9;
  color: black;
  border-radius: 999px;
  padding: 8px 20px;
  margin-bottom: 24px;
  font-size: 25px;
}

.avatars {
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
}

.avatar-button {
  border: none;
  background: transparent;
  padding: 0;
  border-radius: 50%;
  cursor: pointer;
}

.avatar-button img {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
}

.avatar-button.selected img {
  border: 6px solid #b00000;
}
</style>

