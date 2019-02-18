<template>
  <v-toolbar
    id="core-toolbar"
    app 
    fixed
    flat
    style="background: #eee;"
  >
    <div class="v-toolbar-title">
      <v-toolbar-title
        class="tertiary--text font-weight-light"
      >
        <v-btn
          v-if="responsive"
          class="default v-btn--simple"
          dark
          icon
          @click.stop="toggleDrawer"
        >
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
      </v-toolbar-title>
    </div>

    <v-spacer />
    <v-toolbar-items>
      <v-flex
        align-center
        layout
        py-2
      >
        <span class="font-weight-light text-truncate" v-text="(user) ? user.name : ''">
        </span>
        <v-menu
          attach
          bottom
          left
          content-class="dropdown-menu"
          offset-y
          transition="slide-y-transition"
        >
          <v-btn 
            flat 
            icon 
            slot="activator" 
            class="toolbar-items"  
          >
            <v-icon color="grey darken-1">mdi-account</v-icon>
          </v-btn>
          <v-card dense min-width="150">
            <v-list>
              <v-list-tile :to="'/user-profile'">
                <v-list-tile-title class="text-md-center">Profile</v-list-tile-title>
              </v-list-tile>
              <v-list-tile :to="'/user-password'">
                <v-list-tile-title class="text-md-center">Password</v-list-tile-title>
              </v-list-tile>
              <v-divider></v-divider>
              <v-list-tile @click.prevent="logout()">
                <v-list-tile-title class="text-md-center">Logout</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-menu>
      </v-flex>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    notifications: [
      'Mike, John responded to your email',
      'You have 5 new tasks',
      'You\'re now a friend with Andrew',
      'Another Notification',
      'Another One'
    ],
    responsive: false,
  }),

  computed: {
    ...mapGetters(['user'])
  },

  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },

  methods: {
    toggleDrawer () {
      this.$store.dispatch('TOGGLE_DRAWER')
    },

    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    },

    async logout () {
      await this.$store.dispatch('LOGOUT')
      this.$router.push('/login')
    }
  }
}
</script>

<style>
  #core-toolbar a {
    text-decoration: none;
  }
</style>