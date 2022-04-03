<template>
  <div :id="IdAttributes.ABOUT_SECTION">
    <svg
      class="about__svg-wave"
      viewBox="0 0 1308 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1H1307V25.6685C1244.5 9.57126 1091.7 -12.9649 980.5 25.6685C869.3 64.3019 716.5 41.7658 654 25.6685C591.5 9.57126 438.7 -12.9649 327.5 25.6685C216.3 64.3019 63.5 41.7658 1 25.6685V1Z"
        fill="#024564"
        stroke="#024564"
      />
    </svg>
    <section
      class="mt-4 d-flex flex-column aboutSection__section"
      data-test="home-about-section"
    >
      <h2 class="f-5 text-center">{{ $t("global.about") }}</h2>
      <v-row class="mx-2 pb-4">
        <v-col cols="12" class="d-flex align-center justify-center">
          <svg
            :id="IdAttributes.SALMON_SVG"
            class="my-4 about-svg__salmon"
            viewBox="0 0 249 252"
            fill="none"
          >
            <path
              :id="IdAttributes.SALMON_PATH"
              pathLength="1"
              d=""
              stroke="#024564"
              stroke-width="10"
            ></path>
          </svg>
        </v-col>
        <v-col cols="12" md="5" class="mt-4 d-flex flex-column" tag="article">
          <h3 class="f-2 text-center">This is an about page</h3>
          <v-img :src="require('@/assets/fishTanks.png')" alt="test image" />
          <p class="f-15 text-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley
          </p>
        </v-col>
        <v-spacer />
        <v-col cols="12" md="5" class="mt-4 d-flex flex-column" tag="article">
          <h3 class="f-2 text-center">This is an about page</h3>
          <v-img :src="require('@/assets/fishTanks.png')" alt="test image" />
          <p class="f-15 text-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley
          </p>
        </v-col>
        <v-col cols="12" md="5" class="mt-4 d-flex flex-column" tag="article">
          <h3 class="f-2 text-center">This is an about page</h3>
          <v-img :src="require('@/assets/fishTanks.png')" alt="test image" />
          <p class="f-15 text-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley
          </p>
        </v-col>
        <v-spacer />
        <v-col cols="12" md="5" class="mt-4 d-flex flex-column" tag="article">
          <h3 class="f-2 text-center">This is an about page</h3>
          <v-img :src="require('@/assets/fishTanks.png')" alt="test image" />
          <p class="f-15 text-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley
          </p>
        </v-col>
        <v-col
          cols="12"
          class="d-flex flex-column flex-sm-row align-center justify-center"
        >
          <i18n-t
            keypath="auth.clickHereToSignUp"
            tag="p"
            class="f-2"
            scope="global"
          >
            <template #button>
              <v-btn
                color="blue"
                class="f-15 mr-4"
                @click="redirectAndScrollToSignUpForm"
                v-t="'global.clickHere'"
              />
            </template>
          </i18n-t>
        </v-col>
      </v-row>
    </section>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { RoutesNames } from "@/constants/routesNames/RoutesNames";
import { IdAttributes } from "@/constants/IdAttributes";
import { useRouter } from "vue-router";

const salmonPath =
  "M222.991 12.5873C208.484 2.73994 131.951 -3.16842 75.427 31.7896M75.427 31.7896C-22.6153 35.2362 23.9047 67.2401 24.9052 67.7325M75.427 31.7896C52.4172 50.4996 -68.1349 135.187 70.9251 244C77.4279 230.542 87.4322 200.672 75.427 188.855C105.44 169.16 106.441 139.571 101.438 142.572C48.9157 174.084 31.9085 141.588 28.4068 129.278C29.7408 130.305 33.9092 134.401 39.9118 142.572C47.4151 152.786 -4.10721 142.572 168.467 79.0569C176.471 90.8737 172.369 118.364 137.954 114.015M170.968 79.0569C180.527 74.4814 193.84 67.593 206.484 60.1027M206.484 60.1027C226.041 48.5173 244 35.4921 244 27.3584C237.33 34.999 220.49 52.2447 206.484 60.1027ZM206.484 60.1027L203.525 54.4386M203.525 54.4386L201.982 51.4844C186.475 56.5722 156.762 57.9836 161.965 22.9271C158.825 35.5645 162.741 59.5592 203.525 54.4386ZM203.525 54.4386C203.511 45.0836 205.683 24.995 214.487 19.4805";
const router = useRouter();

function drawSvgPath() {
  const path = document.getElementById(
    IdAttributes.SALMON_PATH
  ) as unknown as SVGPathElement;
  path.style.strokeDasharray = "1 1";
  path.setAttribute("d", salmonPath);
  path.classList.add("salmonAnimation");
}
const observer = new IntersectionObserver(
  (entries, observer) => {
    if (entries[0].isIntersecting) {
      drawSvgPath();
      observer.unobserve(entries[0].target);
    }
  },
  { threshold: 1, rootMargin: "0px 0px -150px 0px" }
);

async function redirectAndScrollToSignUpForm() {
  await router.push({ name: RoutesNames.SIGN_UP });
  //due to router transition signUpForm is not  rendered after immediate call and route change, so interval assure correct scrolling to signUp Form
  const scrollInterval = setInterval(() => {
    const signUpForm = document.getElementById(IdAttributes.SIGN_UP_FORM);
    if (signUpForm) {
      signUpForm.scrollIntoView({ behavior: "smooth" });
      clearInterval(scrollInterval);
    }
  }, 550);
}

onMounted(() => {
  const salmonSvg = document.getElementById(
    IdAttributes.SALMON_SVG
  ) as HTMLElement;
  observer.observe(salmonSvg);
});
</script>
<style lang="scss">
.about {
  margin-top: 15rem;
}

.about__svg-wave {
  position: relative;
  top: -0.2rem;
  width: 200%;
  animation: wave 3s linear infinite;
}
.aboutSection__section {
  position: relative;
  min-height: 100rem;
  // for some reason (maybe because dynamic imports img or some sort of lazy-loading)
  // when components mounts function scrollIntoView doesnt scroll to properly view because window height doesnt represnt full component height,
  // the height updates to proper value already after scroll - on this point setting min-height should resolve problem
}
.about-svg__salmon {
  width: clamp(10rem, 40%, 15rem);
}

.salmonAnimation {
  animation: salmonAnim 5s ease-out;
}
@media (min-width: 960px) {
  .about-svg__salmon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
@keyframes salmonAnim {
  from {
    stroke-dashoffset: 1;
  }
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes wave {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
