<template>
  <v-autocomplete
    class="mt-7 ml-2"
    clearable
    prepend-inner-icon="mdi-bus"
    dense
    solo
    rounded
    placeholder="Input station name"
    outlined
    hide-no-data
  >
  </v-autocomplete>
</template>

<script>
export default {
  name: "SearchInput"
};
</script>

<style scoped></style>
