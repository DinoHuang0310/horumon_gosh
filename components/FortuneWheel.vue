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
    let bonus = 0;
    let degree = 9;

    if (isSenior.value) {
      bonus = 1
    } else {
      const random = Math.random()

      for (const [key, value] of ballTypePR) {
        if (random < value.appear) {
          console.log(`${random}`, `got ${key}`)
          bonus = value.bonus;
          degree = value.degree;
          break; // 找到合適的球, 即停止遍歷
        }
      }
    }

    emit('animationDone', bonus)

    nextTick(() => {
      rotate.value = degree
    })
    
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
