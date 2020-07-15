<template>
  <transition name="fade">
    <v-card
      style="z-index: 3; position: absolute"
      v-if="show"
      elevation="0"
      class="col-8 col-sm-7 col-md-6 col-lg-4 pa-0 pb-2 transparent buslineCard "
    >
      <v-container>
        <v-row no-gutters v-if="!isLogged">
          <v-btn
            rounded
            x-small
            v-for="busline in buslines"
            :key="busline.number"
            :class="[
              { activeButton: currentBuslineDisplaying === busline },
              'buslineButton ma-1 ma-sm-2'
            ]"
            @click="showPath(busline)"
            >{{ busline.number }}
          </v-btn>
        </v-row>
        <v-row no-gutters v-if="isLogged" class="pa-0 justify-center">
          <v-alert color="yellow" dense class="py-1 ma-0  col-12 text-center">
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
            :class="[
              { activeButton: currentBuslineDisplaying === busline },
              'buslineButton ma-1 ma-sm-2'
            ]"
            @click="showPath(busline)"
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
            :class="[
              { activeButton: currentBuslineDisplaying === busline },
              'buslineButton ma-1 ma-sm-2'
            ]"
            @click="showPath(busline)"
            >{{ busline.number }}
          </v-btn>
        </v-row>
      </v-container>
    </v-card>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BuslinesCard",
  props: {
    show: { required: false }
  },
  data() {
    return {
      currentBuslineDisplaying: null
    };
  },
  computed: {
    ...mapGetters([
      "buslines",
      "subscribedBuslines",
      "unsubscribedBuslines",
      "isLogged"
    ])
  },
  methods: {
    showPath(busline) {
      if (this.currentBuslineDisplaying === busline) {
        this.currentBuslineDisplaying = null;
        this.$emit("sendErase");
      } else if (busline.paths[0] !== undefined) {
        this.currentBuslineDisplaying = busline;
        this.$emit("sendPath", busline.paths[0].id);
        this.$emit("sendPathsForDisplayingLine", busline.paths);
      } else {
        console.log("The line has no path yet");
      }
    }
  }
};
</script>

<style lang="scss" src="../styles/buslinesCardStyle.scss"></style>
