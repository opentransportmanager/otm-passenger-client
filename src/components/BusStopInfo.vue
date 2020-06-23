<template>
  <v-container>
    <v-row justify="center">
      <v-dialog
        v-model="busStopDialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn color="#FFBF69" dark v-on="on">
            <v-icon>mdi-bus-stop-covered</v-icon>
          </v-btn>
        </template>
        <v-card height="100%">
          <v-toolbar dark color="#FFBF69">
            <v-btn icon dark @click="busStopDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Bus stop info</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-card height="100%">
            <v-card-title class="justify-center">
              <strong>Timetable</strong>
            </v-card-title>
            <v-tabs
              v-model="lineNumbers"
              background-color="transparent"
              color="#FFBF69"
              grow
            >
              <v-tab v-for="line in lines" :key="line">
                {{ line }}
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="lineNumbers">
              <v-tab-item v-for="line in lines" :key="line">
                <v-card flat>
                  <v-card-text>{{ text }}</v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {},
  name: "Map",
  data() {
    return {
      busStopDialog: false,
      lineNumbers: null,
      lines: ["1", "2", "24", "12"],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  }
};
</script>

<style scoped></style>
