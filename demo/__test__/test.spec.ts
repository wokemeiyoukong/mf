import { add, randomString } from '../src/utils'
describe('1 + 1', () => {
  it('1 + 1 = 2', () => {
    expect(add(1, 1)).toBe(2)
  })
})

describe('len = len', () => {
  it('len=len', () => {
    expect(randomString(6).length).toBe(6)
  })
})
