const { addBabelPlugin, override } = require('customize-cra');

module.exports = override(
  addBabelPlugin([
    'babel-pluginroot-import',
    {
      rootPathSuffix: 'src',
    },
  ])
);
