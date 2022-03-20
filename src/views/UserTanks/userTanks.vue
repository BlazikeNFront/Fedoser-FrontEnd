<template>
  <div>
    <h2 class="text-center">User Tanks</h2>
    <ul class="tankList" v-if="userTanks.length">
      <tank-card v-for="tank in userTanks" :key="tank._id" :tank="tank">
        <router-link
          class="tank-link"
          :to="{ name: RoutesNames.TANK_DETAILS, params: { id: tank._id } }"
          >Details</router-link
        >
      </tank-card>
    </ul>
    <p v-else>U dont have declared tanks</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { Tank } from "@/types/Tank";
import { RoutesNames } from "@/constants/routesNames/RoutesNames";
import TankService from "@/services/endpoints/Tank";
import TankCard from "@/components/common/Tank/TankCard.vue";
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
