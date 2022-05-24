<template>
  <i18n-t keypath="tankCard.mainSpecie" tag="p" scope="global" class="f-15">
    <template #mainSpecie>
      <span v-if="mainSpecie" class="ml-2" v-text="mainSpecie.name"></span>
      <v-icon v-else v-bind="textAttrs" class="ml-2" :icon="Icons.EXIT" />
    </template>
  </i18n-t>
</template>
<script setup lang="ts">
import { SingleLivestockSpecie } from "@/types/Livestock";
import { findMainSpecieInLivestock } from "@/helpers/findMainSpecieInLivestock";
import { Icons } from "@/constants/icons/MdiIcons";
import { computed } from "vue";
import { Attrs } from "@/types/Attrs";
const props = defineProps<{
  livestock: SingleLivestockSpecie[];
  textAttrs?: Attrs;
}>();
const mainSpecie = computed(() => findMainSpecieInLivestock(props.livestock));
</script>
