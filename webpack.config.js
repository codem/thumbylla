const Path = require('path');
const webpack = require('webpack');
// Import the core config
const webpackConfig = require('@silverstripe/webpack-config');
const {
  resolveJS,
  externalJS,
  moduleJS,
  pluginJS,
  moduleCSS,
  pluginCSS,
} = webpackConfig;

const ENV = process.env.NODE_ENV;
const PATHS = {
  // the root path, where your webpack.config.js is located.
  ROOT: Path.resolve(),
  // your node_modules folder name, or full path
  MODULES: 'node_modules',
  // relative path from your css files to your other files, such as images and fonts
  FILES_PATH: '../',
  // thirdparty folder containing copies of packages which wouldn't be available on NPM
  THIRDPARTY: 'thirdparty',
  // the root path to your javascript source files
  SRC: Path.resolve('client/src'),
  DIST: Path.resolve('client/dist')
};

const config = [
  {
    name: 'js',
    entry: {
      main: `${PATHS.SRC}/boot/index.js`
    },
    output: {
      path: PATHS.DIST,
      filename: 'js/[name].js'
    },
    devtool: (ENV !== 'production') ? 'source-map' : '',
    resolve: Object.assign({}, resolveJS(ENV, PATHS), {extensions: ['.json', '.js', '.jsx']}),
    externals: externalJS(ENV, PATHS),
    module: moduleJS(ENV, PATHS),
    plugins: pluginJS(ENV, PATHS)
  }
];

module.exports = config;
