module.exports = {
  presets: [
    '@babel/preset-env', // Transforma código moderno ES6+ para ES5
    '@babel/preset-typescript', // Transforma TypeScript para JavaScript
  ],
  plugins: [
    '@babel/plugin-transform-modules-commonjs', // Garante compatibilidade com CommonJS
  ],
};
