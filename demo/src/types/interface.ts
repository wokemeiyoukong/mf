interface ILists {
  // eslint-disable-next-line no-unused-vars
  callback: (val: number) => void
  payload: number
  type: 'primary' | 'danger' | 'text' | 'default' | 'success' | 'warning' | 'info'
  name: 'synchronization' | 'asynchronization'
}

interface IBookItem {
  name: string
  quantity: number
  price: number
}

export { ILists, IBookItem }
