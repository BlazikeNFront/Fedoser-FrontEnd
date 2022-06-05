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
    <v-expansion-panels v-if="feedsTables">
      <v-container
        ><v-row
          ><v-col
            v-for="(table, index) in feedsTables.feedTables"
            :key="index"
            cols="12"
            sm="6"
          >
            <v-expansion-panel class="feedTables__table-list-item">
              <v-expansion-panel-title class="f-2 text-center">
                <p class="text-center w-100">
                  {{ table.feed.name }}
                  <span
                    class="mt-1 d-block font-weight-bold"
                    v-text="`${table.feed.size}mm`"
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
                      ><feed-quality-display :quality="+table.feed.quality"
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
                              table.feed.fileName,
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
                            fetchTable(table.feed.fileName, PdfActions.DOWNLOAD)
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
import {
  FeedTablesService,
  FeedTablesPdfService,
} from "@/services/endpoints/FeedTables";
import { FeedTablesForSpecie } from "@/types/FeedTablesForSpecie";
import { Icons } from "@/constants/icons/MdiIcons";
import { camelizeString } from "@/helpers/stringOperations";
import { PdfActions } from "@/constants/enums/PdfActions";
import useOnPdfResponse from "@/hooks/useOnPdfResponse";

const { params } = useRoute();
const { downloadPdf, openPdfInNewWindow } = useOnPdfResponse();

const isLoading = ref(false);
const isDownloadingTablePdf = ref(false);
const feedsTables = ref<FeedTablesForSpecie | null>(null);
const specieEnumValue = computed(() => {
  const { specie } = params;
  if (Array.isArray(specie)) return camelizeString(specie[0]);
  else return camelizeString(specie);
});
const specieImageSrc = computed(() =>
  require(`@/assets/species/${camelizeString(params.specie as string)}.jpg`)
);

async function getFeedsForSpecie() {
  isLoading.value = true;
  const response = await FeedTablesService.get(
    specieEnumValue.value,
    "",
    "species"
  );
  if (response.success) feedsTables.value = response.data;

  isLoading.value = false;
}

async function fetchTable(fileName: string, typeOfPdfAction: PdfActions) {
  isDownloadingTablePdf.value = true;
  const response = await FeedTablesPdfService.get(
    specieEnumValue.value,
    fileName
  );
  if (response.success) {
    typeOfPdfAction == PdfActions.DOWNLOAD
      ? downloadPdf(response.data, fileName)
      : openPdfInNewWindow(response.data);
  }
  isDownloadingTablePdf.value = false;
}

onBeforeMount(() => getFeedsForSpecie());
</script>

<style lang="scss" scoped>
section {
  min-height: 80vh;
}
.feedTables__table-list-item {
  background-color: rgb(var(--v-theme-yellow));
}
</style>
