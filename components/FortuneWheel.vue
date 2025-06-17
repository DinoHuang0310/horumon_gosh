<template>
  <div class="relative pb-[100%]">
    <img
      class="block absolute left-0 top-0 w-full"
      :style="{'transform': `rotate(${rotate}deg)`}"
      :src="setSrc"
      alt=""
      @click="handleClick"
    />

    <div
      v-show="showSeniorAnimation"
      class="fixed top-0 right-0 flex items-center justify-end w-full h-full"
    >
      <SlideToggle v-model="showSeniorAnimation">
        <img class="w-80" src="../assets/images/senior.png" alt="">
      </SlideToggle>
    </div>

  </div>
</template>

<script setup>
import { ballTypePR, seniorPR } from '../composables/probabilitySettings'

const emit = defineEmits(['animationDone'])

const isSenior = ref(Math.random() < seniorPR)
const showSeniorWheel = ref(false)
const showSeniorAnimation = ref(false)
watch(showSeniorAnimation, (val) => {
  if (!val) {
    showSeniorWheel.value = true
    setTimeout(() => {
      isRotating.value = true
    }, 1000);
  }
})

const setSrc = computed(() => (
  new URL(`../assets/images/${showSeniorWheel.value ? 'senior' : 'fortune'}_wheel.png`,import.meta.url).href
))

const isRotating = ref(!isSenior.value)
const rotate = ref(0)

watch(isRotating, (bool) => {
  if (!bool) {
    const allBalls = Object.values(ballTypePR)
    const totalWeight = allBalls.reduce((a, b) => a + b.weights, 0);
    const rand = isSenior.value ? 0 : Math.random() * totalWeight; // 前輩訓練家, 必定投出大師
    
    let cumulative = 0;
    for (let i = 0; i < allBalls.length; i++) {
      cumulative += allBalls[i].weights;
      if (rand <= cumulative) {
        console.log(
          `%c投出: ${Object.keys(ballTypePR)[i]} %c配率: ${isSenior.value ? '(前輩)100' : (allBalls[i].weights / totalWeight * 100).toFixed(2)}%`,
          'color: black;',
          'color: orange;'
        )
        emit('animationDone', {
          bonus: allBalls[i].bonus,
          color: allBalls[i].color
        })
        nextTick(() => {
          rotate.value = allBalls[i].degree
        })
        break;
      }
    }
    
  } else {
    window.requestAnimationFrame(animation);
  }
})

const animation = () => {
  if (isRotating.value) {
    rotate.value = rotate.value >= 330 ? 0 : rotate.value + 30;
    window.requestAnimationFrame(animation);
  }
}

const handleClick = () => {
  if (isRotating.value) {
    isRotating.value = false
  }
}

onMounted(() => {
  if (isSenior.value) {
    showSeniorAnimation.value = true
  }
  
  window.requestAnimationFrame(animation);
})
</script>
