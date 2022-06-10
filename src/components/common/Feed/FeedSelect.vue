<template>
  <div class="d-flex flex-column align-center justify-center">
    <p class="f-2 text-center" v-text="$t('global.feed')"></p>
    <div class="pl-6 d-flex pos-relative" style="width: 35rem">
      <v-menu top offset-y transition="slide-y-transition" v-model="showMenu">
        <template #activator="{ props }">
          <v-card
            v-bind="props"
            flat
            class="d-flex align-center justify-center px-3"
            color="red"
            width="100%"
            max-width="30rem"
          >
            <p class="py-2 f-15 w-100">
              {{
                `${modelValue?.feedForSpecie.feed.name} ${modelValue?.feedForSpecie.size}mm`
              }}
            </p></v-card
          >
        </template>
        <v-list
          class="rounded-t-0 radius-4"
          color="violet"
          tag="ul"
          style="height: 40rem"
          v-if="
            feedsOptions.allFeeds.length || feedsOptions.proposedFeeds.length
          "
        >
          <v-list-item class="text-center text-white shadow-bg">
            <p class="text-center f-15 w-100">Polecane pasze</p>
          </v-list-item>
          <v-list-item class="text-center text-white shadow-bg"
            ><p class="f-15 w-50">{{ $t("global.feed") }}</p>
            <p class="f-15 w-50">
              {{ $t("global.efficiency") }}
            </p></v-list-item
          >
          <feed-select-list-item
            v-for="(item, key) in feedsOptions.proposedFeeds"
            :key="key"
            :feed-for-specie="item"
            @click="onFeedSelect(item)"
          />

          <v-list-item class="text-center text-white shadow-bg">
            <p class="text-center f-15 w-100">Pozostale pasze</p>
          </v-list-item>
          <v-list-item class="text-center text-white shadow-bg"
            ><p class="f-15 w-50">{{ $t("global.feed") }}</p>
            <p class="f-15 w-50">
              {{ $t("global.efficiency") }}
            </p></v-list-item
          >
          <feed-select-list-item
            v-for="(item, key) in allFeedWithoutProsoedFeeds"
            :key="key"
            :feed-for-specie="item"
            @click="onFeedSelect(item)"
          />
        </v-list>
      </v-menu>
      <v-tooltip anchor="top" v-if="isFeedProposed">
        <template #activator="{ props }">
          <v-icon
            v-bind="props"
            :icon="Icons.ALERT"
            :size="smAndUp ? '35' : '30'"
            class="ml-1"
            color="yellow"
            style="position: absolute; right: -3rem"
          />
        </template>

        <p class="f-15 text-white" style="max-width: 40rem">
          Wybrana pasza nie jest jedna z proponowanych, w takim przypadku nie
          bedzie mozlowosc korzystania z automatycznego wyliczania dawek
          pokarmowych i bedziesz musial wprawadzac dane recznie
        </p>
      </v-tooltip>
    </div>
  </div>
</template>
<script setup lang="ts">
import { CurrentTankFeed, FeedForSpecie } from "@/types/Feed";
import { FeedSelectOptions } from "@/types/FeedSelectOptions";
import FeedSelectListItem from "@/components/modules/addTank/FeedSelectListItem.vue";
import { Icons } from "@/constants/icons/MdiIcons";
import { useDisplay } from "vuetify/lib/framework";
import { CurrentTankFeedDto } from "@/utils/DTOs/CurrentTankFeed.dto";
import { ref, computed, withDefaults, onBeforeMount } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: CurrentTankFeed | null;
    label?: string;
    feedsOptions: FeedSelectOptions;
  }>(),
  {
    //label is for v-select component
    label: "feedInformation.selectFeed",
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", feed: CurrentTankFeed): void;
}>();
const { smAndUp } = useDisplay();
const showMenu = ref(false);

const allFeedWithoutProsoedFeeds = computed(() => {
  return props.feedsOptions.allFeeds.reduce<Required<FeedForSpecie>[]>(
    (acc, currentFeed) => {
      if (
        !props.feedsOptions.proposedFeeds.find(
          (feed) => feed._id === currentFeed._id
        )
      )
        return acc.concat([currentFeed]);
      else return acc;
    },
    []
  );
});

const isFeedProposed = computed(() => {
  if (
    !props.feedsOptions.proposedFeeds.some(
      (feed) => feed._id === props.modelValue?.feedForSpecie._id
    )
  )
    return true;
  return false;
});
function onFeedSelect(feedForSpecie: FeedForSpecie) {
  emit(
    "update:modelValue",
    new CurrentTankFeedDto({
      feedForSpecie,
      isProposed: isFeedProposed.value,
    })
  );

  showMenu.value = false;
}
onBeforeMount(() => {
  if (!props.modelValue) {
    const defaultFeed =
      props.feedsOptions.proposedFeeds[0] || props.feedsOptions.allFeeds[0];
    emit(
      "update:modelValue",
      new CurrentTankFeedDto({
        feedForSpecie: defaultFeed,
        isProposed: isFeedProposed.value,
      })
    );
  }
  allFeedWithoutProsoedFeeds.value;
});
</script>
