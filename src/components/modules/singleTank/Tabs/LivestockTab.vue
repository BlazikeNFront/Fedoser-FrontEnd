<template>
  <div class="my-4">
    <default-loader v-if="!tank" />
    <div
      v-else-if="!tank.livestockInformation.initial.length"
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
              :livestock="tank.livestockInformation.current"
              table-class="shadow-bg text-white tank__livestock-table"
            >
              <template #action="{ specie }">
                <v-btn
                  icon
                  @click="specieWeightEditor = specie"
                  class="ma-2 shadow-bg"
                  width="40"
                  height="40"
                >
                  <v-icon color="yellow" size="20">
                    {{ Icons.EDIT }}
                  </v-icon>
                </v-btn>
              </template>
            </livestock-list>
          </v-col>
          <v-col cols="12" xl="6">
            <h4
              class="my-4 text-h4 text-center"
              v-text="$t('tank.initialLivestockState')"
            ></h4>
            <livestock-list
              :livestock="tank.livestockInformation.initial"
              table-class="shadow-bg text-white tank__livestock-table"
            />
          </v-col>
          <v-col cols="12" class="d-flex align-center justify-center">
            <livestock-weight-editor
              v-if="specieWeightEditor"
              v-model="specieWeightEditor"
            />
          </v-col>
          <v-col cols="12" v-if="tank.livestockInformation.changes.length">
            <h4 class="my-4 text-h4 text-center">
              {{ $t("livestockInformation.changesHistory") }}
            </h4>
            <changes-history-list
              :livestock-changes="tank.livestockInformation.changes"
            />
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>
<script setup lang="ts">
import LivestockList from "@/components/common/Livestock/LivestockList.vue";
import LivestockWeightEditor from "../Livestock/LivestockWeightEditor.vue";
import ChangesHistoryList from "../Livestock/LivestockChanges/ChangesHistoryList.vue";
import { storeToRefs } from "pinia";
import { useTankStore } from "@/stores/TankStore";
import { Icons } from "@/constants/icons/MdiIcons";
import { SingleLivestockSpecie } from "@/types/Livestock";
import { ref } from "vue";
const { tank } = storeToRefs(useTankStore());
const specieWeightEditor = ref<SingleLivestockSpecie | null>(null);
</script>
<style lang="scss">
.tank__livestock-table {
  tr:hover {
    background-color: rgba(var(--v-theme-yellow), 0.3) !important;
  }
}
</style>
