<template>
  <v-card tag="section" color="violet" class="px-3 py-2">
    <h2 class="text-h2 my-2 text-center">
      {{ $t("feedTables.tableFor") }} <span v-text="$route.params.specie" />
    </h2>
    <v-img
      v-if="specieImageSrc"
      :src="specieImageSrc"
      class="mx-auto radius-4"
      style="width: clamp(300px, 100%, 600px)"
    />
    <v-expansion-panels v-if="feedsTables">
      <v-container
        ><v-row
          ><v-col
            cols="12"
            sm="6"
            v-for="(table, index) in feedsTables.feedTables"
            :key="index"
          >
            <v-expansion-panel class="feedTables__table-list-item">
              <v-expansion-panel-title class="f-2 text-center">
                <p>
                  {{ table.feedName }}
                  <span
                    class="font-weight-bold"
                    v-text="`${table.size}mm`"
                  /></p
              ></v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-sheet
                  class="d-flex align-center justify-space-around"
                  color="transparent"
                >
                  <p class="f-15 font-weight-bold">
                    {{ `${$t("feedTables.feedQuality")} ${table.quality}` }}
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
                              table.fileName,
                              PdfActions.OPEN_IN_NEW_WINDOW
                            )
                          "
                        />
                      </div>
                    </template>
                    <p class="f-15" v-text="$t('feedTable.downloadFeedTable')"
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
                            fetchTable(table.fileName, PdfActions.DOWNLOAD)
                          "
                        />
                      </div>
                    </template>
                    <p class="f-15" v-text="$t('feedTable.downloadFeedTable')"
                  /></v-tooltip>
                </v-sheet>
              </v-expansion-panel-text>
            </v-expansion-panel> </v-col></v-row
      ></v-container>
    </v-expansion-panels>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import {
  FeedTablesService,
  FeedTablesPdfService,
} from "@/services/endpoints/FeedTables";
import { Species } from "@/constants/enums/Species";
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
const specieImageSrc = computed(() =>
  require(`@/assets/species/${camelizeString(params.specie as string)}.jpg`)
);
async function getFeedsForSpecie() {
  isLoading.value = true;
  const response = await FeedTablesService.get(
    String(Species[changeRouteParamToEnumValue() as keyof typeof Species])
  );
  if (response.success) {
    feedsTables.value = response.data;
  }
  isLoading.value = false;
}
function changeRouteParamToEnumValue() {
  const { specie } = params;
  if (Array.isArray(specie))
    return specie[0].replaceAll(" ", "_").toUpperCase();
  else return specie.replaceAll(" ", "_").toUpperCase();
}
async function fetchTable(fileName: string, typeOfPdfAction: PdfActions) {
  isDownloadingTablePdf.value = true;
  const response = await FeedTablesPdfService.get(
    String(Species[changeRouteParamToEnumValue() as keyof typeof Species]),
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
