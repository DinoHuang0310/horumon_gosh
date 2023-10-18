import { ref, watch } from 'vue';

const cost = ref(JSON.parse(localStorage.getItem('cost')) || 0)

watch(() => cost.value, (totalCost) => {
  localStorage.setItem('cost', totalCost);
})

export default () => {

  const plus = () => {
    cost.value += 30
  }

  const reset = () => {
    cost.value = 0
  }

  return {
    cost,
    plus,
    reset,
  }

}