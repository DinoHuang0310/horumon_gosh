<template>
  <main class="overflow-hidden">
    <NuxtPage />

    <div class="fixed w-full right-0 bottom-0 flex justify-between items-end sm:items-center p-4">
      <div class="space-x-4">
        <button class="px-4 py-2 bg-slate-400" @click="handleAppendCardPool">補卡 ({{ cardPool.length }})</button>
        <button class="px-4 py-2 bg-red-700 text-white" @click="handleResetAll">全部重設</button>
      </div>
      <div class="space-x-4">
        <span class="block sm:inline-block">cost: ${{ cost }}</span>
        <button class="px-4 py-2 bg-slate-400" @click="handleResetCost">reset</button>
      </div>
    </div>
  </main>
</template>

<script setup>
import useCostCalculate from './composables/useCostCalculate'
import useCardPool from './composables/useCardPool'
import useCardPlate from './composables/useCardPlate'

const { init, cardPlate, resetCardPlate } = useCardPlate(); // 檢查用

const { cost, reset } = useCostCalculate();
const { cardPool, appendCardPool, resetCardPool } = useCardPool();

const handleResetCost = () => {
  if (confirm('你確定嗎?')) {
    reset()
  }
}

const handleAppendCardPool = () => {
  if (confirm('你確定嗎?')) {
    appendCardPool()
  }
}

const handleResetAll = () => {
  if (confirm('清空黑盤及重裝新卡匣, 你確定嗎?')) {
    resetCardPlate()
    resetCardPool()

    init()
  }
}
</script>