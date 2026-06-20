<template>
  <footer class="footer">
    <p>© 2026 Solo Leveling Tracker</p>

    <div class="links">
      <FooterLink to="/impressum">Impressum</FooterLink>
      <FooterLink to="/kontakt">Kontakt</FooterLink>
      <FooterLink to="/datenschutz">Datenschutz</FooterLink>
    </div>
  </footer>
</template>

<script setup>
import FooterLink from './FooterLink.vue'
</script>

<style scoped>
.footer {
  text-align: center;
  padding: 30px;
  background: #e5e5e5;
  color: black;
}

.links {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}
</style>