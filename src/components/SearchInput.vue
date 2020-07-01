<template>
  <v-autocomplete
    v-model="inputStation"
    :items="this.stations"
    :search-input.sync="search"
    item-text="name"
    class="mt-7 ml-2"
    clearable
    prepend-inner-icon="mdi-bus"
    dense
    solo
    rounded
    placeholder="Input station name"
    outlined
    hide-no-data
    return-object
  >
  </v-autocomplete>
</template>

<script>
import { bus } from "../main.js";
import { mapGetters } from "vuex";
export default {
  name: "SearchInput",
  data() {
    return {
      inputStation: null,
      search: null
    };
  },
  computed: {
    ...mapGetters(["stations"])
  },
  mounted() {},
  watch: {
    inputStation() {
      if (this.inputStation) {
        bus.$emit("openEvent", this.inputStation.name, this.inputStation.id);
      }
    }
  }
};
</script>

<style scoped></style>
