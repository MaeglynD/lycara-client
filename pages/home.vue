<template>
  <div class="l-map-container">
    <div class="l-users-container">
      <div
        v-for="user in users"
        :key="user.id"
        class="l-user"
      >
        <!--  -->
        {{ user.first_name }}
      </div>
    </div>
    <div
      id="map"
      class="l-map"
    >
      <!--  -->
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',

  components: {
    //
  },

  data: () => ({
    requestResult: '',
    accessToken: '',
    gps: {},
    users: [],
  }),

  created() {
    //
  },

  async mounted() {
    this.createMap();
    this.getAllUsers();
  },

  methods: {

    async getAllUsers() {
      this.$requestWrapper(async () => {
        this.users = await this.$axios.get('/users/all');
      }, (err) => {
        //
      });
    },

    async createMap() {
      // eslint-disable-next-line global-require
      const mapboxgl = require('mapbox-gl');
      mapboxgl.accessToken = this.accessToken;

      // init the map
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        center: [4.7835, 52.3491],
        zoom: 6,
        pitch: 0,
        minZoom: 2,
        maxZoom: 20,
        attributionControl: false,
      });

      await navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        this.map.panTo([longitude, latitude], { zoom: 15 });
      }, (err) => console.log(err));
    },
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/scss/home.scss';
</style>
