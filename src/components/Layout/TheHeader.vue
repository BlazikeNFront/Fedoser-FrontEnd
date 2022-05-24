<template>
  <header
    class="mt-10 d-flex align-center justify-center"
    style="height: 10rem"
  >
    <v-container>
      <v-row>
        <v-spacer />
        <v-col cols="4">
          <h1 class="h-1" v-text="APP_NAME"></h1>
        </v-col>
        <v-col cols="4" xl="4" class="d-flex align-start justify-end">
          <language-switcher
            class="mr-4"
            app-theme
            :select-icon-width="20"
            :select-width="110"
          />
        </v-col>
      </v-row>
    </v-container>
  </header>
</template>
<script setup lang="ts">
import LanguageSwitcher from "@/components/common/LanguageSwitcher.vue";
import { APP_NAME } from "@/constants/global";
</script>
<style lang="scss" scoped>
header {
  h1 {
    text-align: center;
  }
}
</style>
