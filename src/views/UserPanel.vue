<template>
  <v-container fill-height>
    <v-layout class="row wrap justify-center">
      <v-flex class="xs6">
        <v-card class="text-center">
          <v-card-title class="justify-center">
            Hejka
          </v-card-title>
          <v-card-text>
            <v-layout class="row wrap justify-center">
              <v-flex class="xs6">
                <v-list rounded dense>
                  <v-list-item-group v-model="item" color="primary">
                    <v-subheader>Unsubscribed lines</v-subheader>
                    <v-list-item
                      @click="subscribeBusline(busline)"
                      v-for="busline in unSubscribedBuslines"
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
                <v-list rounded dense>
                  <v-subheader>Subscribed lines</v-subheader>
                  <v-list-item
                    v-for="busline in subscribedBuslines"
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
import _ from "lodash";
import { mapGetters } from "vuex";

export default {
  name: "UserPanel",
  data() {
    return {
      item: null
    };
  },
  computed: {
    ...mapGetters(["buslines", "subscribedBuslines"]),
    unSubscribedBuslines() {
      return _.difference(this.buslines, this.subscribedBuslines);
    }
  },
  methods: {
    subscribeBusline(busline) {
      this.$store.dispatch("subscribeBusline", busline.id);
    }
  }
};
</script>

<style scoped></style>
