<template>
  <div>
    {{ requestResult }}
  </div>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    requestResult: '',
  }),

  async mounted() {
    try {
      const result = await this.$axios.get('/restrictedRequest');

      this.requestResult = result;
    } catch (err) {
      this.requestResult = err;
    }
  },

  methods: {
  },
};
</script>
