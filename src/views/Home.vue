/* eslint-disable */
<template>
  <v-container fluid fill-height class="pa-0">
    <v-row class="fill-height" no-gutters>
      <bus-stop-info
        v-if="dialog"
        @closeDialog="dialog = false"
        @changeBusStation="changeBusStation"
        :station-name="stationName"
        :station-id="stationId"
      />
      <div class="col-12 map" ref="map">
        <map-marker
          style="display: none"
          v-for="station in stations"
          :key="station.id"
          :lat="station.position.lat"
          :lng="station.position.lng"
          :station-id="station.id"
          :name-of-station="station.name"
        ></map-marker>
        <user-location
          v-if="position.longitude != NaN && position.latitude != NaN"
          :lat="position.latitude"
          :lng="position.longitude"
        >
        </user-location>
      </div>
    </v-row>
    <v-btn top right absolute @click="show = !show" style="z-index: 3" icon>
      <v-icon x-large color="dark">mdi-bus-marker</v-icon>
    </v-btn>
    <buslines-card :show="show" />
  </v-container>
</template>

<script>
import BusStopInfo from "../components/BusStopInfo";
import MapMarker from "../components/MapMarker";
import UserLocation from "../components/UserLocation";
import BuslinesCard from "../components/BuslinesCard";
import { mapGetters } from "vuex";

import { bus } from "../main.js";

export default {
  name: "Home",
  components: { BuslinesCard, UserLocation, MapMarker, BusStopInfo },

  data() {
    return {
      selected: [],
      map: null,
      dialog: false,
      stationName: null,
      stationId: null,
      show: false,
      markerCluster: null,

      position: { longitude: NaN, latitude: NaN }
    };
  },
  computed: {
    ...mapGetters(["stations"])
  },
  mounted() {
    this.map = new window.google.maps.Map(this.$refs["map"], {
      center: { lat: 51.202709, lng: 16.15371 },
      zoom: 14,
      disableDefaultUI: true,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }
      ]
    });
    this.$mapService.getBuslines().then(() => {});
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.getPositionSuccess,
        this.getPositionError
      );
    }
  },

  methods: {
    changeBusStation(stationName, stationId) {
      this.stationName = stationName;
      this.stationId = stationId;
    },
    getPositionSuccess(pos) {
      this.position = pos.coords;
    },
    getPositionError(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    },
    getMap(callback) {
      let vm = this;

      function checkForMap() {
        if (vm.map) callback(vm.map);
        else setTimeout(checkForMap, 200);
      }

      checkForMap();
    }
  },
  created() {
    bus.$on("openEvent", (stationName, stationId) => {
      this.stationName = stationName;
      this.stationId = stationId;
      this.dialog = !this.dialog;
    });
    this.$mapService.getStations();
  }
};
</script>

<style lang="scss" src="../styles/homeStyle.scss"></style>
