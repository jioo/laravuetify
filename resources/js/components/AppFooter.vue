<template>
  <v-footer
    id="core-footer"
    absolute
    height="82"
  >
    <span class="font-weight-light copyright">
      <v-icon color="tertiary" size="20">mdi-code-tags</v-icon>
      with
      <v-icon color="tertiary" size="17">mdi-heart</v-icon>
      by
      <a href="https://jioo.github.io" target="_blank">Justine Joshua Quiazon</a>
      &copy;
      {{ (new Date()).getFullYear() }}
    </span>
    <v-spacer/>
    <span class="font-weight-light copyright">
      Design from 
      <a href="https://www.creative-tim.com/" target="_blank">Creative Tim</a>
    </span>
  </v-footer>
</template>
