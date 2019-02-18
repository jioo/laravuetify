<template>
  <v-navigation-drawer
    id="app-drawer"
    app
    dark
    floating
    persistent
    v-model="drawerValue"
    mobile-break-point="991"
    width="260"
  >
    <v-layout
      class="fill-height"
      tag="v-list"
      column
    >
      <v-list-tile avatar>
        <v-list-tile-avatar
          color="white"
        >
          <v-img
            :src="'/img/vuetifylogo.png'"
            height="34"
            contain
          />
        </v-list-tile-avatar>
        <v-list-tile-title class="title">
          LaraVuetify
        </v-list-tile-title>
      </v-list-tile>
      <v-divider/>

      <template
        v-for="(link, i) in links"
      >
        <v-list-tile
          :key="i"
          :to="link.to"
          :active-class="'blue darken-2'"
          avatar
          class="v-list-item"
          v-show="(link.meta === undefined) ? true : link.meta "
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title
            v-text="link.text"
          />
        </v-list-tile>
      </template>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    logo: './img/vuetifylogo.png',
    links: [],
  }),

  computed: {
    ...mapGetters(['drawer', 'isAdmin']),

    drawerValue: {
      get () {
        return this.drawer
      },
      set (val) {
        this.$store.dispatch('UPDATE_DRAWER', val)
      }
    },
  },

  created () {
    this.links = [
      {
        to: '/dashboard',
        icon: 'mdi-view-dashboard',
        text: 'Dashboard',
      },
      {
        to: '/table-list',
        icon: 'mdi-clipboard-outline',
        text: 'Table List [Admin only]',
        meta: this.isAdmin,
      },
      {
        to: '/icons',
        icon: 'mdi-chart-bubble',
        text: 'Icons [Admin only]',
        meta: this.isAdmin,
      },
      {
        to: '/maps',
        icon: 'mdi-map-marker',
        text: 'Maps',
      },
      {
        to: '/notifications',
        icon: 'mdi-bell',
        text: 'Notifications',
      }
    ]
  }
}
</script>
