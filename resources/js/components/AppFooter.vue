<template>
  <v-footer>
    <v-layout>
      <v-flex xs12>
        <v-icon small class="white--text">code</v-icon>
        with
        <v-icon small class="red--text">favorite</v-icon>
        by <span class="link orange--text" @click.prevent="redirect()">Justine Joshua Quiazon</span>
        <v-icon small>copyright</v-icon>
        2018
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  methods: {
    redirect () {
      window.open('https://jioo.github.io/', '_blank')
    }
  }
}
</script>

<style scoped>
  .link {
    text-decoration: underline;
    cursor: pointer;
  }
</style>
