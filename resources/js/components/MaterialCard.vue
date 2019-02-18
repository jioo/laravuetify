<template>
  <v-card
    v-bind="$attrs"
    :style="styles"
    v-on="$listeners"
  >
    <helper-offset
      v-if="hasOffset"
      :inline="inline"
      :full-width="fullWidth"
      :offset="offset"
    >
      <v-card
        v-if="!$slots.offset"
        :color="color"
        :class="`elevation-${elevation}`"
        class="v-card--material__header"
        dark
      >
        <v-layout row wrap pa-3>
          <v-icon
            v-show="!!historyPath"
            v-ripple
            color="tertiary"
            @click.prevent="redirect(historyPath)" >mdi-arrow-left</v-icon>
          <slot
            v-if="!title && !text"
            name="header"
          />
          <span v-else>
            <h4
              class="title font-weight-light mb-2"
              v-text="title"
            />
            <p
              class="category font-weight-thin"
              v-text="text"
            />
          </span>
        </v-layout>
      </v-card>
      <slot
        v-else
        name="offset"
      />
    </helper-offset>

    <v-card-text>
      <slot />
    </v-card-text>

    <v-divider
      v-if="$slots.actions"
      class="mx-3"
    />

    <v-card-actions v-if="$slots.actions">
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  inheritAttrs: false,

  props: {
    color: {
      type: String,
      default: 'secondary'
    },
    elevation: {
      type: [Number, String],
      default: 10
    },
    inline: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    offset: {
      type: [Number, String],
      default: 24
    },
    title: {
      type: String,
      default: undefined
    },
    text: {
      type: String,
      default: undefined
    },
    historyPath: {
      type: String,
      default: ''
    }
  },

  computed: {
    hasOffset () {
      return this.$slots.header ||
        this.$slots.offset ||
        this.title ||
        this.text
    },
    styles () {
      if (!this.hasOffset) return null

      return {
        marginBottom: `${this.offset}px`,
        marginTop: `${this.offset * 2}px`
      }
    }
  },

  methods: {
    redirect (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style scoped>
i.v-icon {
  margin-right: 12px;
  margin-bottom: 6px;
  border-radius: 40px;
}
</style>

