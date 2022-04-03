<template>
  <div class="d-flex flex-column">
    <div class="loader__animation">
      <div class="loader__ring loader__ring--outer"></div>
      <div class="loader__ring loader__ring--inner"></div>
      <div class="loader__ring loader__ring--inner2"></div>
      <svg class="loader__salmon-svg" viewBox="0 0 249 252" fill="none">
        <path
          pathLength="1"
          d="M222.991 12.5873C208.484 2.73994 131.951 -3.16842 75.427 31.7896M75.427 31.7896C-22.6153 35.2362 23.9047 67.2401 24.9052 67.7325M75.427 31.7896C52.4172 50.4996 -68.1349 135.187 70.9251 244C77.4279 230.542 87.4322 200.672 75.427 188.855C105.44 169.16 106.441 139.571 101.438 142.572C48.9157 174.084 31.9085 141.588 28.4068 129.278C29.7408 130.305 33.9092 134.401 39.9118 142.572C47.4151 152.786 -4.10721 142.572 168.467 79.0569C176.471 90.8737 172.369 118.364 137.954 114.015M170.968 79.0569C180.527 74.4814 193.84 67.593 206.484 60.1027M206.484 60.1027C226.041 48.5173 244 35.4921 244 27.3584C237.33 34.999 220.49 52.2447 206.484 60.1027ZM206.484 60.1027L203.525 54.4386M203.525 54.4386L201.982 51.4844C186.475 56.5722 156.762 57.9836 161.965 22.9271C158.825 35.5645 162.741 59.5592 203.525 54.4386ZM203.525 54.4386C203.511 45.0836 205.683 24.995 214.487 19.4805"
          stroke="#024564"
          stroke-width="10"
        ></path>
      </svg>
    </div>
    <div v-if="loaderText" class="d-flex align-end justify-center">
      <span v-text="$t('global.loading')" class="f-15"></span>
      <div class="loader__dots"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
withDefaults(
  defineProps<{
    loaderText?: boolean;
    loaderLogo?: boolean;
  }>(),
  {
    loaderText: true,
    loaderLogo: true,
  }
);
</script>
<style lang="scss">
.loader__animation {
  margin: 0 auto;
  position: relative;
  width: 100px;
  height: 100px;
}
.loader__ring {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  border: 5px solid;
  animation-name: loader__rings_animation;
  animation-duration: 0.9s;
  animation-iteration-count: infinite;
}
.loader__ring--outer {
  width: 95px;
  height: 95px;
  border-color: rgb(var(--v-theme-violet)) transparent;
  border-left: none;
  border-right: none;
}
.loader__ring--inner {
  width: 80px;
  height: 80px;
  border-color: transparent rgb(var(--v-theme-yellow));
  border-top: none;
  border-bottom: none;
}
.loader__ring--inner2 {
  width: 65px;
  height: 65px;
  border-left: none;
  border-right: none;
  border-color: rgb(var(--v-theme-violet)) transparent;
}
.loader__salmon-svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 35px;
  height: 35px;
  animation-name: logo-scale;
  animation-duration: 0.9s;
  animation-iteration-count: infinite;
}

.loader__dots {
  position: relative;
  margin-bottom: 6px;
  left: 1.2rem;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: rgb(var(--v-theme-violet));
  color: rgb(var(--v-theme-violet));
}

.loader__dots::before,
.loader__dots::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
}

.loader__dots::before {
  left: -9px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: rgb(var(--v-theme-violet));
}

.loader__dots::after {
  left: 9px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: rgb(var(--v-theme-violet));
}

@keyframes loader__rings_animation {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
@keyframes logo-scale {
  0% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
