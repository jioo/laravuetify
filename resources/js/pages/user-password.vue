<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap
    >
      <v-flex md12>

        <material-card color="primary" title="Change Password">
          <form>
            <v-container>
              <v-layout row wrap justify-center>
                
                <!-- Error messages -->
                <v-flex md8 xs12>
                  <v-alert
                    v-model="alert.show"
                    color="error"
                    v-html="alert.message"
                  >
                  </v-alert>
                </v-flex>

                <!-- Old Password -->
                <v-flex md8 xs12>
                  <v-text-field 
                    type="password"
                    label="Old Password" 
                    v-model="form.old_password"
                    v-validate="'required'"
                    data-vv-name="Old Password"
                    :error-messages="errors.collect('Old Password')"
                    mt-3
                  ></v-text-field>
                </v-flex> 

                <!-- New Password -->
                <v-flex md8 xs12>
                  <v-text-field 
                    type="password"
                    label="New Password" 
                    v-model="form.password"
                    v-validate="'required|min:6'"
                    data-vv-name="New Password"
                    :error-messages="errors.collect('New Password')"
                    mt-3
                  ></v-text-field>
                </v-flex> 

                <!-- Confirm Password -->
                <v-flex md8 xs12>
                  <v-text-field 
                    type="password"
                    label="Confirm Password" 
                    v-model="form.password_confirmation"
                    v-validate="'required'"
                    data-vv-name="Confirm Password"
                    :error-messages="errors.collect('Confirm Password')"
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
    form: {},
  }),

  computed: {
    ...mapGetters(['alert', 'isLoading']),
  },

  methods: {
    submit () {
      this.$store.dispatch('CLOSE_ALERT_MESSAGE')

      this.$validator.validateAll().then(() => {
        // Check if all fields are valid
        if (this.errors.items.length === 0) {
          this.changePassword()
        } 
      })
    },

    changePassword () {
      this.$axios.patch('/api/settings/password', this.form).then(() => {
        this.resetForm()
        this.$notify({ type: 'success', text: 'Your password has been successfully updated' })
      })
    },
    
    resetForm () {
      this.form = {
        old_password: '',
        password: '',
        password_confirmation: ''
      }
    },

  },

  created () {
    this.resetForm()
  },
}
</script>