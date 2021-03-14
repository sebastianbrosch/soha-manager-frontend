import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import("../views/Dashboard.vue")

  },
  {
    path: "/software",
    name: "Software",
    component: () => import("../views/Software.vue"),
    // async beforeEnter(to, from, next) {
    //   if (store.getters.GetUserToken()) {
    //     next();
    //   } else {
    //     next({
    //       name: "SignIn"
    //     })
    //   }
    // }
  },
  {
    path: "/software/new",
    name: "SoftwareNew",
    component: () => import("../views/SoftwareDetails.vue")
  },
  {
    path: "/software/edit/:id",
    name: "SoftwareEdit",
    component: () => import("../views/SoftwareDetails.vue")
  },
  {
    path: "/hardware",
    name: "Hardware",
    component: () => import("../views/Hardware.vue")
  },
  {
    path: "/hardware/new",
    name: "HardwareNew",
    component: () => import("../views/HardwareDetails.vue")
  },
  {
    path: "/hardware/edit/:id",
    name: "HardwareEdit",
    component: () => import("../views/HardwareDetails.vue")
  },
  {
    path: '/users',
    name: 'User',
    component: () => import('../views/User.vue')
  },
  {
    path: '/user/new',
    name: 'UserNew',
    component: () => import("../views/UserDetails.vue")
  },
  {
    path: '/user/edit/:id',
    name: 'UserEdit',
    component: () => import('../views/UserDetails.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../views/Authentication.vue'),
    props: { type: 'signup' }
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('../views/Authentication.vue'),
    props: { type: 'signin' }
  },
  {
    path: '/search-barcode',
    name: 'SearchBarcode',
    component: () => import('../views/SearchBarcode.vue'),
  },
  {
    path: '/users/:id/profile',
    name: 'UserProfile',
    component: () => import('../views/UserProfile.vue'),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
