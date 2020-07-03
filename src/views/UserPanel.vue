<template>
  <v-container fill-height>
    <v-layout class="row wrap justify-center">
      <v-flex class="xs6">
        <v-card class="text-center primary">
          <v-card-title class="justify-center">
            Your subscriptions
          </v-card-title>
          <v-card-text>
            <v-layout class="row wrap justify-center">
              <v-flex class="xs6">
                <v-list rounded dense class="secondary">
                  <v-list-item-group v-model="item" color="primary">
                    <v-subheader>Unsubscribed lines</v-subheader>
                    <v-list-item
                      @click="subscribeBusline(busline)"
                      v-for="busline in unsubscribedBuslines"
                      :key="busline.id"
                    >
                      <v-list-item-content>
                        <span>{{ busline.number }}</span>
                      </v-list-item-content>
                      <v-list-item-icon
                        ><v-icon>
                          mdi-plus
                        </v-icon></v-list-item-icon
                      >
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-flex>
              <v-flex class="xs6">
                <v-list rounded dense class="thirdOrange">
                  <v-subheader>Subscribed lines</v-subheader>
                  <v-list-item
                    @click="unsubscribeBusline(busline)"
                    v-for="busline in subscribedBuslines"
                    :key="busline.id"
                  >
                    <v-list-item-content>
                      <span>{{ busline.number }}</span>
                    </v-list-item-content>
                    <v-list-item-icon
                      ><v-icon>
                        mdi-minus
                      </v-icon></v-list-item-icon
                    >
                  </v-list-item>
                </v-list>
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
      this.$authService.subscribeBusline(busline.id);
    },
    unsubscribeBusline(busline) {
      this.$authService.unsubscribeBusline(busline.id);
    }
  }
};
</script>

<style scoped></style>
