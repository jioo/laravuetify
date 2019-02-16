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
            :src="'//logo.clearbit.com/spotify.com'"
            height="34"
            contain
          />
        </v-list-tile-avatar>
        <v-list-tile-title class="title">
          Vuetify MD
        </v-list-tile-title>
      </v-list-tile>
      <v-divider/>
      <v-list-tile
        v-if="responsive"
      >
        <v-text-field
          class="purple-input search-input"
          label="Search..."
          color="purple"
        />
      </v-list-tile>
      <v-list-tile
        v-for="(link, i) in links"
        :key="i"
        :to="link.to"
        :active-class="'blue darken-2'"
        avatar
        class="v-list-item"
      >
        <v-list-tile-action>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-title
          v-text="link.text"
        />
      </v-list-tile>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    logo: './img/vuetifylogo.png',
    links: [
      {
        to: '/dashboard',
        icon: 'mdi-view-dashboard',
        text: 'Dashboard',
      },
      {
        to: '/profile',
        icon: 'mdi-view-dashboard',
        text: 'Profile',
      }
    ],
    responsive: false,
  }),

  computed: {
    ...mapGetters(['drawer']),

    drawerValue: {
      get () {
        return this.drawer
      },
      set (val) {
        this.$store.dispatch('UPDATE_DRAWER', val)
      }
    },
  },

  methods: {

    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    }
  },

  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },
  
}
</script>
