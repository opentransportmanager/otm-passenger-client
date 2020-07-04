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
      <transition name="fade">
        <v-card
          style="z-index: 3; position: absolute"
          v-if="show"
          elevation="0"
          :class="[
            'col-3 pa-0 pb-2 transparent',
            { 'col-8 order-2': $vuetify.breakpoint.smAndDown }
          ]"
        >
          <v-container>
            <v-row no-gutters v-if="!isLogged">
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
            <v-row no-gutters v-if="isLogged" class="pa-0 justify-center">
              <v-alert
                color="yellow"
                dense
                class="py-1 ma-0  col-12 text-center"
              >
                <v-icon color="black">mdi-star</v-icon>
                SubscribedLines
              </v-alert>
            </v-row>
            <v-row no-gutters v-if="isLogged">
              <v-btn
                rounded
                x-small
                v-for="busline in subscribedBuslines"
                :key="busline.number"
                @click="busline.check = !busline.check"
                :color="busline.check ? '#FF9F1C' : '#ff9200'"
                :class="['ma-1 ma-sm-2', { 'white--text': busline.check }]"
                >{{ busline.number }}
              </v-btn>
            </v-row>
            <v-row no-gutters v-if="isLogged" class="mt-4 justify-center">
              <v-alert
                color="blue-grey"
                dark
                dense
                class="py-1 ma-0 col-12 text-center"
              >
                <v-icon>mdi-star-off</v-icon>
                UnSubscribedLines
              </v-alert>
            </v-row>
            <v-row no-gutters v-if="isLogged">
              <v-btn
                rounded
                x-small
                v-for="busline in unsubscribedBuslines"
                :key="busline.number"
                @click="busline.check = !busline.check"
                :color="busline.check ? '#FF9F1C' : '#FFBF69'"
                :class="['ma-1 ma-sm-2', { 'white--text': busline.check }]"
                >{{ busline.number }}
              </v-btn>
            </v-row>
          </v-container>
        </v-card>
      </transition>

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
import { mapGetters } from "vuex";

import { bus } from "../main.js";

export default {
  name: "Home",
  components: { UserLocation, MapMarker, BusStopInfo },

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
    ...mapGetters([
      "buslines",
      "stations",
      "subscribedBuslines",
      "unsubscribedBuslines",
      "isLogged"
    ])
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
    mapService.getBuslines().then(() => {});
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
    mapService.getStations();
  }
};
</script>

<style lang="scss" src="../styles/homeStyle.scss"></style>
