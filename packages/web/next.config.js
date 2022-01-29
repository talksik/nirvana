const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  '@nirvana/common',
]);

module.exports = withPlugins([
  withTM
], { reactStrictMode: true });
