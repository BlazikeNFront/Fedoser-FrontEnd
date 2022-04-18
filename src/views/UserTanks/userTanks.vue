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
              class="my-3"
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
<style lang="scss" scoped>
.tankList {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.tank {
  margin: 10px 15px;
  width: 100px;
  height: 50px;
  border-radius: 20px;
  background-color: seagreen;
  font-size: 1.5rem;
  color: black;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tank-link {
  margin-left: 50%;
  margin-bottom: 1rem;
  transform: translateX(-50%);
  display: inline-block;
  padding: 10px 15px;
  text-decoration: none;
  color: black;
  font-size: 1.5rem;
  font-weight: 700;
  border-radius: 25px;
  text-transform: uppercase;
  background-color: $tertiary-color;
}
</style>
