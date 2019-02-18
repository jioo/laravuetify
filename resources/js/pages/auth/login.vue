<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout justify-center>
        <v-flex xs12 sm8 md4>
          <material-card
            color="primary"
            title="Login Form"
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

                <!-- Password -->
                <v-text-field
                  type="password"
                  label="Password"
                  prepend-icon="lock"
                  v-model="form.password"
                  data-vv-name="Password"
                  v-validate="'required'"
                  :error-messages="errors.collect('Password')"
                ></v-text-field>

                <!-- Remember me checkbox -->
                <v-checkbox
                  label="Remember me"
                  v-model="remember"
                  my-0
                ></v-checkbox>

                <v-layout column>

                  <!-- Login button -->
                  <v-flex mb-2>
                    <v-btn
                      block
                      type="button"
                      color="primary"
                      @click.prevent="submit()"
                      :loading="$wait.any"
                    >Login</v-btn>
                  </v-flex>

                  <v-divider></v-divider>

                  <!-- GitHub login button -->
                  <v-flex my-2>
                    <login-with-github :loading="$wait.any" />
                  </v-flex>

                  <!-- Facebook login button -->
                  <!-- <v-flex >
                    <v-btn
                      block
                      color="blue"
                      class="white--text"
                      :loading="$wait.any"
                    >
                      <v-icon left dark>fab fa-facebook</v-icon>
                      Login with Facebook
                    </v-btn>
                  </v-flex> -->

                </v-layout>

              </v-card-text>

            </form>

          </material-card>

          <p class="text-md-center">
            <router-link :to="'/register'">Register</router-link>
            <v-icon color="tertiary" size="17">mdi-circle-medium</v-icon>
            <router-link :to="'/forgot-password'">Forgot Password</router-link>
          </p>
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
    form: {
      email: '',
      password: '',
    },
    remember: false
  }),

  computed: {
    ...mapGetters(['alert'])
  },

  methods: {
    submit () {
      this.$store.dispatch('CLOSE_ALERT_MESSAGE')

      this.$validator.validateAll().then(() => {
        // Check if all fields are valid
        if (this.errors.items.length === 0) {
          this.login()
        }
      })
    },

    login () {
      // Start loading
      this.$wait.start()

      // Submit the form.
      this.$axios.post('/api/login', this.form).then(res => {
        const { data } = res

        // Save the token.
        this.$store.dispatch('SAVE_TOKEN', {
          token: data.token,
          remember: this.remember
        })

        this.fetchUserThenRedirect()

      }).catch(err => {
        this.$wait.end()
      })
    },

    fetchUserThenRedirect () {
      this.$store.dispatch('FETCH_USER').then(() => {
        // Redirect to dashboard
        this.$router.push('/dashboard')

        // End loading
        this.$wait.end()
      })
    },

  },
}
</script>
