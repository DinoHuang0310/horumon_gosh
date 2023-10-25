<template>
  <div ref="elRef" class="animate__animated" :class="setAnimationClass">
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  stay: {
    type: Number,
    default: 2000
  },
  modelValue: {
    type: Boolean,
    default: true
  },
})

const emit = defineEmits(['update:modelValue'])

const elRef = ref(null)
const animationDoneCount = ref(props.modelValue ? 0 : 2)

watch(() => props.modelValue, (val) => {
  if (val) {
    animationDoneCount.value = 0
  }
})

const setAnimationClass = computed(() => {
  if (animationDoneCount.value === 0) {
    return 'animate__fadeInRight'
  } else if (animationDoneCount.value === 1) {
    return 'animate__fadeOutRight'
  } else {
    return 'translate-x-full'
  }
})

const animationCallback = () => {
  if (animationDoneCount.value === 0) {
    setTimeout(() => {
      animationDoneCount.value++
    }, props.stay);
  } else {
    animationDoneCount.value++
    emit('update:modelValue', false)
  }
}

const removeCallbackWatcher = () => {
  elRef.value.removeEventListener('webkitAnimationEnd', animationCallback);
  elRef.value.removeEventListener('animationend', animationCallback);
  elRef.value.removeEventListener('oanimationend', animationCallback);
}

onMounted(() => {
  elRef.value.addEventListener('webkitAnimationEnd', animationCallback);
  elRef.value.addEventListener('animationend', animationCallback);
  elRef.value.addEventListener('oanimationend', animationCallback);
})

onBeforeUnmount(() => {
  removeCallbackWatcher()
})
</script>
