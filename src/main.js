import Vue from 'vue'
import VueCookies from 'vue-cookies'
import VueI18n from 'vue-i18n'
import VueModal from 'vue-js-modal'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
import { sync } from 'vuex-router-sync'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import App from '@/app'
import messages from '@js/i18n/messages'
import router from '@router/router'
import store from '@store/store'

Vue.use(VueCookies);
Vue.use(VueI18n);
Vue.use(VueModal);
Vue.use(BootstrapVue);
sync(store, router);

library.add(fas);
library.add(fab);
library.add(far);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.$cookies.config({ expires: '7d', secure: true });
Vue.config.productionTip = false

const i18n = new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: messages,
});

new Vue({
  el: '#app',
  i18n: i18n,
  router: router,
  store: store,
  render: h => h(App),
  mounted: function () {
    this.$store.state.window.width = window.innerWidth;
    this.$store.state.window.height = window.innerHeight;

    window.addEventListener('resize', () => {
      clearTimeout(this.$store.state.window.timer);
      this.$store.state.window.timer = setTimeout(() => {
          this.$store.state.window.width = window.innerWidth;
          this.$store.state.window.height = window.innerHeight;
        }, 200);
    });
  },
});
