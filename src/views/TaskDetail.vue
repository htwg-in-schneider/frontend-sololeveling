<template>
  <div class="detail">

    <div v-if="product">

      <img :src="product.image" />

      <h1>{{ product.name }}</h1>
<p>{{ product.description }}</p>
<p>{{ product.type }}</p>
<p v-if="product.deadline">Deadline: {{ product.deadline }}</p>
<p v-if="product.interval">Interval: {{ product.interval }}</p>

    </div>

    <p v-else>Loading...</p>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const product = ref(null)

onMounted(async () => {
  const res = await fetch(`http://127.0.0.1:3000/tasks/${route.params.id}`)
  product.value = await res.json()
})
</script>

<style scoped>
.detail {
  padding: 60px;
  color: white;
}

.img {
  width: 100%;
  max-width: 400px;
  border-radius: 15px;
}

.price {
  font-size: 20px;
  opacity: 0.8;
}

.desc {
  margin-top: 10px;
  line-height: 1.5;
  opacity: 0.9;
}
</style>