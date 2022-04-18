<template>
  <v-card flat color="transparent" tag="article">
    <v-container
      ><v-row
        ><v-col cols="12" v-for="(item, key) of mainTankInformation" :key="key">
          <v-card
            class="shadow-bg py-3 px-2 f-15 d-flex flex-column align-center justify-center text-white"
          >
            <i18n-t
              :keypath="`mainTankInformationDisplay.${key}`"
              tag="p"
              scope="global"
              class="font-weight-bold text-center"
            >
              <template #[key]>
                <p
                  class="text-center font-weight-normal"
                  v-text="
                    //if key === volume add m^3 sign
                    key === Object.keys(mainTankInformation)[1]
                      ? `${item} &#13221;`
                      : item
                  "
                ></p
              ></template>
            </i18n-t>
          </v-card>
        </v-col> </v-row
    ></v-container>
  </v-card>
</template>
<script setup lang="ts">
import { MainTankInformation } from "@/types/MainTankInformation";

defineProps<{
  mainTankInformation: MainTankInformation;
}>();
</script>
<style lang="scss"></style>
