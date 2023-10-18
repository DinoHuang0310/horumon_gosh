<template>
  <div>
    <div v-if="showAnimation" class="relative">
      <img class="block animate__rubberBand2 animate__animated animate__infinite" :src="setGrassImg" />
      <div class="absolute top-0 left-1/2">
        <BallThrowing @animationDone="handleBallThrowingDone" />
      </div>
    </div>
    
    <div v-else>
      <MonsterCard :card="card" />
      <div v-if="showGetCardBtn" class="flex justify-center mt-4">
        <button class="px-4 py-2 bg-slate-400" @click="$emit('getCard', card.cardId)">取得</button>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true,
    }
  },

  setup(props) {
    const { path } = useRoute()
    const showGetCardBtn = computed(() => !path.includes('fastmode'))

    const setGrassImg = computed(() => {
      return new URL(`../assets/images/grass_${props.card.cardLevel > 2 ? 'big' : 'small'}.jpg`, import.meta.url).href
    })

    const showAnimation = ref(true)
    watch(() => props.card, () => {
      showAnimation.value = true;
    })

    const handleBallThrowingDone = () => {
      // 投完球後1秒關閉
      setTimeout(() => {
        showAnimation.value = false;
      }, 1000);
    }

    return {
      showGetCardBtn,
      showAnimation,
      setGrassImg,
      handleBallThrowingDone,
    }
  }
}
</script>