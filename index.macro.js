// ast-pretty-print is really handy :)
const { createMacro } = require('babel-plugin-macros');
const prettier = require('prettier');

module.exports = createMacro(function inlineJSXMacro({ references, babel }) {
  references.default.forEach(referencePath => {
    if (referencePath.parentPath.type === 'JSXOpeningElement') {
      const children = referencePath.parentPath.parentPath.get('children');
      const body = children[1].getSource();
      let formattedBody = prettier.format(body, { parser: 'babel' });
      if (formattedBody.endsWith(";\n")) {
        formattedBody = formattedBody.substring(0, formattedBody.length - 2);
      }
      referencePath.parentPath.parentPath.replaceWith(
        babel.types.stringLiteral(formattedBody)
      );
    }
  });
});
