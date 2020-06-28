<template>
  <v-container>
    <v-row justify="center">
      <v-dialog
        v-model="busStopDialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="#FFBF69">
            <v-btn
              icon
              dark
              @click="(busStopDialog = false), $emit('closeDialog')"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Bus stop info</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-card-title class="justify-center">
            {{ stationName }}
          </v-card-title>
          <v-tabs
            centered
            center-active
            show-arrows
            v-model="lineNumbers"
            background-color="transparent"
            color="#FFBF69"
          >
            <v-tab
              style="min-width: 5vh; max-width: 8vh"
              v-for="busline in buslines"
              :key="busline.id"
              @click.native="getPathsForBusline(busline.id)"
            >
              {{ busline.busline_number }}
              {{ busline.id }}
            </v-tab>

            <v-tabs-items v-model="lineNumbers">
              <v-tab-item v-for="busline in buslines" :key="busline.id">
                <v-container>
                  <v-layout class="row wrap">
                    <v-flex
                      v-for="busStop in timetables[busline.id]"
                      :key="busStop.name"
                      class=" xs12 text-center"
                    >
                      <v-btn
                        @click="emitBus(busStop.name, busStop.id)"
                        :class="[
                          { 'font-weight-bold': busStop.name === stationName }
                        ]"
                      >
                        {{ busStop.name }}
                      </v-btn>
                    </v-flex>
                    <v-flex
                      class="xs4 sm3 md1 text-center"
                      v-for="departure in departures[busline.id]"
                      :key="departure.id"
                    >
                      <span class="pa-0 subtitle-1 font-weight-bold">
                        {{ departure.departure_time }}
                      </span>
                      <br />
                      <span class="pa-0" style="font-size: 60%">
                        {{ departure.group.name }}
                      </span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-tab-item>
            </v-tabs-items>
          </v-tabs>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { bus } from "../main.js";
import mapService from "../services/mapService";

export default {
  components: {},
  name: "Map",
  props: {
    stationId: { required: false },
    stationName: { required: false }
  },
  data() {
    return {
      busStopDialog: true,
      lineNumbers: null,
      buslines: null,
      departures: [],
      timetables: []
    };
  },
  mounted() {
    console.log("mounted");
    mapService.getBuslinesForStation(this.stationId).then(response => {
      this.buslines = response;
      this.getPathsForBusline(this.buslines[0].id);
    });
  },
  methods: {
    getPathsForBusline(buslineId) {
      console.log(this.stationName);
      if (this.departures[buslineId] === undefined) {
        mapService
          .getDeparturesForBusline(this.stationId, buslineId)
          .then(response => {
            mapService
              .getTimetableForStation(response[0].path_id)
              .then(response => {
                this.timetables[buslineId] = response.data;
              });
            this.departures[buslineId] = response;
            this.$forceUpdate();
          });
      }
    },
    emitBus(name, id) {
      this.busStopDialog = false;
      Object.assign(this.$data, this.$options.data());
      bus.$emit("openEvent", name, id);
      mapService.getBuslinesForStation(id).then(response => {
        this.buslines = response;
        this.getPathsForBusline(this.buslines[0].id);
      });
      this.$forceUpdate();
    }
  }
};
</script>

<style scoped></style>
