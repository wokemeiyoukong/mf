import { defineComponent, ref } from 'vue'
import { ElButton } from 'element-plus'

export default defineComponent({
  name: 'Home',
  setup() {
    const num = ref(0)
    function doAdd() {
      num.value++
    }
    return () => (
      <>
        <h2>Home Views</h2>
        <h3>num: {num.value}</h3>
        <ElButton type={'primary'} onClick={doAdd}>
          add
        </ElButton>
      </>
    )
  }
})
