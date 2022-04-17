<template>
  <div class="d-flex align-center justify-center flex-column">
    <user-greetings-card />
    <v-container>
      <v-row>
        <v-col cols="8"> <news-section /></v-col>
        <v-col cols="4">
          <today-actions />
        </v-col>
      </v-row>
      -->
    </v-container>
  </div>
</template>
<script setup lang="ts">
import UserGreetingsCard from "@/components/modules/appHome/UserGreetingsCard.vue";
import NewsSection from "@/components/modules/appHome/NewsSection.vue";
import TodayActions from "@/components/modules/appHome/TodayActions.vue";
</script>
<style>
.spacer {
  width: 10px;
  height: 10px;
  background-color: blue;
}
</style>
