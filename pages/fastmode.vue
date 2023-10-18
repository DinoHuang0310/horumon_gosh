<template>
  <div class="flex flex-wrap h-screen w-full justify-center items-center">
    <div class="w-full">
      <div class="flex justify-center w-full">
        <Grass v-if="takedCard" class="w-1/5 mx-4" :card="takedCard" ref="grassRef" />
      </div>

      <div v-if="animationDone" class="w-full text-center mt-8 space-x-4">
        <button v-if="deliverCount < 9 && playable" class="px-4 py-2 bg-slate-400" @click="deliver">繼續捕獲</button>
        <NuxtLink v-if="deliverCount > 0" class="px-4 py-2 bg-slate-400 mr-2" to="/">結束</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import useCardPlate from '../composables/useCardPlate'
import { cardColor } from '../composables/cardsBag'

// 導航守衛
definePageMeta({
  middleware: defineNuxtRouteMiddleware((to, from) => {
    const runtimeConfig = useRuntimeConfig()
    const { baseURL } = runtimeConfig.public
    console.log('deploy test log')
    if (from.href != baseURL) {
      console.log(from.href)
      console.log(baseURL)
      // return navigateTo('/')
    }
  })
})

const { lockCard, removeCard, playable } = useCardPlate();

const targetCard = ref([]);
const takedCard = ref(null);
const deliverCount = ref(0);

const grassRef = ref(null)
const animationDone = computed(() => {
  return grassRef.value ? !grassRef.value.showAnimation : false
})

// 出卡
const deliver = () => {
  takedCard.value = targetCard.value.shift()

  removeCard(takedCard.value.cardId)
  deliverCount.value++
}

onMounted(() => {
  // 一次拿取9張待取
  targetCard.value = lockCard(9)
  
  deliver()
})
</script>
