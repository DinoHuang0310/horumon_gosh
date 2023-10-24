<template>
  <div class="py-4 sm:py-8 text-center">
    <div v-if="card.cardLevel === 5">
      <span v-for="i in card.cardLevel" :key="i.index" :style="{color: cardColor[i - 1]}">★</span>
    </div>
    <div v-else>
      <span v-for="i in card.cardLevel" :key="i.index">★</span>
    </div>

    <img
      class="mx-auto animate__animated"
      :class="animationClass"
      :src="setImage"
      :alt="card.cardName"
      ref="monsterRef"
    />

    <div>{{ card.cardName }}</div>
    <!-- <div>{{ card.cardId }}</div> -->
    <br>
    <slot />
  </div>
</template>

<script setup>
import { cardColor } from '../composables/cardsBag';

const isDev = process.env.NODE_ENV === 'development'
const publicPath = isDev ? '/' : '/horumon_gosh/'

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
  animation: {
    type: String,
    required: false,
  }
})
const emit = defineEmits(['animationDone'])

const monsterRef = ref(null)

const animationClass = ref([])

const animationCallback = () => {
  // 成功調用一次emit即移除監聽
  emit('animationDone')
  removeCallbackWatcher()
}

const removeCallbackWatcher = () => {
  monsterRef.value.removeEventListener('webkitAnimationEnd', animationCallback);
  monsterRef.value.removeEventListener('animationend', animationCallback);
  monsterRef.value.removeEventListener('oanimationend', animationCallback);
}

const addCallbackWatcher = () => {
  monsterRef.value.addEventListener('webkitAnimationEnd', animationCallback);
  monsterRef.value.addEventListener('animationend', animationCallback);
  monsterRef.value.addEventListener('oanimationend', animationCallback);
}

watch(() => props.animation, (type) => {
  if (type) {
    animationClass.value.push('animate__bounceOut')
    if (type === 'capture-failed') {
      setTimeout(() => {
        animationClass.value.splice(0, 1, 'animate__bounceIn')
        nextTick(addCallbackWatcher)
      }, (Math.floor(Math.random() * 3000) + 3000));
    } else {
      setTimeout(() => {
        emit('animationDone')
      }, 5000);
    }
  } else {
    animationClass.value.splice(0, animationClass.value.length)
  }
})

const setImage = computed(() => {
  return props.card.cardImage ?
    `${publicPath}horumon/${props.card.cardImage}` :
    new URL(`../assets/images/default_horumon.png`, import.meta.url).href
})

onBeforeUnmount(removeCallbackWatcher)
</script>