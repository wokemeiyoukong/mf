function add(a: number, b: number): number {
  return a + b
}

function randomString(len = 6): string {
  const sample = Math.random().toString(36)
  return sample.substring(sample.length - len, sample.length)
}

export { randomString, add }
