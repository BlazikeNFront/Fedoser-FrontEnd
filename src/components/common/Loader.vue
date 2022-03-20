<template>
  <div class="loader">
    <div class="loader__animation">
      <div class="loader__outer-ring"></div>
      <div class="loader__inner-ring"></div>
      <div class="loader__inner-ring2"></div>
      <img
        v-if="loaderLogo"
        src="@/assets/logo__fish.png"
        class="loader__logo"
        alt="Feed Your Fish logo"
      />
    </div>
    <div v-if="loaderText" class="loader__text">
      <p>Loading</p>
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
.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.loader__animation {
  margin: 0 auto;
  position: relative;
  width: 100px;
  height: 100px;
}
.loader__outer-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 95px;
  height: 95px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  border: 5px solid;
  border-color: #fffc00 transparent;
  border-left: none;
  border-right: none;
  animation-name: loader__rings_animation;
  animation-duration: 0.9s;
  animation-iteration-count: infinite;
}
.loader__inner-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 5px solid;
  border-color: transparent cyan;
  border-top: none;
  border-bottom: none;
  animation-name: loader__rings_animation;
  animation-duration: 0.9s;
  animation-iteration-count: infinite;
}
.loader__inner-ring2 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 65px;
  height: 65px;
  border-radius: 50%;
  border: 5px solid;
  border-left: none;
  border-right: none;
  border-color: #fffc00 transparent;
  animation-name: loader__rings_animation;
  animation-duration: 0.9s;
  animation-iteration-count: infinite;
}
.loader__logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  animation-name: logo-scale;
  animation-duration: 0.9s;
  animation-iteration-count: infinite;
}
.loader__text {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
}
.loader__dots {
  position: relative;
  margin-bottom: 5px;
  align-self: end;
  left: 1.2rem;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #9880ff;
  color: #9880ff;
  animation: loader__dots 1s infinite linear alternate;
  animation-delay: 0.5s;
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
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #9880ff;
  color: #9880ff;
  animation: loader__dots 1s infinite alternate;
  animation-delay: 0s;
}

.loader__dots::after {
  left: 9px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #9880ff;
  color: #9880ff;
  animation: loader__dots 1s infinite alternate;
  animation-delay: 1s;
}

@keyframes loader__dots-animation {
  0% {
    background-color: #9880ff;
  }
  50%,
  100% {
    background-color: #ebe6ff;
  }
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

@keyframes loader__text-dots-animation {
  0% {
    width: 6.5rem;
  }
  45% {
    width: 7rem;
  }
  90% {
    width: 7.5rem;
  }
}
</style>
