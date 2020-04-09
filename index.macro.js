'use strict';

const { createMacro } = require('babel-plugin-macros');
const prettier = require('prettier/standalone');

const createInlineJSXMacro = prettierOpts => ({ references, babel }) {
  references.default.forEach(referencePath => {
    if (referencePath.parentPath.type === 'JSXOpeningElement') {
      const children = referencePath.parentPath.parentPath.get('children');
      const body = children[1].getSource();
      let formattedBody = prettier.format(body, prettierOpts);
      if (formattedBody.endsWith(';\n')) {
        formattedBody = formattedBody.substring(0, formattedBody.length - 2);
      }
      referencePath.parentPath.parentPath.replaceWith(
        babel.types.stringLiteral(formattedBody)
      );
    }
  });
}

module.exports = prettierOpts => createMacro(createInlineJSXMacro(prettierOpts));
