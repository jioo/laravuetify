<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>NEST-E Services</v-toolbar-title>
            </v-toolbar>

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
                  <v-flex>
                    <v-btn 
                      block 
                      type="button" 
                      color="primary" 
                      @click.prevent="submit()"
                      :loading="$wait.any">Login</v-btn>
                  </v-flex>

                  <v-divider></v-divider>

                  <!-- Facebook login button -->
                  <v-flex mb-3>
                    <v-btn
                      block
                      color="blue"
                      class="white--text"
                    >
                      <v-icon left dark>fab fa-facebook</v-icon>
                      Login with Facebook
                    </v-btn>
                  </v-flex>

                  <!-- GitHub login button -->
                  <login-with-github :loading="$wait.any" />

                </v-layout>

              </v-card-text>

            </form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import LoginWithGithub from '~/components/LoginWithGithub'
import { mapGetters } from 'vuex'

export default {
	middleware: 'guest',

  components: {
    LoginWithGithub
  },

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
    async login () {
      try {
      // Start loading
      this.$wait.start('login');
      
      // Submit the form.
      const { data } = await this.$axios.post('/api/login', this.form)

      // Save the token.
      this.$store.dispatch('SAVE_TOKEN', {
        token: data.token,
        remember: this.remember
      })

      // Fetch the user.
      await this.$store.dispatch('FETCH_USER')

      // Redirect home.
      this.$router.push({ name: 'dashboard' })
        
      } 
      catch (error) { } 
      finally { 
        // End loading
        this.$wait.end('login') 
      }
    },

    submit () {
      this.$store.dispatch('CLOSE_ALERT_MESSAGE')

      this.$validator.validateAll().then(() => {
        // Check if all fields are valid
        if (this.errors.items.length === 0) {
          this.login()
        } 
      })
    },
  },


}
</script>