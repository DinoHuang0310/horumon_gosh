import { ref, watch } from 'vue';
import useCardPool from './useCardPool';
import useCostCalculate from './useCostCalculate'
import { grassDropProbability } from './probabilitySettings'

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
  const lockCard = (
    length = 1,
    probability = {maxChance: grassDropProbability['5'], highChance: grassDropProbability['4']}
  ) => {
    // 卡片分級
    const maxLevel = cardPlate.value.filter(card => card.cardLevel === 5);
    const highLevel = cardPlate.value.filter(card => card.cardLevel === 4);
    const lowLevel = cardPlate.value.filter(card => card.cardLevel <= 3);

    const targetCards = [];
    const { maxChance, highChance } = probability
    console.log(maxChance, highChance)

    for(let i = 0; i < length; i++) {
      let options;
      const random = Math.random()
      console.log(random)
      
      if (maxLevel.length && random < maxChance) {
        console.log('take max')
        options = maxLevel

      } else if (highLevel.length && random < highChance) {
        options = highLevel

      } else if (lowLevel.length) {
        options = lowLevel

      } else if (highLevel.length) {
        console.log('empty take high')
        options = highLevel

      } else {
        console.log('empty take max')
        options = maxLevel

      }

      const index = Math.floor(Math.random() * options.length)
      targetCards.push(options.splice(index, 1)[0])

    }
    // console.log(targetCards)
    return targetCards
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