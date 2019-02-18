<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout justify-center>
        <v-flex xs12 sm8 md4>
          <material-card
            color="primary"
            title="Forgot Password"
          >

            <!-- Error messages -->
            <v-card-text v-if="alert.show">
              <v-alert
                :value="true"
                color="error"
                v-html="alert.message"
              >
              </v-alert>
            </v-card-text>

            <form>
              <v-card-text>
                <!-- Email -->
                <v-text-field 
                  type="text"
                  label="Email" 
                  prepend-icon="mail" 
                  v-model="form.email"
                  data-vv-name="Email"
                  v-validate="'required|email'"
                  :error-messages="errors.collect('Email')"
                  mt-3
                ></v-text-field>

                <!-- Login button -->
                <v-btn 
                  block 
                  type="button" 
                  color="primary" 
                  @click.prevent="submit()"
                  :loading="isLoading"
                >Reset</v-btn>

                <v-btn 
                  block   
                  color="default"
                  type="button" 
                  :loading="isLoading"
                  :to="'/login'"
                >Cancel</v-btn>

              </v-card-text>
            </form>

          </material-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	middleware: 'guest',

  data: () => ({
    form: {},
  }),

  computed: {
    ...mapGetters(['alert', 'isLoading'])
  },

  methods: {
    submit () {
      this.$store.dispatch('CLOSE_ALERT_MESSAGE')

      this.$validator.validateAll().then(() => {
        // Check if all fields are valid
        if (this.errors.items.length === 0) {
          this.postRequest()
        } 
      })
    },

    postRequest () {
      this.$axios.post('/api/password/email', this.form).then((res) => {
        const { data } = res

        this.resetForm()
        
        this.$notify({ type: 'success', text: data.status })
      })
    },

    resetForm () {
      this.form = {
        email: ''
      }
    },

    created () {
      this.resetForm()
    }
    
  },
}
</script>