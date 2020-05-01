process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  publicPath: './',
  'transpileDependencies': [
    'vuetify'
  ],
  devServer: {
    proxy: 'http://localhost:8080'
  },
};
