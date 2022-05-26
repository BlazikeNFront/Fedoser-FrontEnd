<template>
  <v-dialog v-model="showDialog" class="editor-dialog" tag="dialog">
    <template #activator="{ props }">
      <v-btn v-bind="{ ...props, ...$attrs }" />
    </template>
    <v-card color="violet">
      <v-container
        ><v-row
          ><v-col cols="12">
            <p
              class="f-15 my-2 font-weight-bold text-center"
              v-text="message"
            ></p>
          </v-col>
          <v-col cols="12" class="d-flex align-center justify-space-around">
            <v-btn
              class="f-15 app-button text-white"
              :disabled="acceptButtonLoader"
              @click="showDialog = false"
              >{{ $t("global.reject") }}</v-btn
            >
            <v-btn
              class="f-15 save-button text-white"
              :loading="acceptButtonLoader"
              @click="onAcceptButtonClick"
              >{{ $t("global.confirm") }}</v-btn
            >
          </v-col>
        </v-row></v-container
      >
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { ref } from "vue";
const showDialog = ref(false);
const acceptButtonLoader = ref(false);
const props = defineProps<{
  message: string;
  onAccept: () => boolean | Promise<boolean>;
  onReject?: () => void;
}>();

async function onAcceptButtonClick() {
  acceptButtonLoader.value = true;
  const result = await props.onAccept();
  acceptButtonLoader.value = false;
  if (result) showDialog.value = false;
}
</script>
