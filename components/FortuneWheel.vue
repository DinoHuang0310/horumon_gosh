<template>
  <div class="relative pb-[100%]">
    <img
      class="block absolute left-0 top-0 w-full"
      :style="{'transform': `rotate(${rotate}deg)`}"
      src="../assets/images/fortune_wheel.png"
      alt=""
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
    const random = Math.random()
    let bonus = 0;
    let degree = 9;

    for (const [key, value] of ballProbability) {
      if (random < value.appear) {
        console.log(`${random}`, `got ${key}`)
        bonus = value.bonus;
        degree = value.degree;
        break; // 找到合適的球, 即停止遍歷
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
  if (runAnimation.value) {
    rotate.value = rotate.value >= 360 ? 0 : rotate.value + 30;
    window.requestAnimationFrame(animation);
  }
}

onMounted(() => {
  window.requestAnimationFrame(animation);
})

onBeforeMount(() => {

})
</script>
