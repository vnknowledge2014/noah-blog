// eslint-disable-next-line @typescript-eslint/no-var-requires
const removeImports = require('next-remove-imports')();

module.exports = removeImports({
  sassOptions: {
    includePaths: [`${__dirname}/src/styles`],
  },
});
