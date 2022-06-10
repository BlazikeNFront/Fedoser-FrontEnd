// src/global-components.d.ts
import DefaultLoader from "@/components/common/Loader.vue";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    DefaultLoader: typeof DefaultLoader;
  }
}
