import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueI18n from 'vue-i18n';
import messages from "./lang";

Vue.config.productionTip = false;

Vue.use(VueI18n);
export const i18n = new VueI18n({
  locale: 'de',
  fallbackLocale: 'de',
  messages
});

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");