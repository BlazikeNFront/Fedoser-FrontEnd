<template>
  <v-card tag="aside" class="mt-2 d-flex flex-column" color="light-yellow">
    <section>
      <h4 class="my-3 h-4 text-center" v-text="$t('appHome.todayActions')"></h4>
      <loader-common v-if="loader" />
      <p v-else-if="!todayActions.length" class="f-15 text-center">
        {{ $t("appHome.todayActionsDone") }}
        <v-icon class="mr-4" :icon="Icons.CHECKMARK_CIRCLE" color="success" />
      </p>
      <v-list color="light-yellow" tag="ul">
        <v-list-item
          v-for="(action, index) in todayActions"
          :key="index"
          tag="li"
          v-text="action"
        />
      </v-list>
    </section>
  </v-card>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";

import { Icons } from "@/constants/icons/MdiIcons";
import LoaderCommon from "@/components/common/Loader.vue";
const todayActions = ref<string[]>([]);
const loader = ref(false);

async function getListOfTodayActions() {
  //fake api call - needs to be created after migrating to vuetify -
  //data from API should be created from existing entities in DB (should not create new one for that), and after first call data should be store in localStorage/indexedDb and
  //modified directly there and also obtained from there in further logins for that day (without calling to API again())

  loader.value = true;

  await new Promise((resolve) =>
    setTimeout(() => {
      resolve((todayActions.value = []));
      loader.value = false;
    }, 2000)
  );
}
onMounted(() => {
  getListOfTodayActions();
});
</script>
