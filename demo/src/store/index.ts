import { defineStore } from 'pinia'
import usePermissionStore from './partial'
// mock async
function asyncSetCount(payload: number): Promise<number> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(payload + Math.random())
    }, 1000)
  })
}

// hole store
export const useAppStore = defineStore({
  id: 'app',
  // must be an arrow function
  state: () => {
    return {
      name: 'pinia name',
      count: 10,
      // partial store state
      role: usePermissionStore().ROLE
    }
  },
  actions: {
    // synchronization
    setCount(payload: number) {
      console.log(payload, 'setCount')
      this.count += payload
    },
    // asynchronization
    async setAsyncCount(payload: number) {
      this.count += await asyncSetCount(payload)
    }
  },
  getters: {
    // diff parameter using
    tripleCount(): number {
      return this.count * 3
    },
    doubleCount(state) {
      return state.count * 2
    }
  }
})
