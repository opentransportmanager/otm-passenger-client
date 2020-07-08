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
            v-model="activeTab"
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

            <v-tabs-items v-model="activeTab">
              <v-tab-item v-for="busline in buslines" :key="busline.id">
                <v-container>
                  <v-layout class="row wrap">
                    <v-flex class="xs12 pa-8">
                      <v-flex class="xs12 sm4 offset-xs0 offset-sm4 ">
                        <v-expansion-panels hover popout>
                          <v-expansion-panel>
                            <v-expansion-panel-header
                              color="#ffd391"
                              class="text-center"
                              @click="getTimetable(busline.id)"
                              >Timetable</v-expansion-panel-header
                            >
                            <v-expansion-panel-content
                              v-cloak
                              color="#ffd699"
                              class=" xs12 text-center scrollable"
                            >
                              <v-btn
                                v-for="busStop in timetables[busline.id]"
                                :key="busStop.name"
                                min-width="100%"
                                max-width="100%"
                                text
                                @click="
                                  changeBusStation(
                                    busStop.name,
                                    busStop.id,
                                    busline.id
                                  )
                                "
                                :class="[
                                  {
                                    'font-weight-bold choosen white--text':
                                      busStop.name === stationName
                                  }
                                ]"
                              >
                                {{
                                  busStop.name.length > 25
                                    ? busStop.name.substring(0, 25) + "..."
                                    : busStop.name
                                }}
                              </v-btn>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </v-flex>
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

export default {
  components: {},
  name: "Map",
  props: {
    stationId: { required: true, type: Number },
    stationName: { required: true, type: String }
  },
  data() {
    return {
      busStopDialog: true,
      activeTab: null,
      buslines: null,
      departures: [],
      timetables: [],
      isLoading: false
    };
  },
  mounted() {
    this.$mapService.getBuslinesForStation(this.stationId).then(response => {
      this.buslines = response;
      this.getPathsForBusline(this.buslines[0].id);
    });
  },
  methods: {
    getPathsForBusline(buslineId) {
      if (this.departures[buslineId] === undefined) {
        this.$mapService
          .getDeparturesForBusline(this.stationId, buslineId)
          .then(response => {
            this.departures[buslineId] = response;
            this.$forceUpdate();
          });
      }
    },
    getTimetable(buslineId) {
      this.$mapService
        .getTimetableForStation(this.departures[buslineId][0].path_id)
        .then(response => {
          this.timetables[buslineId] = response.data;
          this.$forceUpdate();
        });
    },
    changeBusStation(busStationName, busStationId, buslineId) {
      this.busStopDialog = false;
      Object.assign(this.$data, this.$options.data());
      bus.$emit("openEvent", busStationName, busStationId);
      this.$mapService.getBuslinesForStation(busStationId).then(response => {
        this.buslines = response;
        for (let i = 0; i < this.buslines.length; i++) {
          if (this.buslines[i].id === buslineId) {
            this.activeTab = i;
            break;
          }
        }
        this.getPathsForBusline(
          this.buslines[this.activeTab === null ? 0 : this.activeTab].id
        );
      });
      this.$forceUpdate();
    }
  }
};
</script>

<style lang="scss" src="../styles/busStopInfoStyle.scss"></style>
