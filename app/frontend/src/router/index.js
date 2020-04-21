import NProgress from 'nprogress';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: { name: 'Home' }
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import(/* webpackChunkName: "admin" */ '@/views/Admin.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/404',
      alias: '*',
      name: 'NotFound',
      component: () => import(/* webpackChunkName: "not-found" */ '@/views/NotFound.vue')
    }
  ]
});

router.beforeEach((to, _from, next) => {
  NProgress.start();
  if (to.matched.some(route => route.meta.requiresAuth)
    && router.app.$keycloak
    && router.app.$keycloak.ready
    && !router.app.$keycloak.authenticated) {
    const redirect = location.origin + location.pathname + '#' + to.path;
    const loginUrl = router.app.$keycloak.createLoginUrl({ redirectUri: redirect });
    window.location.replace(loginUrl);
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
