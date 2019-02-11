<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>NEST-E Services</v-toolbar-title>
            </v-toolbar>
            <form>
              <v-card-text>
                
                <!-- Error messages -->
                <v-alert
                  v-model="alert.show"
                  color="error"
                  v-html="alert.message"
                >
                </v-alert>

                <!-- Email -->
                <v-text-field 
                  type="text"
                  label="Email" 
                  prepend-icon="mail" 
                  v-model="form.email"
                  data-vv-name="Email"
                  v-validate="'required|email'"
                  :error-messages="errors.collect('Email')"
                ></v-text-field>

                <!-- Password -->
                <v-text-field 
                  type="text"
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
import { EventBus } from '../event-bus'

export default {
	middleware: 'guest',

  components: {
    LoginWithGithub
  },

  data: () => ({
    form: {
      email: 'admin@gmail.com',
      password: '123456',
    },
    alert: {
      show: false,
      message: ''
    },
    remember: false
  }),

  methods: {
    async login () {
      try {
      this.$wait.start('login');
      
      // Submit the form.
      const { data } = await this.$axios.post('/api/login', this.form)

      // Save the token.
      this.$store.dispatch('saveToken', {
        token: data.token,
        remember: this.remember
      })

      // Fetch the user.
      await this.$store.dispatch('fetchUser')

      // Redirect home.
      this.$router.push({ name: 'home' })
        
      } catch (error) { } 
        finally { 
        this.$wait.end('login') 
      }
    },

    submit () {
      this.alert.show = false
      this.$wait.start('login');

      this.$validator.validateAll().then(() => {
        // Check if all fields are valid
        if (this.errors.items.length === 0) {
          this.login()
        } 
      })
    },
  },
  
  mounted () {
    EventBus.$on('bad-request', message => {
      console.log('emitted')
      this.alert = {
        show: true,
        message: message
      }
    })
  },
}
</script>