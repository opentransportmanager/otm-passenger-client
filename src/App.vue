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
import { mapGetters } from "vuex";

export default {
  components: { Navbar },
  data() {
    return {
      isError: false,
      info: ""
    };
  },
  computed: {
    ...mapGetters(["errorOccurred"])
  },
  watch: {
    errorOccurred() {
      this.info = "There was something wrong! Please try again later";
      this.isError = true;
    }
  },
  created() {
    const buslines = localStorage.getItem("buslines");
    if (buslines) {
      const buslinesData = JSON.parse(buslines);
      this.$store.commit("saveBuslines", buslinesData);
    }
    const userDetails = localStorage.getItem("user");
    const subscribedBuslines = localStorage.getItem("subscribedBuslines");
    const unsubscribedBuslines = localStorage.getItem("unsubscribedBuslines");
    if (userDetails) {
      const userData = JSON.parse(userDetails);
      const subscribesData = JSON.parse(subscribedBuslines);
      const unsubscribesData = JSON.parse(unsubscribedBuslines);
      this.$store.commit("setUserData", userData);
      this.$store.commit("saveSubscribes", subscribesData);
      this.$store.commit("saveUnsubscribes", unsubscribesData);
    }
  }
};
</script>
