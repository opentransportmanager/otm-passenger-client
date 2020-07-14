/* eslint-disable */
<template>
  <v-container fluid fill-height class="pa-0">
    <v-row class="fill-height" no-gutters>
      <bus-stop-info
        v-if="dialog"
        @closeDialog="dialog = false"
        @changeBusStation="changeBusStopProps"
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
          @openEvent="openBusStop"
        ></map-marker>
        <user-location :lat="position.latitude" :lng="position.longitude">
        </user-location>
      </div>
    </v-row>
    <v-btn top right absolute @click="show = !show" style="z-index: 3" icon>
      <v-icon x-large color="dark">mdi-bus-marker</v-icon>
    </v-btn>
    <buslines-card :show="show" @sendPath="drawRoute" />
  </v-container>
</template>

<script>
import BusStopInfo from "../components/BusStopInfo";
import MapMarker from "../components/MapMarker";
import UserLocation from "../components/UserLocation";
import BuslinesCard from "../components/BuslinesCard";
import { mapGetters } from "vuex";

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
      position: { longitude: NaN, latitude: NaN },

      directionsService: new window.google.maps.DirectionsService(),
      directionsDisplay: new window.google.maps.DirectionsRenderer()
    };
  },
  computed: {
    ...mapGetters(["stations", "currentStation"])
  },
  watch: {
    currentStation() {
      this.openBusStop(this.currentStation.name, this.currentStation.id);
    }
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
    this.$mapService.getBuslines();
    navigator.geolocation.watchPosition(position => {
      this.position = position.coords;
    });
    this.directionsDisplay.setMap(this.map);
  },
  methods: {
    drawRoute(pathId) {
      if (pathId === "erase") {
        this.directionsDisplay.setDirections({ routes: [] });
      } else {
        this.$mapService.getPathToDraw(pathId).then(response => {
          this.$mapService.drawRoute(
            this.directionsService,
            this.directionsDisplay,
            response.startStation,
            response.endStation,
            response.waypoints
          );
        });
      }
    },
    changeBusStopProps(stationName, stationId) {
      this.stationName = stationName;
      this.stationId = stationId;
    },
    openBusStop(stationName, stationId) {
      this.changeBusStopProps(stationName, stationId);
      this.dialog = !this.dialog;
    },
    async getMap(callback) {
      await this.map;
      callback(this.map);
    }
  },
  created() {
    this.$mapService.getStations();
  }
};
</script>

<style lang="scss" src="../styles/homeStyle.scss"></style>
