<template>
  <div class="flex flex-wrap h-screen w-full justify-center items-center">
    <div class="w-full">
      <div class="flex justify-center w-full">
        <Grass
          v-for="list in targetCard"
          :key="list.cardId"
          class="w-1/5 mx-4"
          :class="[list.hide && 'invisible']"
          :card="list"
          @getCard="deliver"
        />
      </div>

      <div class="w-full text-center mt-16">
        <NuxtLink
          class="inline-block px-4 py-2 bg-slate-400"
          :class="[deliverCount === 0 && 'invisible']"
          to="/battle"
        >不繼續取得</NuxtLink>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import useCardPlate from '../composables/useCardPlate'
import useCostCalculate from '../composables/useCostCalculate'
import { cardColor } from '../composables/cardsBag'

// 導航守衛
definePageMeta({
  middleware: defineNuxtRouteMiddleware((to, from) => {
    const runtimeConfig = useRuntimeConfig()
    const { baseURL } = runtimeConfig.public

    if (from.path !== baseURL) {
      return navigateTo('/')
    }
  })
})

const { plus } = useCostCalculate();
const { lockCard, removeCard } = useCardPlate();

const targetCard = ref([]);

const deliverCount = ref(0);
watch(deliverCount, (count) => {
  if (count > 2) {
    navigateTo('/battle')
  }
})

// 出卡
const deliver = (id) => {
  // 不移除targetCard中的內容, 僅隱藏以保持版面不跳動
  // targetCard.value.splice(targetCard.value.findIndex(i => i.cardId === id), 1)
  const index = targetCard.value.findIndex(i => i.cardId === id)
  targetCard.value[index].hide = true

  deliverCount.value === 0 ? removeCard(id, true) : removeCard(id);
  deliverCount.value ++
}

onMounted(() => {
  plus()
  targetCard.value = lockCard(3, { maxChance: 0.03, highChance: 0.15 })
})
</script>
