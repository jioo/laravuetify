<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout justify-center>
        <v-flex xs12 sm8 md4>
          <material-card
            color="primary"
            title="Register"
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
                  readonly
                ></v-text-field>

                <!-- Password -->
                <v-text-field
                  type="password"
                  label="Password"
                  prepend-icon="lock"
                  v-model="form.password"
                  data-vv-name="Password"
                  v-validate="'required|min:6'"
                  :error-messages="errors.collect('Password')"
                ></v-text-field>

                <!-- Confirm Password -->
                <v-text-field
                  type="password"
                  label="Confirm Password"
                  prepend-icon="lock"
                  v-model="form.password_confirmation"
                  data-vv-name="Confirm Password"
                  v-validate="'required'"
                  :error-messages="errors.collect('Confirm Password')"
                ></v-text-field>

                <!-- Submit button -->
                <v-btn
                  block
                  type="button"
                  color="success"
                  @click.prevent="submit()"
                  :loading="isLoading"
                >Reset Password</v-btn>

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
      this.$axios.post('/api/password/reset', this.form).then(res => {
        const { data } = res

        this.$notify({ type: 'success', text: data.status })
        this.$router.push('/login')
      })
    },

    resetForm () {
      this.form = {
        token: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    },

    getQueryParams () {
      this.form.email = this.$route.query.email
      this.form.token = this.$route.params.token
    },

  },

  created () {
    this.resetForm()
    this.getQueryParams()
  }
}
</script>
