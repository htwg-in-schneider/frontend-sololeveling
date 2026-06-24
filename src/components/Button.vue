<template>
  <button :class="['btn', variant]">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'accent' // accent | secondary
  }
})
</script>

<style scoped>
.btn {
  padding: 10px 20px;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: 0.2s;
}

/* ACCENT */
.accent {
  background: #9333ea;
  color: white;
}

/* SECONDARY */
.secondary {
  background: #11001C;
  color: white;
}

.btn:hover {
  transform: scale(1.05);
}
</style>