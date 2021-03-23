<template>
  <div class="l-login-container">
    <div class="l-modal-container">
      <div class="l-header">
        Register with Lycara
      </div>
      <div class="l-subheader">
        Due to high demand, it may take a while to authorise new accounts
      </div>
      <v-form
        ref="loginForm"
        v-model="isLoginFormValid"
      >
        <v-text-field
          v-model="username"
          height="44"
          dense
          label="Email or username"
          class="l-email"
          autocomplete="off"
          outlined
          :loading="isLoading"
          maxlength="255"
          required
          :rules="emailRules"
        />

        <v-text-field
          v-model="password"
          height="44"
          dense
          label="Password"
          outlined
          class="l-password"
          autocomplete="off"
          type="password"
          :loading="isLoading"
          required
          maxlength="255"
          :rules="passwordRules"
        />

        <v-text-field
          v-model="duplicatePassword"
          height="44"
          dense
          label="Password"
          outlined
          class="l-password"
          autocomplete="off"
          type="password"
          :loading="isLoading"
          required
          maxlength="255"
          :rules="[
            duplicatePassword === password || `Passwords don't match`
          ]"
        />

        <v-btn
          block
          color="#5b95f5"
          height="44"
          class="l-button"
          :loading="isLoading"
          :disabled="!isLoginFormValid"
          @click="register"
        >
          Login
        </v-btn>
      </v-form>

      <div class="l-text l-register">
        Already have an account? Log in!
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    username: '',
    password: '',
    duplicatePassword: '',
    pageState: '',
    isLoginFormValid: true,
    passwordRules: [
      (v) => !!v || 'Password is required',
    ],
    emailRules: [
      (v) => !!v || 'Email is required',
    ],
  }),

  computed: {

    // Check if the page is in a state of loading
    isLoading() {
      return this.pageState === 'loading';
    },

  },

  async mounted() {
    // Listens for the enter key (used for form submition)
    document.addEventListener('keyup', this.handleKeyup);
  },

  beforeDestroy() {
    // Removes the listening of the enter key
    document.removeEventListener('keyup', this.handleKeyup);
  },

  methods: {

    // API request to log the user in
    async register() {
      // Validate the form
      await this.$refs.loginForm.validate();
      // No valid form, no entry
      if (!this.isLoginFormValid) return;

      // Set loading...
      this.pageState = 'loading';

      try {
        const { username, password } = this;

        // Make the request
        await this.$axios.post('/register', {
          username, password,
        });

        // Login succeeded, show in snackbar
        this.$nuxt.$emit(
          'openSnackbar',
          '🎉 Successfully logged in!',
          '#2b9263',
        );

        // Direct them to next page
        this.$router.push({ path: '/' });
      } catch (err) {
        // Login failed, show in snackbar
        this.$nuxt.$emit(
          'openSnackbar',
          'We couldn\'t find your credentials',
          '#ff6161',
        );
      }

      this.pageState = '';
    },

    handleKeyup(e) {
      const key = e.key || e.keyCode;

      // Listen for enter key, submit if pressed.
      if (key === 'Enter' || key === 13) {
        this.register();
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/scss/login.scss';
@import '~/assets/scss/register.scss';
</style>
