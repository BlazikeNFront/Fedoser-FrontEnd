/* eslint-disable */
// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";


// Vuetify
import { createVuetify } from "vuetify";

import colors from "vuetify/lib/util/colors";

export default createVuetify({
  theme: {
     options: { customProperties: true },
    themes: {
      light: {
        colors: {
          'app-background': '#f6f6fc',
          'main-text': colors.grey.darken4,
          'white-text':colors.grey.lighten5,
          blue: colors.blue.darken3,
          error: colors.red.darken1,
          yellow: colors.yellow.darken3,
          'light-yellow': colors.yellow.lighten3,
           violet:'#282263',
          'light-violet': colors.purple.lighten5,
          'semi-violet': colors.purple.lighten4,
          red: '#f25767',
          'dark-blue': '#024564',
         'grey':colors.grey.lighten1
    
    
        },
      },
      dark: {
        colors: {
          'app-background': '#f6f6fc',
          'main-text': colors.grey.lighten5,
           'white-text':colors.grey.lighten5,
          blue: colors.blue.lighten3,
          error: colors.red.darken1,
          yellow: colors.yellow.darken3,
          'light-yellow': colors.yellow.lighten3,
          violet:'#282263',
          'light-violet': colors.purple.lighten5,
          'semi-violet': colors.purple.lighten4,
          red: '#f25767',
          'dark-blue': '#024564',
      'grey':colors.grey.lighten1
       
        },
      },
    },
  },
});

