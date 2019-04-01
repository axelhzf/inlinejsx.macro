// ast-pretty-print is really handy :)
const printAST = require('ast-pretty-print');
const { createMacro } = require('babel-plugin-macros');
const prettier = require('prettier');

module.exports = createMacro(function inlineJSXMacro({ references, babel }) {
  references.default.forEach(referencePath => {
    if (referencePath.parentPath.type === 'JSXOpeningElement') {
      const children = referencePath.parentPath.parentPath.get('children');
      const body = children[1].getSource();
      const formattedBody = prettier.format(body, { parser: 'babel' });
      referencePath.parentPath.parentPath.replaceWith(
        babel.types.stringLiteral(formattedBody)
      );
    }
  });
});
