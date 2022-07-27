<template>
  <section>
    <h2 class="text-center h-2" v-text="$t('global.tanks')"></h2>
    <v-progress-linear
      v-if="requestState.loading"
      :active="requestState.loading"
      :indeterminate="requestState.loading"
      color="blue"
      height="5"
    />
    <div v-else-if="requestState.data?.length">
      <v-expansion-panels>
        <v-container
          ><v-row
            ><v-col
              cols="12"
              lg="6"
              v-for="tank in requestState.data"
              :key="tank._id"
              :offset-lg="requestState.data.length > 1 ? 0 : 3"
            >
              <tank-card-expansion
                :tank="tank"
                tank-card-title-classes="h-4"
                class="my-3 w-100"
              >
                <v-btn
                  class="mt-4 f-15"
                  block
                  color="red"
                  :to="{
                    name: RoutesNames.TANK_DETAILS,
                    params: { id: tank._id },
                  }"
                  v-text="$t('global.manage')"
                />
              </tank-card-expansion> </v-col></v-row
        ></v-container>
      </v-expansion-panels>
    </div>
    <div v-else class="d-flex flex-column align-center justify-center">
      <p class="text-center f-2">{{ $t("userTanks.noTanks") }}</p>
      <v-btn :to="{ name: RoutesNames.ADD_TANK }" class="app-button mt-4 f-15">
        {{ $t("global.clickHereToAddTank") }}
      </v-btn>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RoutesNames } from "@/constants/routesNames/RoutesNames";
import { TankService } from "@/api/endpoints";
import TankCardExpansion from "@/components/common/Tank/TankCardExpansion.vue";
import useBaseRequest from "@/hooks/useBaseRequest";

import { TankDto } from "@/types/Tank";
import { onBeforeMount } from "vue";
const { fetchData, requestState } = useBaseRequest<TankDto[]>();
onBeforeMount(async () => await fetchData(TankService.fetch));
</script>
