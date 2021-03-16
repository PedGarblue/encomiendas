module.exports = {
  displayName: 'app',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
    VUE_APP_API_URL: 'http://localhost:3000',
    VUE_APP_BASE_URL: 'http://localhost:3001',
  },
  restoreMocks: true,
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '.*\\.(js)$': 'babel-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>../../$1',
  },
  coveragePathIgnorePatterns: ['node_modules', 'srv/', 'tests'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
};