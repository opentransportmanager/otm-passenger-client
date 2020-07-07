<template>
  <v-container fill-height>
    <v-layout class="row wrap justify-center">
      <v-flex class="xs10">
        <v-card
          class="text-center light-green lighten-2 fill-height elevation-8"
        >
          <v-card-title class="justify-center light-green darken-1 mb-5">
            Your subscriptions
          </v-card-title>
          <v-card-text>
            <v-layout class="row wrap justify-center pa-4">
              <v-flex class="xs6 pr-4">
                <v-layout wrap justify-center>
                  <v-flex class="xs12">
                    <v-alert
                      border="left"
                      elevation="5"
                      color="blue-grey"
                      dark
                      dense
                      class="my-3 col-12 text-center"
                    >
                      <v-icon>mdi-star-off</v-icon>
                      <span class="hidden-xs-only">UnSubscribedLines</span>
                    </v-alert>
                  </v-flex>
                  <v-flex
                    class="xs12 sm4 md3 lg2 pa-1"
                    v-for="busline in unsubscribedBuslines"
                    :key="busline.id"
                  >
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          v-on="on"
                          class="thirdOrange pa-0 effect01"
                          x-large
                          block
                          elevation="8"
                          @click="subscribeBusline(busline)"
                        >
                          <span>{{ busline.number }}</span>
                          <v-icon right class="mr-0">
                            mdi-plus
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>Click to subscribe line</span>
                    </v-tooltip>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex class="xs6 pl-4">
                <v-flex class="xs12">
                  <v-alert
                    color="yellow"
                    elevation="5"
                    border="left"
                    class="my-3 col-12 text-center"
                  >
                    <v-icon color="black">mdi-star</v-icon>
                    <span class="hidden-xs-only">SubscribedLines</span>
                  </v-alert>
                </v-flex>
                <v-layout wrap justify-center>
                  <v-flex
                    class="xs12 sm4 md3 lg2 pa-1"
                    v-for="busline in subscribedBuslines"
                    :key="busline.id"
                  >
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          v-on="on"
                          class="thirdOrange pa-0 effect01"
                          x-large
                          block
                          elevation="8"
                          @click="unsubscribeBusline(busline)"
                        >
                          <span>{{ busline.number }}</span>
                          <v-icon right class="mr-0">
                            mdi-minus
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>Click to unsubscribe line</span>
                    </v-tooltip>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "UserPanel",
  data() {
    return {
      item: null
    };
  },
  computed: {
    ...mapGetters([
      "buslines",
      "subscribedBuslines",
      "isLogged",
      "unsubscribedBuslines"
    ])
  },
  methods: {
    subscribeBusline(busline) {
      this.$subscriptionService.subscribeBusline(busline.id);
    },
    unsubscribeBusline(busline) {
      this.$subscriptionService.unsubscribeBusline(busline.id);
    }
  }
};
</script>

<style lang="scss" scoped>
.effect01 {
  background-color: orange;
  overflow: hidden;
  position: relative;
  transition: all 0.2s ease-in-out;
}

.effect01:after {
  background: orange;

  content: "";
  height: 155px;
  left: -75px;
  opacity: 0.4;
  position: absolute;
  top: -50px;
  -webkit-transform: rotate(35deg);
  transform: rotate(35deg);
  width: 50px;
  transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
  z-index: 1;
}

.effect01:hover:after {
  background: orange;
  opacity: 0;
  left: 120%;
  -webkit-transform: rotate(40deg);
  transform: rotate(40deg);
}
</style>
