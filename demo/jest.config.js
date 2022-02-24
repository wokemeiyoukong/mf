module.exports = {
  globals: {
    'vue-jest': {
      babelConfig: false,
      tsConfig: {
        importHelpers: true
      }
    }
  },
  testMatch: [
    '**/?(*.)+(spec|test|unit).[jt]s?(x)' // 匹配测试文件
  ],
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node', 'vue'],
  transform: {
    '^.+.[j|t]sx?$': 'babel-jest',
    '^.+.vue?$': 'vue-jest',
    '^.+.tsx$': 'ts-jest'
  }
}
