const path = require('path')
const mix = require('laravel-mix')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

mix.config.vue.esModule = true

mix
  .js('resources/js/app.js', 'public/js')
  .sass('resources/sass/app.scss', 'public/css')

  .sourceMaps()
  .disableNotifications()

if (mix.inProduction()) {
  mix.version()

  mix.extract([
    'vue',
    'vform',
    'axios',
    'vuex',
    'jquery',
    'popper.js',
    'vue-i18n',
    'vue-meta',
    'js-cookie',
    'bootstrap',
    'vue-router',
    'sweetalert2',
    'vuex-router-sync',
    '@fortawesome/vue-fontawesome',
    '@fortawesome/fontawesome-svg-core'
  ])
}

mix.webpackConfig({
  plugins: [
    // new BundleAnalyzerPlugin()
  ],
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      '~': path.join(__dirname, './resources/js')
    }
  },
  output: {
    chunkFilename: 'js/[name].[chunkhash].js',
    publicPath: mix.config.hmr ? '//localhost:8080' : '/'
  }
})

Mix.listen('configReady', (webpackConfig) => {
    if (Mix.isUsing('hmr')) {
      // Remove leading '/' from entry keys
      webpackConfig.entry = Object.keys(webpackConfig.entry).reduce((entries, entry) => {
        entries[entry.replace(/^\//, '')] = webpackConfig.entry[entry];
        return entries;
      }, {});
  
      // Remove leading '/' from ExtractTextPlugin instances
      webpackConfig.plugins.forEach((plugin) => {
        if (plugin.constructor.name === 'ExtractTextPlugin') {
          plugin.filename = plugin.filename.replace(/^\//, '');
        }
      });
    }
  });
