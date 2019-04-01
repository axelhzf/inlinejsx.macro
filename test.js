const path = require('path');
const pluginTester = require('babel-plugin-tester');
const Macros = require('babel-plugin-macros');

pluginTester({
  plugin: Macros,
  babelOptions: {
    babelrc: true
  },
  snapshot: false,
  fixtures: path.join(__dirname, '__fixtures__'),
})
