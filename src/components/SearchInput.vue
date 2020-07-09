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
  watch: {
    inputStation() {
      if (this.inputStation) {
        this.$store.dispatch("changeCurrentStation", this.inputStation);
      }
    }
  }
};
</script>

<style scoped></style>
