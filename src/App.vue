<template>
  <v-app style="background-color: lightgray">
    <Navbar />
    <v-main>
      <v-snackbar
        v-model="isError"
        :timeout="4000"
        top
        color="error"
        elevation="24"
        vertical
      >
        <span>{{ info }}</span>
        <v-btn text color="white" @click="isError = false">Close</v-btn>
      </v-snackbar>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import { bus } from "./main";
export default {
  components: { Navbar },
  data() {
    return {
      isError: false,
      info: ""
    };
  },
  created() {
    bus.$on("errorCommunication", () => {
      this.info = "There was something wrong! Please try again later";
      this.isError = true;
    });
  }
};
</script>
