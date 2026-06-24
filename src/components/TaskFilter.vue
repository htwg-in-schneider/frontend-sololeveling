<template>
  <div class="filter">

    <input
      v-model="search"
      placeholder="Task suchen..."
      @input="emitFilters"
    />

    <select v-model="type" @change="emitFilters">
      <option value="">Alle</option>
      <option value="once">Einmalig</option>
      <option value="repeat">Wiederholbar</option>
    </select>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['filter'])

const search = ref('')
const type = ref('')

function emitFilters() {
  emit('filter', {
    search: search.value,
    type: type.value
  })
}
</script>

<style scoped>
.filter {
  display: flex;
  gap: 10px;
  padding: 20px 80px;
}

input, select {
  padding: 8px;
  border-radius: 8px;
  border: none;
}
</style>
