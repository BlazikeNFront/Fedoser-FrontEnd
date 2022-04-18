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
                  class="f-2"
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
            class="py-4 d-flex flex-column align-center justify-center"
          >
            <h3 class="h-3" v-text="$t('addTank.addLivestock')"></h3>
            <livestock-editor
              v-model:livestockInformation="livestockInformation"
            >
              <template #default="{ isAtLeaseOneSpieceAdded }">
                <div class="d-flex align-center justify-end">
                  <v-btn
                    width="150"
                    class="f-2 mr-2"
                    color="red"
                    @click="step--"
                    v-text="$t('global.back')"
                  />
                  <v-btn
                    width="150"
                    color="grey"
                    class="f-2 mr-2"
                    style="color: white !important"
                    @click="omitLivestockStep"
                    v-text="$t('global.omit')"
                  />
                  <v-btn
                    width="150"
                    class="f-2"
                    color="success"
                    @click="handleNextStepRequest(isAtLeaseOneSpieceAdded)"
                    v-text="$t('global.next')"
                  />
                </div>
              </template>
            </livestock-editor>
          </v-card>
        </v-col> </v-row
    ></v-container>
    <v-card color="violet" class="d-flex flex-column" v-if="step === 3">
      <v-col cols="12">
        <feed-information-editor
          v-model="feedInformation"
          :livestock-weight="livestockInformation.initialLivestockWeight"
        >
          <template #default="{ validateFeedInformation }">
            <div class="d-flex align-center justify-end">
              <v-btn
                width="150"
                class="f-2 mr-2"
                color="red"
                @click="step--"
                v-text="$t('global.back')"
              />
              <v-btn
                width="150"
                color="grey"
                class="f-2 mr-2"
                style="color: white !important"
                @click="omitFeedInformationStep"
                v-text="$t('global.omit')"
              />
              <v-btn
                width="150"
                class="f-2"
                color="success"
                @click="handleNextStepRequest(validateFeedInformation)"
                v-text="$t('global.next')"
              />
            </div>
          </template>
        </feed-information-editor>
      </v-col>
    </v-card>
    <v-card class="d-flex flex-column" v-if="step === 4" color="violet">
      <add-tank-summary-display
        :main-tank-information="mainTankInformation"
        :livestock-information="livestockInformation"
        :feed-information="feedInformation"
      />
      <div class="mb-4 mr-6 d-flex align-center justify-end">
        <v-btn
          width="150"
          :disabled="isLoading"
          class="f-2 mr-2"
          color="red"
          @click="step--"
          v-text="$t('global.back')"
        />
        <v-btn
          width="270"
          :disabled="isLoading"
          class="f-2"
          v-text="$t('addTank.addTank')"
          color="success"
          @click="addTank"
        />
      </div>
    </v-card>
  </section>
</template>

<script setup lang="ts">
import LivestockEditor from "@/components/common/Editors/LivestockEditor.vue";
import AddTankSummaryDisplay from "@/components/modules/addTank/AddTankSummaryDisplay.vue";
import { LivestockInformation } from "@/types/Livestock";
import { LivestockInformationDTO } from "@/utils/DTOs/LivestockInformation.dto";
import MainTankInformationEditor from "@/components/common/Editors/MainTankInformationEditor.vue";
import FeedInformationEditor from "@/components/common/Editors/FeedInformationEditor.vue";
import { TankDTO } from "@/utils/DTOs/Tank.dto";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { FeedInformationDTO } from "@/utils/DTOs/FeedInformation.dto";
import { RoutesNames } from "@/constants/routesNames/RoutesNames";
import TankService from "@/services/endpoints/Tank";
const router = useRouter();

const step = ref(1);
const isLoading = ref(false);
const mainTankInformationEditor = ref<InstanceType<
  typeof MainTankInformationEditor
> | null>(null);
const mainTankInformation = reactive({
  name: "Rainbow Fry 3",
  volume: 25,
  description: "Tank with fry rainbows trout",
});

const livestockInformation = ref<LivestockInformation>(
  new LivestockInformationDTO({})
);
const feedInformation = ref(new FeedInformationDTO({}));

function omitLivestockStep() {
  livestockInformation.value = new LivestockInformationDTO({});
  step.value++;
}

function omitFeedInformationStep() {
  feedInformation.value = new FeedInformationDTO({});
  step.value++;
}
async function handleNextStepRequest(validationCallback: () => boolean) {
  if (!(await validationCallback())) return false;
  if (step.value === 2 && livestockInformation.value.initialLivestockWeight)
    feedInformation.value.currentLivestockWeight =
      livestockInformation.value.initialLivestockWeight;
  step.value++;
}

async function addTank() {
  const tankPayload = new TankDTO({
    mainTankInformation: { ...mainTankInformation },
    livestockInformation: livestockInformation.value,
    feedInformation: feedInformation.value,
    annotations: [],
  });
  isLoading.value = true;
  const result = await TankService.create(tankPayload);
  isLoading.value = false;
  if (result.success) {
    router.push({ name: RoutesNames.USER_TANKS });
  }
}
</script>
<style lang="scss" scoped>
.add-livestock-step-radio:deep(.v-label) {
  font-size: 2rem;
}
</style>
