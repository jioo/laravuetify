<template>
  <div id="app">
      <v-app>
        <loading ref="loading" />
        <router-view />
        <notifications />
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

<style>
.vue-notification {
  padding: 10px;
  margin: 5px 5px 0 5px !important;
  font-size: 14px;
}
</style>
