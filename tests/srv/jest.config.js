module.exports = {
  displayName: 'server',
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  restoreMocks: true,
  transform: {},
  moduleNameMapper: {
    '@/(.*)': '<rootDir>../../$1',
  },
  coveragePathIgnorePatterns: ['node_modules', 'src/', 'tests'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
};