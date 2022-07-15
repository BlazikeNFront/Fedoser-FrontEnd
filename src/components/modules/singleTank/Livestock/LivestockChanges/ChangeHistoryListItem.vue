<template>
  <v-expansion-panel-title>
    <div class="f-2 text-center w-100 d-flex algin-center justify-space-around">
      <p>
        {{ $t("global.specie") }}:<span class="ml-2 font-weight-bold">{{
          $t(`species.${livestockChange.after.specie}`)
        }}</span>
      </p>
      <p class="font-weight-bold">{{ livestockChange.date }}</p>
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
            :specie-change-data="specieChangeData(livestockChange.before)"
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
            :specie-change-data="specieChangeData(livestockChange.after)"
            :changes="keysOfChangedValues"
          />
        </v-col>
        <v-col cols="12">
          <p class="f-2 font-weight-bold text-center">
            {{ $t("global.reason") }}
          </p>
          <p class="f-2 text-center">{{ livestockChange.reason }}</p>
        </v-col>
      </v-row>
    </v-container>
  </v-expansion-panel-text>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { Icons } from "@/constants/icons/MdiIcons";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { ChangeSpecieWeightDto } from "@/types/ChangeSpecieWeight";
import HistorySpecieCard from "@/components/modules/singleTank/Livestock/LivestockChanges/HistorySpecieCard.vue";
import { SingleLivestockSpecie } from "@/types/Livestock";
const props = defineProps<{
  livestockChange: ChangeSpecieWeightDto;
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
const keysOfChangedValues = computed((): (keyof SingleLivestockSpecie)[] => {
  const { before, after } = props.livestockChange;
  return Object.keys(props.livestockChange.before).filter(
    (key): key is keyof SingleLivestockSpecie =>
      before[key as keyof SingleLivestockSpecie] !==
      after[key as keyof SingleLivestockSpecie]
  );
});
</script>
