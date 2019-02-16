<template>
  <div>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>NEST E-SERVICES</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list dense>
        <v-subheader class="mt-3 grey--text text--darken-1">MAIN NAVIGATION</v-subheader>

        <v-list-tile exact :to="{ name: 'dashboard' }">
          <v-list-tile-content>
              <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () =>({
    drawer: false,
  }),
}
</script>