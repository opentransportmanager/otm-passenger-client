/* eslint-disable */
<template>
  <v-container fluid fill-height class="pa-0">
    <v-row class="fill-height" no-gutters>
      <bus-stop-info
        v-if="dialog"
        @closeDialog="dialog = false"
        :station-name="stationName"
        :station-id="stationId"
      />
      <v-card
        style="z-index: 3; position: absolute"
        v-if="show"
        :class="[
          'col-2 pa-0 pb-2 elevation-7',
          { 'col-8 order-2': $vuetify.breakpoint.mdAndDown }
        ]"
      >
        <v-container>
          <v-row no-gutters>
            <v-btn
              rounded
              x-small
              v-for="busline in buslines"
              :key="busline.number"
              @click="busline.check = !busline.check"
              :color="busline.check ? '#FF9F1C' : '#FFBF69'"
              :class="['ma-1 ma-sm-2', { 'white--text': busline.check }]"
              >{{ busline.number }}
            </v-btn>
          </v-row>
        </v-container>
      </v-card>

      <div class="col-12 map" ref="map">
        <map-marker
          v-for="station in stations"
          :key="station.id"
          :lat="station.position.lat"
          :lng="station.position.lng"
          :station-id="station.id"
          :name-of-station="station.name"
        ></map-marker>
        <user-location
          v-if="position.longitude != NaN"
          :lat="position.latitude"
          :lng="position.longitude"
        >
        </user-location>
      </div>
    </v-row>
    <v-btn top right absolute @click="show = !show" style="z-index: 3" icon
      ><v-icon x-large color="dark">mdi-bus-marker</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import BusStopInfo from "../components/BusStopInfo";
import MapMarker from "../components/MapMarker";
import mapService from "../services/mapService";
import UserLocation from "../components/UserLocation";

import { bus } from "../main.js";

export default {
  name: "Home",
  components: { UserLocation, MapMarker, BusStopInfo },

  data() {
    return {
      selected: [],
      map: null,
      dialog: false,
      stations: [],
      stationName: null,
      stationId: null,
      buslines: null,
      show: false,

      position: { longitude: NaN, latitude: NaN }
    };
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
    mapService.getBuslines().then(response => {
      this.buslines = response.data;
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.getPositionSuccess,
        this.getPositionError
      );
    }
  },

  methods: {
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
      if (this.dialog === true) this.dialog = !this.dialog;
      this.stationName = stationName;
      this.stationId = stationId;
      this.dialog = !this.dialog;
    });
    mapService.getStations().then(response => {
      this.stations = response.data;
    });
  }
};
</script>

<style lang="scss" src="../styles/homeStyle.scss"></style>
