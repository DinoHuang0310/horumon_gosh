<template>
  <div>
    <div class="flex p-4" v-if="playable">
      <NuxtLink class="px-4 py-2 bg-slate-400 mr-2" to="/battlemode">Start</NuxtLink>
      <NuxtLink class="px-4 py-2 bg-slate-400 mr-2" to="/fastmode">直接捕獲</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import useCardPlate from '../composables/useCardPlate';

const { init, cardPlate, playable } = useCardPlate();

onMounted(init)
</script>
