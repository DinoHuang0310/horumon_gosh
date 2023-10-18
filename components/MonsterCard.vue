<template>
  <div class="py-24 text-center">
    <div v-if="card.cardLevel === 5">
      <span v-for="i in card.cardLevel" :key="i.index" :style="{color: cardColor[i - 1]}">★</span>
    </div>
    <div v-else>
      <span v-for="i in card.cardLevel" :key="i.index">★</span>
    </div>

    <div v-if="card.cardImage">
      <img class="mx-auto" :src="setImage" :alt="card.cardName">
    </div>
    <div>{{ card.cardName }}</div>
    <!-- <div>{{ card.cardId }}</div> -->
    <br>
    <slot />
  </div>
</template>

<script setup>
import { cardColor } from '../composables/cardsBag';

const isDev = process.env.NODE_ENV === 'development'
const publicPath = isDev ? '/' : '/horumon_gosh/'

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
})

const setImage = computed(() => (`${publicPath}horumon/${props.card.cardImage}`))

</script>