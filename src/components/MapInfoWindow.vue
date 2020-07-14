<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  data() {
    return {
      infoWindow: null
    };
  },
  mounted() {
    this.$parent.getMap(map => {
      (this.infoWindow = new window.google.maps.InfoWindow({
        position: { lat: this.lat, lng: this.lng },
        content: this.$el,
        disableAutoPan: true
      })),
        this.infoWindow.open(map);
    });
  },
  beforeDestroy() {
    this.infoWindow.close();
  }
};
</script>
