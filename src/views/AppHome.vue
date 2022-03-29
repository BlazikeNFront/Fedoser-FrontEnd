<template>
  <div class="d-flex flex-column">
    <div class="d-flex flex-column">
      <div class="user-greetings d-flex">
        <div class="user-greetings__text d-flex flex-column">
          <h2>Hello, {{ email }}!</h2>
          <p>Welcome back to Fedoser</p>
        </div>
        <div class="user-greetings__image"></div>
      </div>
      <div
        class="d-flex"
        style="
          margin-top: 2rem;
          justify-content: space-around;
          align-items: flex-start;
        "
      >
        <section>
          <h3>News</h3>
          <single-news
            v-for="(article, index) in articlePLaceholder"
            :key="index"
            :article="article"
          />
        </section>
        <aside>
          <h3 class="text-center">Todays actions</h3>
          <ul>
            <li class="d-flex">
              <h4>Tank name</h4>
              <button>Take action</button>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/UserStore";
import SingleNews from "@/components/views/home/SingleNews.vue";
const { email } = storeToRefs(useUserStore());
const articlePLaceholder = [
  {
    header: "Article header",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    header: "Article header",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    header: "Article header",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];
</script>
<style lang="scss" scoped>
.overlay {
  margin: 0 auto;
  width: 100%;
}
.user-greetings {
  background-color: $tertiary-color;
  width: clamp(20rem, 90%, 55rem);
  border-radius: 25px;

  color: white;
  justify-content: space-between;
  p {
    margin-top: 1rem;
  }
  &__text {
    width: 62%;
    padding: 3rem 2rem;
  }
  &__image {
    width: 38%;
    height: 100%;
    border-radius: 25px;
    background-image: url("../assets/fishTanks.png");
    background-size: contain;
  }
}
section {
  text-align: center;
  width: clamp(15rem, 90%, 70rem);
}
h3 {
  margin: 2rem;
}
li {
  padding: 1rem 3rem;
  border-radius: 20px;
  background-color: $secondary-color;
  color: $main-background-color;
  h4 {
    margin-right: 3rem;
  }
  button {
    background-color: $forth-color;
    color: $main-background-color;
  }
}
</style>
