<template>
  <v-app>
    <v-content class="mx-4 mb-4">
      <v-btn type="button" @click="logout()" v-if="isLogged">
        Logout
      </v-btn>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
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
