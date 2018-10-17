const path = require('path');
const cssVariables = require('../code/css/variables.json');
const mediaExtensions = require('../code/css/media.json');
const browsersList = require('../browserslist.js');
const mixinFile = path.join(__dirname, '../code/css/mixins.pcss');

module.exports = {
  plugins: {
    'postcss-mixins': {
      mixinsFiles: mixinFile,
    },
    'autoprefixer': {
      browsers: browsersList
    },
    'postcss-simple-vars': {
      variables: cssVariables,
      silent: true
    },
    'postcss-nested': {},
    'postcss-size': {},
    'postcss-pxtorem': {},
    'postcss-custom-selectors': {},
    'postcss-custom-media': {
      extensions: mediaExtensions
    }
  }
};
