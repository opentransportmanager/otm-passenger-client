<script>
export default {
  props: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  data() {
    return {
      marker: null
    };
  },
  computed: {
    latLng() {
      return { lat: this.lat, lng: this.lng };
    }
  },
  mounted() {
    this.$parent.getMap(async map => {
      this.marker = new window.google.maps.Marker({
        position: { lat: this.lat, lng: this.lng },
        map: map
      });
    });
  },
  watch: {
    latLng() {
      this.setPosition();
    }
  },
  methods: {
    setPosition() {
      this.marker.setPosition(this.latLng);
    }
  },
  beforeDestroy() {
    this.marker.setMap(null);
    window.google.maps.event.clearInstanceListeners(this.marker);
  },
  render() {
    return null;
  }
};
</script>
