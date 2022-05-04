<template>
  <section>
    <h2 class="text-center h-2" v-text="$t('global.tanks')"></h2>
    <v-expansion-panels v-if="userTanks.length">
      <v-container
        ><v-row
          ><v-col
            cols="12"
            lg="6"
            v-for="tank in userTanks"
            :key="tank._id"
            :offset-lg="userTanks.length > 1 ? 0 : 3"
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

    <p v-else v-text="$t('userTanks.noTanks')"></p>
  </section>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { Tank } from "@/types/Tank";
import { RoutesNames } from "@/constants/routesNames/RoutesNames";
import TankService from "@/services/endpoints/Tank";
import TankCardExpansion from "@/components/common/Tank/TankCardExpansion.vue";
import { API_DATA_KEY } from "@/constants/global";
const userTanks = ref<Tank[]>([]);
onBeforeMount(async () => {
  const request = await TankService.fetch();
  if (API_DATA_KEY in request) userTanks.value = request.data;
});
</script>
