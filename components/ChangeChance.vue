<template>
  <div class="flex justify-center items-center bg-white">
    <div v-show="animationDoneCount > 1" class="w-1/5 mx-4">
      <div v-if="changeTarget" class="relative">
        <MonsterCard :card="changeTarget">
          <button
            class="relative px-4 py-2 bg-slate-400"
            @click="$emit('takeCard', { origin: card, target: changeTarget })"
          >取得</button>
        </MonsterCard>
      </div>
    </div>
    
    <div v-show="animationDoneCount > 1" class="w-1/5 mx-4">
      <div class="relative">
        <MonsterCard :card="card">
          <button
            class="relative px-4 py-2 bg-slate-400"
            @click="$emit('takeCard', { origin: card, target: card })"
          >取得</button>
        </MonsterCard>
      </div>
    </div>

    <div v-show="animationDoneCount < 2" class="absolute top-0 right-0 flex items-center justify-end w-full h-full">
      <img
        ref="kvRef"
        class="w-80 animate__animated"
        :class="setAnimationClass"
        src="../assets/images/change-chance.png"
      />
    </div>
  </div>
</template>

<script setup>
import useCardPlate from '../composables/useCardPlate'
import { changeChanceDropProbability } from '../composables/probabilitySettings'

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['takeCard'])

const { lockCard } = useCardPlate();

const kvRef = ref(null)
const animationDoneCount = ref(0)
const changeTarget = ref(null)

// 重整頁面強制取卡
const forceDelivery = () => {
  emit('takeCard', { origin: props.card, target: props.card })
}

const removeForceDelivery = () => {
  window.removeEventListener('beforeunload', forceDelivery);
}

const setAnimationClass = computed(() => {
  if (animationDoneCount.value === 0) {
    return 'animate__fadeInRight'
  } else {
    return 'animate__fadeOutRight'
  }
})

const animationCallback = () => {
  if (animationDoneCount.value === 0) {
    setTimeout(() => {
      animationDoneCount.value++
    }, 2000);
  } else if (animationDoneCount.value === 1) {
    animationDoneCount.value++
  }
}

const removeCallbackWatcher = () => {
  kvRef.value.removeEventListener('webkitAnimationEnd', animationCallback);
  kvRef.value.removeEventListener('animationend', animationCallback);
  kvRef.value.removeEventListener('oanimationend', animationCallback);
}

onMounted(() => {
  const takeNewCard = () => {
    const newCard = lockCard(1, {
      maxChance: changeChanceDropProbability['5'],
      highChance: changeChanceDropProbability['4']
    })[0]

    // 防止換到同一張卡
    if (newCard.cardId === props.card.cardId) {
      takeNewCard()
    } else {
      changeTarget.value = newCard
    }
  }

  takeNewCard()

  kvRef.value.addEventListener('webkitAnimationEnd', animationCallback);
  kvRef.value.addEventListener('animationend', animationCallback);
  kvRef.value.addEventListener('oanimationend', animationCallback);

  window.addEventListener('beforeunload', forceDelivery)
})

onBeforeUnmount(() => {
  removeForceDelivery()
  removeCallbackWatcher()
})
</script>