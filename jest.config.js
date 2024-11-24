export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  testMatch: ['**/__test__/**/*.test.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Permite resolver arquivos .js corretamente
  },
};