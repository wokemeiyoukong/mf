<script setup lang="ts">
import HelloWorld from 'components/HelloWorld.vue'
import logo from 'assets/logo.png'
import { ElButton } from 'element-plus'
import Foo from './components/Foo'
import Bar from './components/Bar'
import { fetchInformation, IInfoResponse } from './api/index'
import { ref } from 'vue'

console.log(import.meta.env)
const list = ref<IInfoResponse[] | null>(null)

async function isFetch() {
  const { data } = await fetchInformation({ username: '1', password: '2' })
  list.value = data
}
</script>

<template>
  <Foo />
  <Bar />
  <img :class="$style.logo" alt="Vue logo" :src="logo" />
  <ElButton type="primary" @click="isFetch">Click</ElButton>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <ul>
    <li v-for="item in list" :key="item.name">{{ item.name }}</li>
  </ul>
  Account: <input type="text" placeholder="please enter you account" />
</template>

<style scoped>
::placeholder {
  color: rgb(223, 103, 23);
}
</style>

<style module>
.logo {
  border: 1px solid tan;
}
</style>
