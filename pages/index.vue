<template>
  <div class="l-test">
    <div> requests</div>
    <v-btn
      v-for="x in [
        getUserInfo,
        getRestrictedRequest,
        setProfilePicture,
        getAllUsers
      ]"
      :key="x.name"
      @click="x"
    >
      {{ x.name }}
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
  }),

  async mounted() {
    //
  },

  methods: {

    goToPage(page) {
      this.$router.push({ path: `/${page}` });
    },

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

    async getRestrictedRequest() {
      this.$requestWrapper(async () => {
        // Make the request
        this.response = await this.$axios.get('/restrictedRequest');
      }, (err) => {
        this.response = err;
      },
      'successfull restricted request');
    },

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

    async getAllUsers() {
      this.$requestWrapper(async () => {
        // Make the request
        this.response = await this.$axios.get('/users/all');
      }, (err) => {
        this.response = err;
      },
      'gotem');
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
