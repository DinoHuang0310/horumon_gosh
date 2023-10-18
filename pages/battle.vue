<template>
  <div class="relative">
    <div class="relative flex justify-center items-center h-[60vh]">
      <div
        v-for="list in enemy"
        :key="list.cardId"
        class="w-1/5 mx-4 animate__animated animate__flipInY"
        :class="[list.hide && 'invisible']"
      >
        <MonsterCard class="relative" :card="list">
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <BallThrowing
              v-if="useBall.animated"
              :color="useBall.setBallColor"
            />
          </div>
          <button
            v-if="capturableId.some(i => i === list.cardId)"
            class="px-4 py-2 bg-slate-400"
            @click="deliver(list)"
          >取得</button>
        </MonsterCard>
      </div>

      <button
        v-if="useBall.animated"
        class="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-slate-400"
        @click="captureDone"
      >不取得</button>
    </div>

    <div class="h-[40vh] overflow-hidden">
      <div class="w-1/2 mx-auto">
        <FortuneWheel v-if="battleDone" @animationDone="handleFortuneWheelDone" />
      </div>
    </div>

    <div
      v-if="battleProgressBar !== null && battleProgressBar !== 100"
      class="absolute left-1/2 bottom-1/4 w-9/12 h-4 -translate-x-1/2 border"
    >
      <Keyboard
        v-if="battleProgressBar !== 100"
        class="absolute -top-8 left-1/2 -translate-x-1/2 -translate-y-full"
        @click="battleProgressBar < 100 ? battleProgressBar += 10 : battleProgressBar = 100"
      />
      <div class="bg-red-600 h-full duration-200" :style="{'width': `${battleProgressBar}%`}" />
    </div>

    <Transition>
      <div v-show="showAlert" class="absolute w-full text-center top-1/2 left-0 -translate-y-1/2 bg-red-600">
        <span class="inline-block text-white text-6xl italic py-8 animate__animated animate__flipInX">
          {{ showAlert }}
        </span>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import useCardPlate from '../composables/useCardPlate';
import {
  battleEnemyProbability,
  battleDropProbability,
  nextGame
} from '../composables/probabilitySettings';

// 導航守衛
definePageMeta({
  middleware: defineNuxtRouteMiddleware((to, from) => {
    const runtimeConfig = useRuntimeConfig()
    const { baseURL } = runtimeConfig.public

    if (from.path !== `${baseURL}battlemode`) {
      return navigateTo('/')
    }
  })
})

const { lockCard, removeCard } = useCardPlate();

const showAlert = ref('')
watch(showAlert, (val) => {
  if (val !== '') {
    setTimeout(() => {
      showAlert.value = ''
    }, 2000);
  }
})

const enemy = ref([])
// 可獲取的id
const capturableId = ref([])
const deliverCount = ref(0)
watch(deliverCount, () => {
  if (battleDone.value && capturableId.value.length === deliverCount.value) {
    console.log('全拿了! 結束 || 沒抓到 結束')
    captureDone()
  }
})

const battleProgressBar = ref(null)
const battleDone = ref(false)
const battleRound = ref(0)

const useBall = reactive({
  addition: 0, // 機率加權
  animated: false,
  setBallColor: computed(() => {
    if (useBall.addition == 1) {
      return 'purple'
    } else if (useBall.addition == 0.1) {
      return 'yellow'
    } else if (useBall.addition == 0.05) {
      return 'blue'
    }
    return '#dc2626'
  })
})

watch(battleProgressBar, (val) => {
  if (val === 100) {
    document.removeEventListener('keyup', onKeyup);
    showAlert.value = 'Done !'
    setTimeout(() => {
      battleDone.value = true
    }, 1000);
  }
})

const setEnemy = () => {
  enemy.value = lockCard(2, {
    maxChance: battleEnemyProbability['5'],
    highChance: battleEnemyProbability['4']
  })
  battleRound.value ++;
  
  showAlert.value = `BATTLE ROUND ${battleRound.value < 2 ? '1' : '2'} !`
  
  setTimeout(() => {
    battleProgressBar.value = 0
    document.addEventListener('keyup', onKeyup);
  }, 2000);
}

const onKeyup = (e) => {
  const { code } = e;
  if (code === 'ArrowLeft' || code === 'ArrowRight') {
    battleProgressBar.value < 100 ? battleProgressBar.value += 10 : battleProgressBar.value = 100
  }
}

const handleFortuneWheelDone = (percentageBonus) => {
  useBall.addition = percentageBonus
  useBall.animated = true

  enemy.value.forEach(i => {
    const random = Math.random()
    const totalPercentage = battleDropProbability[i.cardLevel] + percentageBonus;
    
    // alert(`${i.cardName}> ${random < (totalPercentage > 1 ? 1 : totalPercentage) ? '捕捉成功' : '捕捉失敗'}`)
    console.log(
      `${i.cardLevel}星目標`,
      `${totalPercentage > 1 ? 100 : (totalPercentage * 100)}%`,
      random
    )
    if (random < (totalPercentage > 1 ? 1 : totalPercentage)) {
      // 等待動畫完成
      setTimeout(() => {
        capturableId.value.push(i.cardId)
      }, 2000);
      
    }
  })
}

// 放棄捕獲
const captureDone = () => {
  battleDone.value = false
  useBall.addition = 0
  useBall.animated = false
  deliverCount.value = 0
  
  // 清空
  capturableId.value.length = 0
  
  if (battleRound.value < 2 && Math.random() < nextGame) {
    // 連續戰鬥
    console.log('連續對戰!')
    setEnemy()
  } else {
    navigateTo('/')
  }
}

// 出卡
const deliver = (target) => {
  // 由此攔截交換機會
  deliverCount.value++
  target.hide = true

  removeCard(target.cardId)
}

onMounted(setEnemy)
</script>