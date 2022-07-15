<template>
  <section>
    <component
      :is="headerTag"
      v-text="$t('notes.enviromantalData')"
      v-bind="headerAttrs"
    />
    <v-container
      ><v-row>
        <v-col cols="12" lg="6" v-if="enviromentalData.temperature"
          ><base-display
            :span-value="enviromentalData.temperature.toString()"
            template-name="temperature"
            keypath="notes.temperature"
        /></v-col>
        <v-col cols="12" lg="6" v-if="enviromentalData.ammonia">
          <base-display
            keypath="notes.ammonia"
            :span-value="enviromentalData.ammonia.toString()"
            template-name="ammonia"
          />
        </v-col>
        <v-col cols="12" lg="6" v-if="enviromentalData.ph"
          ><base-display
            :span-value="enviromentalData.ph.toString()"
            keypath="notes.ph"
            template-name="ph"
        /></v-col>
        <v-col cols="12" lg="6" v-if="enviromentalData.weather"
          ><base-display
            :span-value="enviromentalData.weather.toString()"
            keypath="notes.weather"
            template-name="weather"
        /></v-col> </v-row
    ></v-container>
  </section>
</template>
<script setup lang="ts">
import BaseDisplay from "./base/BaseDisplay.vue";
import { EnviromentalData } from "@/types/EnviromentalData";
import { Attrs } from "@/types/Attrs";
defineProps<{
  headerTag: string;
  headerAttrs: Attrs;
  enviromentalData: EnviromentalData;
}>();
</script>
