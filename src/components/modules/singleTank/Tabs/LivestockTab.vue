<template>
  <div class="my-4">
    <div
      v-if="!tank.livestockInformation.livestock.length"
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
          <v-col cols="12" lg="6">
            <h4
              class="my-4 text-h4 text-center"
              v-text="$t('tank.currentLivestockState')"
            ></h4>
            <livestock-list
              :livestock-information="currentLivestockInformations"
              table-class="shadow-bg text-white tank__livestock-table"
            />
          </v-col>
          <v-col cols="12" lg="6">
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
import { computed } from "vue";
import { Tank } from "@/types/Tank";
import LivestockList from "@/components/common/Displays/LivestockList.vue";
import { Weight } from "@/constants/global";
const props = defineProps<{
  tank: Tank;
}>();
const currentLivestockInformations = computed(() => {
  const { currentLivestockWeight } = props.tank.feedInformation;
  if (!currentLivestockWeight) return props.tank.livestockInformation;
  const { initialLivestockWeight } = props.tank.livestockInformation;
  const gainedWeight = currentLivestockWeight - initialLivestockWeight;

  return {
    initialLivestockWeight: currentLivestockWeight,
    livestock: [...props.tank.livestockInformation.livestock].map((specie) => {
      const specieCopy = { ...specie };
      const specieShareInOverallLivestockWeight =
        specieCopy.weight / initialLivestockWeight;

      specieCopy.weight =
        specie.weight + gainedWeight * specieShareInOverallLivestockWeight;

      specieCopy.meanWeight =
        Math.round(
          ((specieCopy.weight / specie.quantity) * Weight.GRAMS_IN_KILOGRAMS +
            Number.EPSILON) *
            100
        ) / 100;

      return specieCopy;
    }),
  };
});
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
