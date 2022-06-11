<template>
  <v-card
    color="grey-darken-4"
    class="py-3 px-2 d-flex flex-column align-center justify-center w-90"
  >
    <v-icon :icon="Icons.ALERT" color="yellow" :size="smAndUp ? '30' : '35'" />
    <p class="f-15 text-white">
      {{ $t("feedInformation.changeFeedSizeInfo") }}
    </p>
  </v-card>
</template>
<script setup lang="ts">
import { Icons } from "@/constants/icons/MdiIcons";
import { useDisplay } from "vuetify/lib/framework.mjs";
const { smAndUp } = useDisplay();
</script>
