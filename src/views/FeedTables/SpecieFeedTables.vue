<template>
  <v-card
    tag="section"
    color="violet"
    class="d-flex flex-column align-center justify-center px-3 py-2"
  >
    <h2 class="text-h2 my-2 text-center">
      {{ $t("feedTables.tableForSpecie") }}
    </h2>
    <h3 class="text-h3">{{ $t(`species.${specieEnumValue}`) }}</h3>
    <v-img
      v-if="specieImageSrc"
      :src="specieImageSrc"
      class="mx-auto my-3 radius-4"
      style="width: clamp(300px, 100%, 600px)"
    />
    <feed-quality-legend />
    <default-loader v-if="loader" />
    <v-expansion-panels v-else-if="uniqueTables">
      <v-container
        ><v-row
          ><v-col
            v-for="(feed, index) in uniqueTables"
            :key="index"
            cols="12"
            sm="6"
          >
            <v-expansion-panel class="feedTables__table-list-item">
              <v-expansion-panel-title class="f-2 text-center">
                <p class="text-center w-100">
                  {{ feed.feed.name }}
                  <span
                    class="mt-1 d-block font-weight-bold"
                    v-text="`${feed.size}mm`"
                  /></p
              ></v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-sheet
                  class="mx-auto d-flex align-center justify-space-around"
                  color="transparent"
                  max-width="400"
                >
                  <p class="d-flex align-center f-15 font-weight-bold">
                    {{ $t("global.efficiency") }}
                    <span class="ml-2"
                      ><feed-quality-display :quality="feed.feed.quality"
                    /></span>
                  </p>
                  <v-tooltip anchor="bottom"
                    ><template #activator="{ props }">
                      <div v-bind="props">
                        <v-btn
                          class="f-15"
                          :label="$t('feedTables.downloadFeedTable')"
                          :disabled="isDownloadingTablePdf"
                          color="blue"
                          size="small"
                          :icon="Icons.MAGNIFY_GLASS"
                          @click="
                            fetchTable(
                              feed.feed.filename,
                              PdfActions.OPEN_IN_NEW_WINDOW
                            )
                          "
                        />
                      </div>
                    </template>
                    <p class="f-15" v-text="$t('feedTables.openFeedTable')"
                  /></v-tooltip>
                  <v-tooltip anchor="bottom"
                    ><template #activator="{ props }">
                      <div v-bind="props">
                        <v-btn
                          class="f-15"
                          :label="$t('feedTables.downloadFeedTable')"
                          :disabled="isDownloadingTablePdf"
                          color="red"
                          size="small"
                          :icon="Icons.DOWNLOAD"
                          @click="
                            fetchTable(feed.feed.filename, PdfActions.DOWNLOAD)
                          "
                        />
                      </div>
                    </template>
                    <p class="f-15" v-text="$t('feedTables.downloadFeedTable')"
                  /></v-tooltip>
                </v-sheet>
              </v-expansion-panel-text>
            </v-expansion-panel> </v-col></v-row
      ></v-container>
    </v-expansion-panels>
  </v-card>
</template>

<script setup lang="ts">
import FeedQualityLegend from "@/components/common/Feed/FeedQuality/FeedQualityLegend.vue";
import FeedQualityDisplay from "@/components/common/Feed/FeedQuality/FeedQualityDisplay.vue";
import { ref, computed, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { FeedsTablesPdfService } from "@/api/endpoints";
import { Icons } from "@/constants/icons/MdiIcons";
import { camelizeString } from "@/helpers/stringOperations";
import { PdfActions } from "@/constants/enums/PdfActions";
import useOnPdfResponse from "@/hooks/useOnPdfResponse";
import { useFeedForSpecie } from "@/stores/FeedsForSpecie";
import { storeToRefs } from "pinia";
import { FeedForSpecie } from "@/types/Feed";
import { SpeciesValues } from "@/types/Livestock";
import { Species } from "@/constants/enums/Species";

const { params } = useRoute();

const { downloadPdf, openPdfInNewWindow } = useOnPdfResponse();
const { feedsForSpecie } = storeToRefs(useFeedForSpecie());
const { getFeedsForSpecie, loader } = useFeedForSpecie();

const isDownloadingTablePdf = ref(false);

const specieEnumValue = computed((): string => {
  const { specie } = params;
  return Array.isArray(specie)
    ? camelizeString(specie[0])
    : camelizeString(specie);
});
const isProvidedSpecieParamAllowed = computed(() =>
  Object.values(Species).includes(specieEnumValue.value as SpeciesValues)
    ? true
    : false
);

const specieImageSrc = computed(() =>
  require(`@/assets/species/${camelizeString(params.specie as string)}.jpg`)
);
const uniqueTables = computed(() =>
  feedsForSpecie.value?.reduce<Required<FeedForSpecie>[]>(
    (acc, currentFeedForSpecie) => {
      if (
        !acc.find(
          (feedForSpecie: FeedForSpecie) =>
            feedForSpecie.feed._id === currentFeedForSpecie.feed._id
        )
      )
        return acc.concat([currentFeedForSpecie]);
      else return acc;
    },
    []
  )
);
async function fetchTable(fileName: string, typeOfPdfAction: PdfActions) {
  isDownloadingTablePdf.value = true;
  const response = await FeedsTablesPdfService.get({
    url: `${specieEnumValue.value}/${fileName}`,
  });
  if (response.success) {
    typeOfPdfAction == PdfActions.DOWNLOAD
      ? downloadPdf(response.data, fileName)
      : openPdfInNewWindow(response.data);
  }
  isDownloadingTablePdf.value = false;
}

onBeforeMount(() => {
  if (!isProvidedSpecieParamAllowed.value) return;
  getFeedsForSpecie(specieEnumValue.value as SpeciesValues);
});
</script>

<style lang="scss" scoped>
section {
  min-height: 80vh;
}
.feedTables__table-list-item {
  background-color: rgb(var(--v-theme-yellow));
}
</style>
