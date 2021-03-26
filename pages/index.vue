<template>
  <div class="l-test">
    <div> requests</div>
    <v-btn
      v-for="request in [
        authenticate,
        getUserInfo,
        getRestrictedRequest,
        setProfilePicture,
        getAllUsers
      ]"
      :key="request.name"
      @click="request(), logResponse()"
    >
      {{ request.name }}
    </v-btn>

    <div> pages </div>

    <div class="l-test-pages">
      <v-btn
        v-for="page in ['home', 'login', 'register']"
        :key="page"
        @click="goToPage(page)"
      >
        {{ page }}
      </v-btn>
    </div>
    <div>
      {{ response }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    response: null,
    username: '',
    password: '',
  }),

  async mounted() {
    // We keep local dev credentials in a seperate untracked file.
    // If we're on the dev build we'll import them to speed up development
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line global-require
      const { username, password } = require('../private');

      this.username = username;
      this.password = password;
    }
  },

  methods: {

    goToPage(page) {
      this.$router.push({ path: `/${page}` });
    },

    // API call to authenticate the user
    async authenticate() {
      const { username, password } = this;

      this.$requestWrapper(async () => {
        // Make the request
        await this.$axios.post('/login', { username, password });

        // Set the data
        this.response = 'ok';
      }, (err) => {
        this.response = err;
      });
    },

    // API call to get the current logged in user's info
    async getUserInfo() {
      this.$requestWrapper(async () => {
        // Make the request
        const result = await this.$axios.get('/profile');

        // Set the data
        this.response = result.data;
      }, (err) => {
        // On error set the response
        this.response = err;
      },
      // Successfull snackbar message
      '🎉 Successfull request');
    },

    // Get a restricted request (a request only available to authenticated members)
    async getRestrictedRequest() {
      this.$requestWrapper(async () => {
        // Make the request
        this.response = await this.$axios.get('/restrictedRequest');
      }, (err) => {
        this.response = err;
      },
      'successfull restricted request');
    },

    // API call to set the profile picture
    async setProfilePicture() {
      this.$requestWrapper(async () => {
        // Make the request
        this.response = await this.$axios.put('/profile/picture', {
          url: 'https://static.hiphopdx.com/2015/03/Screen-Shot-2015-03-26-at-10.43.59-AM.png',
        });
      }, (err) => {
        this.response = err;
      },
      'profile picture set');
    },

    // API call to set all users
    async getAllUsers() {
      this.$requestWrapper(async () => {
        // Make the request
        this.response = await this.$axios.get('/users/all');
      }, (err) => {
        this.response = err;
      },
      'gotem');
    },

    // Its a mystery what this function does
    logResponse() {
      console.log(this.response);
    },

  },
};
</script>
<style>
.v-btn{
  margin: 10px;
}

.l-test{
  padding: 10px;
}
</style>
