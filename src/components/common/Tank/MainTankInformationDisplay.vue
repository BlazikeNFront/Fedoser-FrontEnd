<template>
  <v-card flat color="transparent" tag="article">
    <v-sheet
      v-for="(item, key) of mainTankInformation"
      :key="key"
      class="shadow-bg f-15 text-white"
      v-bind="singleInformationAttrs"
    >
      <i18n-t
        :keypath="`mainTankInformationDisplay.${key}`"
        tag="p"
        scope="global"
        class="d-flex align-center justify-center font-weight-bold text-center"
      >
        <template #[key]>
          <p
            class="ml-2 text-center font-weight-normal"
            v-text="
              //if key === volume add m^3 sign
              key === Object.keys(mainTankInformation)[1]
                ? `${item} &#13221;`
                : item
            "
          ></p
        ></template>
      </i18n-t>
    </v-sheet>
  </v-card>
</template>

<script setup lang="ts">
import { MainTankInformation } from "@/types/Tank";
defineProps<{
  mainTankInformation: MainTankInformation;
  singleInformationAttrs?: {
    class: string;
  };
}>();
</script>
<style lang="scss"></style>
