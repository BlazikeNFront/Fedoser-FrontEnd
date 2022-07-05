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
            v-for="(feed, key) in feedsOptions.proposedFeeds"
            :style="
              isFeedAlreadySelected(feed)
                ? 'background-color:rgb(var(--v-theme-med-violet))'
                : ''
            "
            :key="key"
            :feed-for-specie="feed"
            :is-currently-selected="isFeedAlreadySelected(feed)"
            @click="onFeedSelect(feed)"
          />

          <v-list-item class="text-center text-white shadow-bg">
            <p class="text-center f-15 w-100">
              {{ $t("feedInformation.othersFeed") }}
            </p>
          </v-list-item>
          <v-list-item class="text-center text-white shadow-bg f-15"
            ><p class="w-50">{{ $t("global.feed") }}</p>
            <p class="w-50">
              {{ $t("global.efficiency") }}
            </p></v-list-item
          >
          <feed-select-list-item
            v-for="(feed, key) in allFeedWithoutProsoedFeeds"
            :key="key"
            :style="
              isFeedAlreadySelected(feed)
                ? 'background-color:rgb(var(--v-theme-med-violet))'
                : ''
            "
            :feed-for-specie="feed"
            :is-currently-selected="isFeedAlreadySelected(feed)"
            @click="onFeedSelect(feed)"
          />
        </v-list>
      </v-menu>
      <v-tooltip
        anchor="top"
        v-if="modelValue && !isFeedProposed(modelValue.feedForSpecie._id)"
      >
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
          {{ $t("feedInformation.notProposedTooltip") }}
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
    feedsOptions: FeedSelectOptions;
    label?: string;
    forceEvalOnMounted?: boolean;
  }>(),
  {
    //label is for v-select component
    label: "feedInformation.selectFeed",
    forceEvalOnMounted: false,
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", feed: CurrentTankFeed): void;
}>();
const { smAndUp } = useDisplay();
const showMenu = ref(false);
const isFeedAlreadySelected = computed(
  () => (feed: FeedForSpecie) =>
    feed._id === props.modelValue?.feedForSpecie._id
);

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

const isFeedProposed = computed(() => (feedId: string) => {
  if (props.feedsOptions.proposedFeeds.some((feed) => feed._id === feedId))
    return true;
  return false;
});
function onFeedSelect(feedForSpecie: FeedForSpecie) {
  emit(
    "update:modelValue",
    new CurrentTankFeedDto({
      feedForSpecie,
      isProposed: isFeedProposed.value(feedForSpecie._id),
    })
  );

  showMenu.value = false;
}

onBeforeMount(() => {
  if (!props.modelValue || props.forceEvalOnMounted) {
    const defaultFeed =
      props.feedsOptions.proposedFeeds[0] || props.feedsOptions.allFeeds[0];
    emit(
      "update:modelValue",
      new CurrentTankFeedDto({
        feedForSpecie: defaultFeed,
        isProposed: isFeedProposed.value(defaultFeed._id),
      })
    );
  }
});
</script>
