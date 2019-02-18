<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap
    >
      <!-- Edit Profile -->
      <v-flex md12>
        <material-card color="primary" title="Edit Profile">
          <form>
            <v-container>
              <v-layout row wrap justify-center>

                <!-- Email -->
                <v-flex md8 xs12>
                  <v-text-field
                    label="Email"
                    v-model="form.email"
                    disabled/>
                </v-flex>

                <!-- Name -->
                <v-flex md8 xs12>
                  <v-text-field 
                    type="text"
                    label="Name" 
                    v-model="form.name"
                    data-vv-name="Name"
                    v-validate="'required'"
                    :error-messages="errors.collect('Name')"
                    mt-3
                  ></v-text-field>
                </v-flex>

                <!-- Submit button -->
                <v-flex md8 xs12>
                  <v-btn 
                    block
                    type="button" 
                    color="success" 
                    @click.prevent="submit()"
                    :loading="isLoading"
                  >Submit</v-btn>
                </v-flex>

              </v-layout>
            </v-container>
          </form>
        </material-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: 'auth',

  data: () => ({
    form: {
      email: '',
      name: '',
    }
  }),

  computed: {
    ...mapGetters(['user', 'alert', 'isLoading']),
  },

  methods: {
    submit () {
      this.$store.dispatch('CLOSE_ALERT_MESSAGE')

      this.$validator.validateAll().then(() => {
        // Check if all fields are valid
        if (this.errors.items.length === 0) {
          this.updateProfile()
        } 
      })
    },

    updateProfile () {
      this.$axios.patch('/api/settings/profile', this.form).then(res => {
        // Apply updated profile in store
        const { data } = res 
        this.$store.dispatch('UPDATE_USER', { user: data })

        this.$notify({ type: 'success', text: 'Your profile has been successfully updated' })
      })
    },
  },

  created () {
    this.form = Object.assign({}, this.user)
  }
}
</script>
