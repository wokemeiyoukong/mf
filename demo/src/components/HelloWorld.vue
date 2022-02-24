<script setup lang="ts">
import { ref } from 'vue'
import style from './index.module.css'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1 :class="style.message">{{ msg }}</h1>

  <p>Recommended IDE setup:</p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    <a href="https://rollupjs.org/guide/en/#thisemitfile">Rollup</a>
  </p>
</template>

<style scoped lang="less">
@basic_color: rgb(241, 106, 16);
a {
  color: @basic_color;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

p {
  font-size: @font_size;
}
</style>
