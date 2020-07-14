<script>
import image from "../img/busStopMini.png";

export default {
  props: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    stationId: { type: Number, required: true },
    nameOfStation: { type: String, required: true }
  },
  data() {
    return {
      marker: null
    };
  },
  mounted() {
    this.$parent.getMap(map => {
      this.marker = new window.google.maps.Marker({
        position: { lat: this.lat, lng: this.lng },
        map: map,
        icon: image
      });
      this.marker.addListener("click", () => {
        this.$store.dispatch("changeCurrentStation", {
          id: this.stationId,
          name: this.nameOfStation
        });
      });
    });
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
