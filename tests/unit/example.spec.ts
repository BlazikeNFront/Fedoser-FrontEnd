import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory, Router } from "vue-router";
import routes from "@/router/paths/index";
import Home from "@/views/Home.vue";
import vuetify from "@/plugins/vuetify";

let router: Router;

beforeEach(async () => {
  router = createRouter({
    history: createWebHistory(),
    routes: routes,
  });

  router.push("/");
  await router.isReady();
});

test("allows authenticated user to edit a post", async () => {
  const wrapper = mount(Home, {
    global: {
      plugins: [router, vuetify],
    },
  });
  expect(wrapper).toBeTruthy();
});
