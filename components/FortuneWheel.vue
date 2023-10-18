<template>
  <div class="relative pb-[100%]">
    <div
      class="absolute left-0 top-0 w-full h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
      :style="{'transform': `rotate(${rotate}deg)`}"
      @click="runAnimation = false"
    />
  </div>
</template>

<script setup>
import { ballProbability } from '../composables/probabilitySettings'

const emit = defineEmits(['animationDone'])

const runAnimation = ref(true)
const rotate = ref(0)

watch(runAnimation, (bool) => {
  if (!bool) {
    const { masterBall, highBall, superBall } = ballProbability

    const random = Math.random()
    let bonus = 0;
    if (random < masterBall.appear) {
      bonus = masterBall.bonus
    } else if (random < highBall.appear) {
      bonus = highBall.bonus
    } else if (random < superBall.appear) {
      bonus = superBall.bonus
    }

    emit('animationDone', bonus)
    
  } else {
    window.requestAnimationFrame(animation);
  }
})

const animation = () => {
  if (runAnimation.value) {
    rotate.value += 30
    window.requestAnimationFrame(animation);
  }
}

onMounted(() => {
  window.requestAnimationFrame(animation);
})

onBeforeMount(() => {

})
</script>
