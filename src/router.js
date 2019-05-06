import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

import { AmplifyEventBus } from "aws-amplify-vue";
import * as AmplifyModules from "aws-amplify";
import { AmplifyPlugin } from "aws-amplify-vue";

Vue.use(Router);
Vue.use(AmplifyPlugin, AmplifyModules);

let user;

getUser().then(user => {
  if (user) {
    router.push({ path: "/" });
  }
});
AmplifyEventBus.$on("authState", async state => {
  // console.log(state);
  if (state === "signedOut") {
    user = null;
    router.push({ path: "/login" });
  } else if (state === "signedIn") {
    user = await getUser();
    // console.log(user);
    router.push({ path: "/" });
  }
});

function getUser() {
  return Vue.prototype.$Amplify.Auth.currentAuthenticatedUser()
    .then(data => {
      if (data && data.signInUserSession) {
        return data;
      }
    })
    .catch(() => {
      return null;
    });
}

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/prefs",
      name: "prefs",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Prefs.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Login.vue")
    }
  ]
});

router.beforeResolve(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    user = await getUser();
    // console.log(user);
    if (!user) {
      return next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    }
    return next();
  }
  return next();
});

export default router;
