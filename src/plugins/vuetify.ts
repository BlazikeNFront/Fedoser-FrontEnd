/* eslint-disable */
// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";


// Vuetify
import { createVuetify } from "vuetify";

import colors from "vuetify/lib/util/colors";

export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          mainText: colors.grey.darken4,
          blue: colors.blue.darken3,
          error: colors.red.darken1
        },
      },
      dark: {
        colors: {
          mainText: colors.grey.lighten5,
          blue: colors.blue.lighten3,
          error: colors.red.darken1
        },
      },
    },
  },
});

