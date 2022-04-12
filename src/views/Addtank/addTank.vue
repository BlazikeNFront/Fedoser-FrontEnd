<template>
  <section>
    <h2 class="text-center h-2" v-text="$t('navBar.addTank')"></h2>
    <v-container
      ><v-row
        ><v-col cols="12" v-if="step === 1">
          <main-tank-information-editor
            v-model:mainTankInformation="mainTankInformation"
            ref="mainTankInformationEditor"
          >
            <template #default="{ validateMainTankInformation }">
              <v-col cols="12" class="d-flex align-center justify-end">
                <v-btn
                  width="150"
                  class="f-3"
                  color="success"
                  @click="handleNextStepRequest(validateMainTankInformation)"
                  v-text="$t('global.next')"
                />
              </v-col>
            </template>
          </main-tank-information-editor>
        </v-col>
        <v-col v-if="step === 2" cols="12">
          <v-card
            color="violet"
            class="d-flex flex-column align-center justify-center"
          >
            <v-radio-group v-model="showLiveStockCreator" inline
              ><v-radio :label="$t('addTank')" :value="true" /><v-radio
                :value="false"
            /></v-radio-group>
            <livestock-editor
              v-model:livestockInformation="livestockInformation"
              @next-step-request="handleNextStepRequest"
            />
          </v-card>
        </v-col> </v-row
    ></v-container>

    <div class="d-flex flex-column" v-if="step === 3">
      <feed-information
        v-model="feedInformation"
        :livestock-weight="livestockInformation.initialLivestockWeight"
      />
      <button class="button" @click="step++">Next</button>
    </div>
    <div class="d-flex flex-column" v-if="step === 4">
      <summary-information
        :main-tank-information="mainTankInformation"
        :livestock-information="livestockInformation"
        :feed-information="feedInformation"
      />
      <button class="button" @click="handleAddTankRequest">Add Tank</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import LivestockEditor from "@/components/common/Editors/LivestockEditor.vue";
import SummaryInformation from "@/components/views/addTank/SummaryInformation.vue";
import { LivestockInformation } from "@/types/Livestock";
import { LivestockInformationDTO } from "@/utils/DTOs/LivestockInformation.dto";
import MainTankInformationEditor from "@/components/common/Editors/MainTankInformationEditor.vue";
import { TankDTO } from "@/utils/DTOs/Tank.dto";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { FeedInformationDTO } from "@/utils/DTOs/FeedInformation.dto";
import { RoutesNames } from "@/constants/routesNames/RoutesNames";
import TankService from "@/services/endpoints/Tank";
const router = useRouter();
const mainTankInformationEditor = ref<InstanceType<
  typeof MainTankInformationEditor
> | null>(null);
const mainTankInformation = reactive({
  name: "Rainbow Fry 3",
  volume: 25,
  description: "Tank with fry rainbows trout",
});

const step = ref(1);
const showLiveStockCreator = ref(true);
const livestockInformation = ref<LivestockInformation>(
  new LivestockInformationDTO({})
);
async function handleNextStepRequest(validationCallback: () => boolean) {
  if (!(await validationCallback())) return;
  step.value++;
}
const feedInformation = ref(new FeedInformationDTO({}));

async function addTank() {
  const tankPayload = new TankDTO({
    mainTankInformation: { ...mainTankInformation },
    livestockInformation: livestockInformation.value,
    feedInformation: feedInformation.value,
    annotations: [],
  });
  console.log(tankPayload);
  const result = await TankService.create(tankPayload);

  if (result.success) {
    router.push({ name: RoutesNames.USER_TANKS });
  }
}
</script>
<style>
.livestock {
  margin-left: 5rem;
  padding-left: 5rem;
  border-left: 5px solid black;
}
</style>
