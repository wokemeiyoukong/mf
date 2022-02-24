import { defineComponent, ref } from 'vue'
import Bar from './Bar'
// import HelloWorld from './HelloWorld.vue'
import logo from 'assets/logo.png'
import { ElButton } from 'element-plus'
import { fetchInformation } from '../api'

export default defineComponent({
  name: 'Foo',
  setup() {
    const list = ref<{ name: string; age: number }[] | null>(null)
    async function isBar() {
      const res = await fetchInformation({ username: 'a', password: 'b' })
      const { data } = res
      list.value = data
    }
    return () => (
      <>
        <Bar />
        <ElButton type={'primary'} onClick={isBar}>
          BAR
        </ElButton>
        <ul>
          {list.value?.map(item => (
            <li key={item.name}>
              {item.name} --- {item.age}
            </li>
          ))}
        </ul>
        <img src={logo} alt="" srcset="" />
        {/* <HelloWorld /> */}
        <h2>Foo Component</h2>
      </>
    )
  }
})
