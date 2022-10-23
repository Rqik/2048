/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const { alias } = require('react-app-rewire-alias');

const aliasMap = {
  '@/components': 'src/components',
  '@/styles': 'src/styles',
  '@/layouts': 'src/layouts',
  '@/pages': 'src/pages',
  '@/hooks': 'src/shared/hooks',
  '@/utils': 'src/shared/utils',
  '@/assets': 'public/assets',
  '@/public': 'public',
};

module.exports = function override(config, _) {
  alias(aliasMap)(config);
  return config;
};
