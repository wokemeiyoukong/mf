import { defineStore } from 'pinia'
import { PERMISSION } from '../types/constant'

export default defineStore('permission', {
  state: () => {
    return {
      ROLE: 0
    }
  },

  actions: {
    setRoot() {
      // 或 有1则未1 0000 0001 -> 0001
      this.ROLE |= PERMISSION.ROOT
    },
    setRootAndSuper() {
      // 0000 -> 0001 0010 -> 0011
      this.ROLE = PERMISSION.ROOT | PERMISSION.SUPER | 0
    },
    toggleRoot() {
      // 异或 相异为1 相同为0 0000 -> 0001 = 0001  0001 0001 -> 0000 有则增 无则减
      this.ROLE ^= PERMISSION.ROOT
    },
    clearRoot() {
      this.ROLE = this.ROLE & ~PERMISSION.ROOT
    }
  },

  getters: {
    isRoot(): boolean {
      return !!(this.ROLE & PERMISSION.ROOT)
    },
    isRootAndSuper(state) {
      return !!(state.ROLE & PERMISSION.ROOT && state.ROLE & PERMISSION.SUPER)
    }
  }
})
