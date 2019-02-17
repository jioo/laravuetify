<template>
  <div id="app">
      <v-app>
        <loading ref="loading" />
        <router-view />
      </v-app>
  </div>
</template>

<script>
import Loading from './components/Loading'

export default {
  el: '#app',

  components: {
    Loading
  },

  metaInfo () {
    const { appName } = window.config

    return {
      title: appName,
    }
  },

  mounted () {
    this.$loading = this.$refs.loading
  },
}
</script>