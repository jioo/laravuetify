<template>
  <section>
    <app-header />
    <v-content>
        <v-slide-y-transition mode="out-in">
            <router-view />
        </v-slide-y-transition>
        <notifications />
    </v-content>
    <app-footer />
  </section>
</template>