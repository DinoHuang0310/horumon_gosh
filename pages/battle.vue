<template>
  <div class="relative">
    <div class="relative flex justify-center items-center h-[60vh]">
      <div
        v-for="list in enemy"
        :key="list.cardId"
        class="w-1/5 mx-4 animate__animated animate__flipInY"
        :class="[hiddenId.some(i => i === list.cardId) && 'invisible']"
      >
        <div class="relative">
          <MonsterCard
            class="animate__animated"
            :animation="setCatchAnimation(capturableId.some(i => i.id === list.cardId))"
            :card="list"
            @animationDone="catchAnimationDoneCount++"
          >
            <button
              v-if="capturableId.some(i => i.id === list.cardId) && catchAnimationDoneCount === 2"
              class="relative px-4 py-2 bg-slate-400"
              @click="deliver(list)"
            >
              <span>取得</span>
              <span
                v-if="hasChangeChance(list.cardId)"
                class="absolute right-0 -top-2 bg-red-500 text-white text-sm rounded whitespace-nowrap px-2 py-1 translate-x-2/3 rotate-[20deg]"
              >
                交換機會
              </span>
            </button>
          </MonsterCard>
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <BallThrowing
              v-if="useBall.animationStart"
              :color="useBall.setBallColor"
              @animationDone="useBall.animationDone = true"
            />
          </div>
        </div>
      </div>

      <button
        v-if="catchAnimationDoneCount === 2"
        class="absolute bottom-2 left-1/2 -translate-x-1/2 px-4 py-2 bg-slate-400"
        @click="captureDone"
      >不取得</button>
    </div>

    <ChangeChance
      v-if="showChangeChance"
      class="absolute w-full h-full top-0 left-0 z-10"
      :card="showChangeChance"
      @takeCard="handleChangeChanceDeliver"
    />

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
        @click="battleProgressBar < 100 ? battleProgressBar += 50 : battleProgressBar = 100"
      />
      <div class="bg-red-600 h-full duration-200" :style="{'width': `${battleProgressBar}%`}" />
    </div>

    <Transition>
      <div v-show="showAlert" class="absolute w-full text-center top-1/2 left-0 -translate-y-1/2 bg-red-600">
        <span class="inline-block text-white text-2xl sm:text-6xl italic py-8 animate__animated animate__flipInX">
          {{ showAlert }}
        </span>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import useCardPlate from '../composables/useCardPlate';
import {
  battleEnemyPR,
  battleDropPR,
  nextGamePR,
  ballTypePR,
  changeChancePR,
} from '../composables/probabilitySettings';

// 導航守衛
definePageMeta({
  middleware: defineNuxtRouteMiddleware((to, from) => {
    const runtimeConfig = useRuntimeConfig()
    const { baseURL } = runtimeConfig.public

    if (from.href !== `${baseURL}battlemode`) {
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
const hiddenId = ref([])

const battleProgressBar = ref(null)
const battleDone = ref(false)
const battleRound = ref(0)

const useBall = reactive({
  addition: 0, // 機率加權
  animationStart: false,
  animationDone: false,
  setBallColor: computed(() => {
    if (useBall.addition === ballTypePR.get('masterBall').bonus) {
      return 'purple'
    } else if (useBall.addition === ballTypePR.get('highBall').bonus) {
      return 'yellow'
    } else if (useBall.addition === ballTypePR.get('superBall').bonus) {
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
    maxChance: battleEnemyPR['5'],
    highChance: battleEnemyPR['4']
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
  useBall.animationStart = true

  enemy.value.forEach(i => {
    const random = Math.random()
    const totalPercentage = battleDropPR[i.cardLevel] + percentageBonus;
    
    // alert(`${i.cardName}> ${random < (totalPercentage > 1 ? 1 : totalPercentage) ? '捕捉成功' : '捕捉失敗'}`)
    console.log(
      `${i.cardLevel}星目標`,
      `${totalPercentage > 1 ? 100 : (totalPercentage * 100)}%`,
      random
    )
    if (random < (totalPercentage > 1 ? 1 : totalPercentage)) {
      capturableId.value.push({
        id: i.cardId,
        chance: Math.random()
      })
    }
  })
}

// 放棄捕獲
const captureDone = () => {
  battleDone.value = false
  useBall.addition = 0
  useBall.animationStart = false
  useBall.animationDone = false
  deliverCount.value = 0
  catchAnimationDoneCount.value = 0
  
  // 清空
  capturableId.value.length = 0
  hiddenId.value.length = 0
  
  if (battleRound.value < 2 && Math.random() < nextGamePR) {
    // 連續戰鬥
    console.log('連續對戰!')
    setEnemy()
  } else {
    navigateTo('/')
  }
}

const showChangeChance = ref(null)

const handleChangeChanceDeliver = ({ origin, target }) => {
  showChangeChance.value = null
  deliverCount.value++
  hiddenId.value.push(origin.cardId)
  removeCard(target.cardId)
}

// 出卡
const deliver = (target) => {
  if (hasChangeChance(target.cardId)) {
    showChangeChance.value = target
    return;
  } else {
    deliverCount.value++
    hiddenId.value.push(target.cardId)

    removeCard(target.cardId)
  }
}

const catchAnimationDoneCount = ref(0)

const hasChangeChance = (cardId) => {
  const target = capturableId.value.find(i => i.id === cardId)
  return target ? target.chance < changeChancePR : false
}

const setCatchAnimation = computed(() => {
  return (isSuccess) => {
    if (useBall.animationDone) {
      return isSuccess ? 'capture-success' : 'capture-failed'
    }
    return ''
  }
})

onMounted(setEnemy)
</script>
