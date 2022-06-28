<template>
  <v-expansion-panels class="livestock-history-panels">
    <v-expansion-panel
      v-for="(change, index) in livestockChanges"
      :key="index"
      bg-color="violet"
      style="border-radius: 10px !important"
    >
      <v-expansion-panel-title>
        <div
          class="f-2 text-center w-100 d-flex algin-center justify-space-around"
        >
          <p>
            {{ $t("global.specie") }}:<span class="ml-2 font-weight-bold">{{
              $t(`species.${change.after.specie}`)
            }}</span>
          </p>
          <p class="font-weight-bold">{{ change.date }}</p>
        </div>
      </v-expansion-panel-title>
      <v-expansion-panel-text tag="article" class="d-flex flex-column">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              class="d-flex flex-column flex-sm-row align-center justify-space-around"
            >
              <history-specie-card
                :card-title="$t('global.before')"
                :specie-change-data="specieChangeData(change.before)"
              />
              <v-icon
                :icon="Icons.ARROW_RIGHT"
                :class="{ 'rotate-90': !smAndUp }"
                class="ma-4"
                size="40"
                color="yellow"
              />
              <history-specie-card
                :card-title="$t('global.after')"
                :specie-change-data="specieChangeData(change.after)"
              />
            </v-col>
            <v-col cols="12">
              <p class="f-2 font-weight-bold text-center">
                {{ $t("global.reason") }}
              </p>
              <p class="f-2 text-center">{{ change.reason }}</p>
            </v-col>
          </v-row>
        </v-container>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { ChangeSpecieWeightPayload } from "@/utils/DTOs/ChangeSpecieWeight.dto";
import HistorySpecieCard from "./HistorySpecieCard.vue";
import { Icons } from "@/constants/icons/MdiIcons";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { SingleLivestockSpecie } from "@/types/Livestock";
defineProps<{
  livestockChanges: ChangeSpecieWeightPayload[];
}>();
const { smAndUp } = useDisplay();
const specieChangeData = computed(
  () =>
    (
      changeData: SingleLivestockSpecie
    ): Omit<SingleLivestockSpecie, "specie"> => {
      const { specie, ...restChangeData } = changeData;
      return restChangeData;
    }
);
</script>
<style lang="scss">
.livestock-history-panels {
  .v-expansion-panel-title__icon {
    font-size: 2rem;
  }
}
</style>
