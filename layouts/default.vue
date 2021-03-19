<template>
  <!-- include <nuxt /> in order to view pages -->
  <v-app>
    <!-- The nuxt view -->
    <nuxt />

    <!-- Global snackbar -->
    <v-snackbar
      v-model="snackbar"
      transition="scroll-y-transition"
      :color="snackbarColor"
      top
      right
    >
      {{ snackbarText }}
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    snackbarText: '',
    snackbarColor: '',
    snackbar: false,
  }),

  created() {
    this.$nuxt.$on('openSnackbar', this.openSnackbar);
  },

  mounted() {
    //
  },

  methods: {

    // Opens the global snackbar with the given text and color
    openSnackbar(text, color = '#36393f') {
      console.log('hello');
      this.snackbar = true;
      this.snackbarText = text;
      this.snackbarColor = color;
    },
  },
};
</script>
