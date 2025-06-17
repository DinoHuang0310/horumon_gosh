import { ref, watch } from 'vue';
import useCardPool from './useCardPool';
import useCostCalculate from './useCostCalculate'
import { defaultDropPR } from './probabilitySettings'

// 黑盤, 最多16張
const max = 16;
const cardPlate = ref(JSON.parse(localStorage.getItem('cardPlate')) || [])
watch(() => cardPlate.value, (newData) => {
  localStorage.setItem('cardPlate', JSON.stringify(newData));
}, { deep: true })

const { cardPool, getCard } = useCardPool();

const playable = ref(cardPool.value.length > 8);
watch(() => cardPool.value, (pool) => {
  playable.value = pool.length > 8
}, { deep: true })

const { plus } = useCostCalculate();

export default () => {

  // 檢查黑盤並補滿16張
  const init = () => {
    const minus = max - cardPlate.value.length;
    for (let i = 0; i < minus; i++) {
      cardPlate.value.push(getCard())
    }
  }

  // 鎖定選中的卡片
  const lockCard = (length = 1, weights = defaultDropPR) => {
    const result = [];
    const usedIds = new Set();
    while (result.length < length) {
      // 計算權重
      const pool = cardPlate.value.filter(i => !usedIds.has(i.cardId))
      const totalWeight = pool.reduce((a, b) => a + weights[b.cardLevel], 0);
      const rand = Math.random() * totalWeight;

      let cumulative = 0;
      for (let i = 0; i < pool.length; i++) {
        cumulative += weights[pool[i].cardLevel];
        const consoleStr = `${rand <= cumulative ? '%c' : ''}${pool[i].cardName}(${pool[i].cardLevel})(${pool[i].cardId}) 配率: ${(weights[pool[i].cardLevel] / totalWeight * 100).toFixed(2)}%`
        console.log(
          consoleStr,
          rand <= cumulative ? 'color: orange;' : ''
        )
        if (rand <= cumulative) {
          result.push(pool[i]);
          usedIds.add(pool[i].cardId);
          break;
        }
      }
      console.log('--------------------------')
    }
    console.log(result)
    return result;
  }

  // 從黑盤中移除卡片, 並從卡池中補卡
  const removeCard = (id, isFree = false, promptlyInit = true) => {
    const targetIndex = cardPlate.value.findIndex(i => i.cardId === id)
    cardPlate.value.splice(targetIndex, 1)
    
    if (!isFree) plus()
    if (promptlyInit) init()
  }

  const resetCardPlate = () => {
    cardPlate.value.splice(0, cardPlate.value.length)
  }
  
  return {
    cardPlate,
    playable,

    init,
    lockCard,
    removeCard,
    resetCardPlate,
  }

}