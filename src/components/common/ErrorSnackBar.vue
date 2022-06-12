<template>
  <v-snackbar :model-value="!!errorModalMessage" multi-line top :timeout="0">
    <p class="f-15 text-center" style="line-height: 3rem">
      {{ errorModalMessage }}
    </p>

    <template #actions>
      <v-btn
        class="f-15"
        color="red"
        @click="clearModal"
        :icon="Icons.EXIT"
        size="large"
      />
    </template>
  </v-snackbar>
</template>
<script setup lang="ts">
import { useErrorModal } from "@/stores/ErrorModalStore";
import { storeToRefs } from "pinia";
import { Icons } from "@/constants/icons/MdiIcons";
const { errorModalMessage } = storeToRefs(useErrorModal());
const { clearModal } = useErrorModal();
</script>
