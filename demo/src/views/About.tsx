import { storeToRefs } from 'pinia'
import { defineComponent, reactive } from 'vue'
import { useAppStore } from '../store'
import { ILists } from '../types'
import { ElButton } from 'element-plus'

export default defineComponent({
  name: 'About',
  setup() {
    const state = reactive<{ list: ILists[] }>({
      list: []
    })

    const store = useAppStore()

    // toRefs in tsx must use .value
    const { name, count, tripleCount, doubleCount } = storeToRefs(store)

    console.log(storeToRefs(store))

    // state.list.push({ name: 'reactive', age: 1 })
    // state.list.push({ name: 'ref', age: 2 })
    state.list.push({
      callback: store.setCount,
      payload: 10,
      type: 'primary',
      name: 'synchronization'
    })
    state.list.push({
      callback: store.setAsyncCount,
      payload: 20,
      type: 'success',
      name: 'asynchronization'
    })

    const { list } = state

    return () => (
      <>
        <h2>About Views</h2>
        <div>
          <p>
            pinia: {store.name} - {store.count}
          </p>
          <p>
            destruction: {name.value},{count.value},{tripleCount.value},{doubleCount.value}
          </p>
        </div>
        <div>
          {list.map(item => (
            <ElButton
              key={item.payload}
              type={item.type}
              onClick={() => item.callback(item.payload)}
            >
              {item.name}
            </ElButton>
          ))}
        </div>
        {/* <ul>
          {list.map(item => (
            <li key={item.name}>
              {item.name}-{item.age}
            </li>
          ))}
        </ul> */}
      </>
    )
  }
})
