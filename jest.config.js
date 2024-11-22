export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  testMatch: ['**/__tests__/**/*.test.ts']
};