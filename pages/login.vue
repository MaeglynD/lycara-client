<template>
  <div class="l-login-container">
    <div class="l-modal-container">
      <div class="l-header">
        Welcome back
      </div>
      <div class="l-subheader">
        Lycara is one valid set of credentials away!
      </div>
      <v-form
        ref="loginForm"
        v-model="isLoginFormValid"
        lazy-validation
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

        <div class="l-text l-forgotten-password">
          Forgotten password?
        </div>

        <v-btn
          block
          color="#5b95f5"
          height="44"
          class="l-button"
          :loading="isLoading"
          :disabled="!isLoginFormValid"
          @click="login"
        >
          Login
        </v-btn>
      </v-form>

      <div class="l-text l-register">
        Don't have an account? Click here!
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
    async login() {
      // Validate the form
      await this.$refs.loginForm.validate();
      // No valid form, no entry
      if (!this.isLoginFormValid) return;

      // Set loading...
      this.pageState = 'loading';

      try {
        const { username, password } = this;

        // Make the request
        await this.$axios.post('/login', {
          username, password,
        });

        // Login succeeded, show in snackbar
        this.$nuxt.$emit(
          'openSnackbar',
          '🎉 Successfully logged in!',
          '#2b9263',
        );

        // Direct them to next page
        this.$router.push({ path: '/restricted-area' });
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
        this.login();
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/scss/login.scss';
</style>
