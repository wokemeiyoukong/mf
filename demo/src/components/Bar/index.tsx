import { defineComponent } from 'vue'
import style from './index.module.less'

export default defineComponent({
  name: 'Bar',
  setup() {
    return () => (
      <>
        <div class={style.logo}>span</div>
        <h2 class={style.bar}>Bar Component</h2>
      </>
    )
  }
})
