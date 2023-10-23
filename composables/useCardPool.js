import { ref, watch } from 'vue';
import { cardsBag } from './cardsBag';

const cardPool = ref(JSON.parse(localStorage.getItem('cardPool')) || cardsBag)

watch(() => cardPool.value, (newData) => {
  localStorage.setItem('cardPool', JSON.stringify(newData));
}, { deep: true })

export default () => {

  const getCard = () => {
    // 檢查剩餘卡片數量, 取出卡片並賦予id返回
    const item = cardPool.value.pop();
    return {
      ...item,
      cardId: Math.floor(Date.now() * Math.random())
    }
  }

  const appendCardPool = () => {
    cardPool.value.unshift(...cardsBag)
  }

  const resetCardPool = () => {
    cardPool.value.splice(0, cardPool.value.length, ...cardsBag)
  }

  return {
    cardPool,
    getCard,
    appendCardPool,
    resetCardPool,
  }

}