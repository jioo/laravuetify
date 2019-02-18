<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout justify-center>
        <v-flex xs12 sm8 md4>
          <material-card
            color="primary"
            title="Register"
            historyPath="/login"
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
                <!-- Name -->
                <v-text-field
                  type="text"
                  label="Name"
                  prepend-icon="person"
                  v-model="form.name"
                  data-vv-name="Name"
                  v-validate="'required'"
                  :error-messages="errors.collect('Name')"
                  mt-3
                ></v-text-field>

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

                <v-btn
                  block
                  type="button"
                  color="success"
                  @click.prevent="submit()"
                  :loading="$wait.any"
                >Register</v-btn>

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
    form: {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    },
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
          this.register()
        }
      })
    },

    register () {
      // Start loading
      this.$wait.start()

      // Submit the form.
      this.$axios.post('/api/register', this.form).then(res => {
        const { data } = res

        this.loginUser(data)
        this.$wait.end()

      }).catch(err => {
        this.$wait.end()
      })
    },

    loginUser (registerResponse) {
      this.$axios.post('/api/login', this.form).then(res => {
        const { data: { token } } = res

        // Save the token.
        this.$store.dispatch('SAVE_TOKEN', { token })

        this.updateCurrentUser(registerResponse)
      })
    },

    updateCurrentUser (data) {
      this.$store.dispatch('UPDATE_USER', { user: data }).then(() => {
        this.$router.push('/dashboard')
      })
    }

  },
}
</script>
