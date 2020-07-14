import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

import colors from "vuetify/lib/util/colors";
export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#FF9F1C",
        secondary: "#FFBF69",
        thirdOrange: "#ffd699",
        accent: "#CBF3F0",
        info: colors.blue.lighten1,
        warning: colors.amber.darken2,
        error: colors.red.accent4,
        success: colors.green.lighten1
      }
    }
  }
});
