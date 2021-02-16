import Vue from 'vue'
import VueRouter from 'vue-router'

import guards from '@router/guards'
import routes from '@router/routes'

Vue.use(VueRouter);

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  guards(to, from, next);
});

export default router;
