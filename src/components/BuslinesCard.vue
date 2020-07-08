<template>
  <transition name="fade">
    <v-card
      style="z-index: 3; position: absolute"
      v-if="show"
      elevation="0"
      class="col-8 col-sm-7 col-md-6 col-lg-4 pa-0 pb-2 transparent leftTop"
    >
      <v-container>
        <v-row no-gutters v-if="!isLogged">
          <v-btn
            rounded
            x-small
            v-for="busline in buslines"
            :key="busline.number"
            color="#FFBF69"
            class="ma-1 ma-sm-2"
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
            color="#FFBF69"
            class="ma-1 ma-sm-2"
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
            color="#FFBF69"
            class="ma-1 ma-sm-2"
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
  computed: {
    ...mapGetters([
      "buslines",
      "subscribedBuslines",
      "unsubscribedBuslines",
      "isLogged"
    ])
  }
};
</script>

<style lang="scss" src="../styles/homeStyle.scss"></style>
