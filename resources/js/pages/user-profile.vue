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
        <material-card color="green" title="Edit Profile">
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
                    :loading="$wait.any"
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
    ...mapGetters(['user', 'alert']),
  },

  methods: {
    async updateProfile () {
      try {
        // Start loading
        this.$wait.start()
        
        const { data } = await this.$axios.patch('/api/settings/profile', this.form)
        
        this.$store.dispatch('updateUser', { user: data })
        
      } catch (error) { } 
      finally {
        // End loading
        this.$wait.end() 
      }
    },

    submit () {
      this.$store.dispatch('CLOSE_ALERT_MESSAGE')

      this.$validator.validateAll().then(() => {
        // Check if all fields are valid
        if (this.errors.items.length === 0) {
          this.updateProfile()
        } 
      })
    }
  },

  mounted () {
    this.form = this.user
  }
}
</script>
