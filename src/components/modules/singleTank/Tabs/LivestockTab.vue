<template>
  <div class="my-4">
    <default-loader v-if="!tank" />
    <div
      v-else-if="!tank.livestockInformation.livestock.length"
      class="d-flex align-center justify-center"
    >
      <i18n-t
        keypath="tank.noLivestockIsSet"
        tag="p"
        scope="global"
        style="line-height: 4rem"
        class="f-15 text-center"
      >
        <template #button>
          <br />
          <v-btn
            @click="onEditLivestockButton"
            style="background-color: rgb(var(--v-theme-red))"
            class="f-15 mr-4"
            v-text="$t('global.clickHere')"
          />
        </template>
      </i18n-t>
    </div>
    <section v-else>
      <v-container>
        <v-row>
          <v-col cols="12" xl="6">
            <h4
              class="my-4 text-h4 text-center"
              v-text="$t('tank.currentLivestockState')"
            ></h4>
            <livestock-list
              :livestock-information="
                currentLivestockInformations || tank.livestockInformation
              "
              table-class="shadow-bg text-white tank__livestock-table"
            />
          </v-col>
          <v-col cols="12" xl="6">
            <h4
              class="my-4 text-h4 text-center"
              v-text="$t('tank.initialLivestockState')"
            ></h4>
            <livestock-list
              :livestock-information="tank.livestockInformation"
              table-class="shadow-bg text-white tank__livestock-table"
            />
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>
<script setup lang="ts">
import LivestockList from "@/components/common/Livestock/LivestockList.vue";
import { storeToRefs } from "pinia";
import { useTankStore } from "@/stores/TankStore";
const { tank, currentLivestockInformations } = storeToRefs(useTankStore());

function onEditLivestockButton() {
  console.log("editLivestockRequest");
}
</script>
<style lang="scss">
.tank__livestock-table {
  tr:hover {
    background-color: rgba(var(--v-theme-yellow), 0.3) !important;
  }
}
</style>
