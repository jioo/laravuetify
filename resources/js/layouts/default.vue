<template>
  <section>
    <app-toolbar />
    <app-drawer />
      <v-content>
        <div id="core-view">
          <v-fade-transition mode="out-in">
            <router-view />
          </v-fade-transition>
        </div>
      </v-content>
    <app-footer />
  </section>
</template>

<style>
#core-view {
  padding-bottom: 100px;
}
</style>