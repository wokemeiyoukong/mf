import { mapActions, storeToRefs } from 'pinia'
import { defineComponent } from 'vue'
import usePermissionStore from '../store/partial'
import { ElButton } from 'element-plus'

export default defineComponent({
  name: 'Permission',
  setup() {
    const store = usePermissionStore()
    const { ROLE, isRoot, isRootAndSuper } = storeToRefs(store)
    console.log(store, 'store')

    // use mapActions cant find right this
    let { setRoot, setRootAndSuper, clearRoot, toggleRoot } = mapActions(usePermissionStore, [
      'setRoot',
      'clearRoot',
      'setRootAndSuper',
      'toggleRoot'
    ])

    setRoot = setRoot.bind(store)
    setRootAndSuper = setRootAndSuper.bind(store)
    clearRoot = clearRoot.bind(store)
    toggleRoot = toggleRoot.bind(store)

    console.log(setRoot, 'setRoot')

    return () => (
      <>
        <h2>Permission</h2>
        <h3>role: {ROLE.value}</h3>
        {isRoot ? <h3>root can see </h3> : null}
        {isRootAndSuper ? <h3>root&super can see </h3> : null}
        <ElButton type={'danger'} onClick={setRoot}>
          setRoot
        </ElButton>
        <ElButton type={'info'} onClick={setRootAndSuper}>
          setRootAndSuper
        </ElButton>
        <ElButton type={'warning'} onClick={clearRoot}>
          clearRoot
        </ElButton>
        <ElButton type={'success'} onClick={toggleRoot}>
          toggleRoot
        </ElButton>
      </>
    )
  }
})
