<template>
  <img :src="status ? left : right" alt="" >
</template>

<script setup>
import left from '../assets/images/arrow_l.png'
import right from '../assets/images/arrow_r.png'

const status = ref(true)

watch(() => status.value, (bool) => {
  setTimeout(() => {
    status.value = !bool
  }, 200);
})

onMounted(() => {
  status.value = !status.value
})
</script>
