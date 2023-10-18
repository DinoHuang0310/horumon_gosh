<template>
  <div class="relative w-10 h-10 left-1/2 top-1/2 -translate-x-1/2">
    <div class="absolute w-screen h-10 left-1/2 top-0 -translate-x-1/2 flex justify-center">
      <div class="perspective w-10 h-10 relative">
        <div
          v-if="animate"
          class="absolute w-10 h-10 rounded-full ball"
          :style="{'background-color': color}"
          ref="ballRef"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const ballRef = ref(null)

const animate = ref(false)

const props = defineProps({
  delay: {
    type: Number,
    default: 100
    // default: 2000
  },
  color: {
    type: String,
    default: '#dc2626'
  }
})
const emit = defineEmits(['animationDone'])

const animationCallback = () => {
  // 成功調用一次emit即移除監聽
  emit('animationDone')
  removeCallbackWatcher()
}

const removeCallbackWatcher = () => {
  ballRef.value.removeEventListener('webkitAnimationEnd', animationCallback);
  ballRef.value.removeEventListener('animationend', animationCallback);
  ballRef.value.removeEventListener('oanimationend', animationCallback);
}

onMounted(() => {
  setTimeout(() => {
    animate.value = true

    nextTick(() => {
      ballRef.value.addEventListener('webkitAnimationEnd', animationCallback);
      ballRef.value.addEventListener('animationend', animationCallback);
      ballRef.value.addEventListener('oanimationend', animationCallback);
    })

  }, props.delay);

})

onBeforeUnmount(removeCallbackWatcher)

</script>

<style scoped>
@keyframes throwZ {
  from {
    transform: translate3d(0px, 0px, 480px);
  }
  to {
    transform: translate3d(0px, 0px, 0px);
  }
}

@keyframes throwY {
  from {
    top: 0px
  }
  to {
    top: -5px
  }
}

.perspective {
  perspective: 500px;
  -webkit-perspective-origin-x: 45%;
  -webkit-perspective-origin-y: 50%;
  perspective-origin: 45% 50%;
}

.ball {
  animation:
    throwZ 1s cubic-bezier(0.000, 0.000, 0.580, 1.000),
    throwY 1s cubic-bezier(0, 20, 1, 20);
}
</style>