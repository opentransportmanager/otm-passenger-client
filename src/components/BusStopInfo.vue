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
            </v-tab>

            <v-tabs-items v-model="lineNumbers">
              <v-tab-item v-for="busline in buslines" :key="busline.id">
                <v-container>
                  <v-layout class="row wrap">
                    <v-flex
                      class="xs4 sm3 md1 text-center"
                      v-for="departure in departures[busline.id]"
                      :key="departure.id"
                    >
                      <span class="subtitle-1 font-weight-bold">
                        {{ departure.departure_time }}
                      </span>
                      <br />
                      <span class="caption">
                        {{ busline.id }}
                        {{ departure.group_id }}
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
      departures: []
    };
  },
  mounted() {
    mapService.getBuslinesForStation(this.stationId).then(response => {
      this.buslines = response;
      this.getPathsForBusline(this.buslines[0].id);
    });
  },
  methods: {
    getPathsForBusline(buslineId) {
      if (this.departures[buslineId] === undefined) {
        mapService
          .getDeparturesForBusline(this.stationId, buslineId)
          .then(response => {
            this.departures[buslineId] = response;
            this.$forceUpdate();
          });
      }
    }
  }
};
</script>

<style scoped></style>
