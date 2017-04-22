/**
 * Created by 方剑成 on 2017/4/22.
 */

const rollupMakeBundles = require('rollup-make-bundles');
const pkg = require('../package.json');

const moduleName = 'Weixiao';

const baseConfig = {
  entry: 'src/index.js',
  presetPlugins: true,
  eslint: true,
  banner: pkg,
  moduleName
};

rollupMakeBundles.easy(baseConfig, {
  dest: 'dist',
  name: pkg.name
});