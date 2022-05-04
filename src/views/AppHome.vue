<template>
  <div class="d-flex align-center justify-center flex-column">
    <user-greetings-card />
    <v-container>
      <v-row>
        <v-col cols="12" lg="4" :order="lgAndUp ? 2 : 1">
          <today-actions />
        </v-col>
        <v-col cols="12" lg="8" :order="lgAndUp ? 1 : 2">
          <news-section
        /></v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup lang="ts">
import UserGreetingsCard from "@/components/modules/appHome/UserGreetingsCard.vue";
import NewsSection from "@/components/modules/appHome/NewsSection.vue";
import TodayActions from "@/components/modules/appHome/TodayActions.vue";
import { useDisplay } from "vuetify/lib/framework";
const { lgAndUp } = useDisplay();
</script>
