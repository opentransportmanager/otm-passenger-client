/* eslint-disable */
<template>
  <v-container fluid fill-height class="pa-0">
    <v-row class="fill-height" no-gutters>
      <v-card
        :class="[
          'col-1 pa-0 pb-2 elevation-7',
          { 'col-12 order-2': $vuetify.breakpoint.mdAndDown }
        ]"
      >
        <v-container>
          <v-row no-gutters>
            <v-btn
              rounded
              small
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

      <div class="col-12 col-lg-11 map">
        <bus-stop-info />
      </div>
    </v-row>
  </v-container>
</template>

<script>
import BusStopInfo from "../components/BusStopInfo";
// @ is an alias to /src
export default {
  name: "Home",
  components: { BusStopInfo },
  data() {
    return {
      selected: [],
      buslines: [
        { number: 1, check: false },
        { number: 2, check: false },
        { number: 3, check: false },
        { number: 4, check: false },
        { number: 5, check: false },
        { number: 6, check: false },
        { number: 7, check: false },
        { number: 8, check: false },
        { number: 9, check: false },
        { number: 20, check: false },
        { number: 24, check: false },
        { number: 55, check: false },
        { number: 34, check: false }
      ]
    };
  },
  methods: {}
};
</script>

<style>
.map {
  background-color: #cbf7bf;
  min-height: 80%;
}
</style>
