<template>
  <div>
    <v-btn @click="goToLogin">
      Go to login page
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),

  async mounted() {
    //
  },

  methods: {
    goToLogin() {
      this.$router.push({ path: '/login' });
    },
  },
};
</script>
