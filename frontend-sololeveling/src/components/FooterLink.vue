<template>
  <RouterLink class="footer-link" :to="to">
    <slot />
  </RouterLink>
</template>

<script setup>
defineProps({
  to: {
    type: String,
    default: '/'
  }
})
</script>

<style scoped>
.footer-link {
  color: black;
  opacity: 0.8;
  text-decoration: none;
  font-size: 14px;
  transition: 0.2s;
}

.footer-link:hover {
  opacity: 1;
  text-decoration: underline;
}
</style>