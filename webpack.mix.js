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
    'axios',
    'vuex',
    'vue-meta',
    'js-cookie',
    'vue-router',
    'sweetalert2',
    'vuex-router-sync',
    'vuetify',
    'vee-validate',
    'chartist',
    'vue-chartist',
    'material-design-icons-iconfont',
    '@fortawesome/fontawesome-free',
    '@mdi/font',
    'roboto-fontface',
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