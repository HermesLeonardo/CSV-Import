module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/dist'], // Define que os testes só serão executados na pasta dist
  testEnvironment: 'node', // Define o ambiente de teste como Node.js
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'], // Suporte a extensões comuns
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Resolve arquivos .js corretamente
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest', // Usa ts-jest para transpilar arquivos
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json', // Aponta para o caminho correto do tsconfig
      useESM: true, // Suporte a módulos ECMAScript
    },
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/'], // Ignora a pasta node_modules para testes
  testMatch: ['**/__test__/**/*.(spec|test).[jt]s?(x)'], // Identifica os arquivos de teste
};

