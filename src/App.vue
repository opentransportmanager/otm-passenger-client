<template>
  <v-app>
    <Navbar />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Navbar from "@/components/Navbar";

export default {
  components: { Navbar },
  computed: {
    ...mapGetters(["isLogged"])
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>
