<template>
  <div class="settings-view">
    <section class="setting-box">
      <button class="setting-title" @click="openPanel = openPanel === 'password' ? '' : 'password'">
        Passwort ändern
      </button>

      <div v-if="openPanel === 'password'" class="setting-content">
        <label>Altes Passwort:</label>
        <input v-model="oldPassword" type="password" />

        <label>Neues Passwort:</label>
        <input v-model="newPassword" type="password" />

        <button class="dark-btn" @click="changePassword">Ändern</button>
      </div>
    </section>

    <section class="setting-box">
      <button class="setting-title" @click="openPanel = openPanel === 'email' ? '' : 'email'">
        Email ändern
      </button>

      <div v-if="openPanel === 'email'" class="setting-content">
        <label>Neue Email:</label>
        <input v-model="email" type="email" />

        <button class="dark-btn" @click="changeEmail">Ändern</button>
      </div>
    </section>

    <section class="setting-box">
      <button class="setting-title" @click="openPanel = openPanel === 'username' ? '' : 'username'">
        Benutzernamen ändern
      </button>

      <div v-if="openPanel === 'username'" class="setting-content">
        <label>Neuer Benutzername:</label>
        <input v-model="username" type="text" />

        <button class="dark-btn" @click="changeUsername">Ändern</button>
      </div>
    </section>

    <section class="setting-box">
      <button class="setting-title delete-title" @click="deleteAccount">
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
          <img :src="avatar.image" :alt="avatar.name" />
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

const openPanel = ref('')
const oldPassword = ref('')
const newPassword = ref('')
const email = ref('')
const username = ref('')
const selectedAvatar = ref('')

const avatars = [
  { name: 'Charlotte', image: CharlotteImg },
  { name: 'Marlene', image: MarleneImg },
  { name: 'Nicki', image: NickiImg },
  { name: 'Nelly', image: NellyImg },
  { name: 'Bild', image: BildImg }
]

onMounted(() => {
  selectedAvatar.value = localStorage.getItem('selectedAvatar') || 'Bild'
  email.value = localStorage.getItem('email') || ''
  username.value = localStorage.getItem('username') || ''
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
  openPanel.value = ''
}

function changeEmail() {
  if (!email.value) {
    alert('Bitte Email eingeben')
    return
  }

  localStorage.setItem('email', email.value)
  alert('Email wurde geändert')
  openPanel.value = ''
}

function changeUsername() {
  if (!username.value) {
    alert('Bitte Benutzernamen eingeben')
    return
  }

  localStorage.setItem('username', username.value)
  alert('Benutzername wurde geändert')
  openPanel.value = ''
}

function deleteAccount() {
  if (confirm('Möchtest du dein Konto wirklich löschen?')) {
    localStorage.clear()
    alert('Konto wurde gelöscht')
    router.push('/')
  }
}
</script>

<style scoped>
.settings-view {
  width: 95%;
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px 90px;
  color: white;
}

.setting-box {
  max-width: 520px;
  margin: 0 auto 22px;
  background: #d9d9d9;
  color: black;
  border-radius: 999px;
  overflow: hidden;
}

.setting-title {
  width: 100%;
  padding: 18px 24px;
  border: none;
  background: transparent;
  color: #500d87;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
}

.delete-title {
  color: black;
}

.setting-content {
  padding: 10px 48px 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.setting-content label {
  font-size: 18px;
  font-weight: bold;
}

.setting-content input {
  padding: 11px 16px;
  border-radius: 999px;
  border: 1px solid black;
  background: transparent;
  font-size: 16px;
}

.dark-btn {
  margin-top: 14px;
  padding: 12px;
  border: none;
  border-radius: 999px;
  background: #3b333b;
  color: white;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
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
  padding: 12px 28px;
  margin-bottom: 28px;
  font-size: 28px;
}

.avatars {
  display: flex;
  justify-content: center;
  gap: 18px;
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
  width: 66px;
  height: 66px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
}

.avatar-button.selected img {
  border: 6px solid #b00000;
}

.setting-box:has(.setting-content) {
  border-radius: 42px;
}

@media (max-width: 600px) {
  .setting-title {
    font-size: 22px;
  }

  .setting-content {
    padding: 10px 28px 28px;
  }

  .profile-section h2 {
    font-size: 23px;
  }

  .avatar-button img {
    width: 58px;
    height: 58px;
  }
}
</style>