import store from '@store/store'

function tenantGuard (to, from, next) {
  if (to.matched.some(record => record.meta.requireTenant)) {
    if (!store.getters['tenant/tenantIsSelected']) {
      next({ name: 'tenant-login' });
    }
  }
  next();
}

const guards = async (to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    try {
      if (store.getters['auth/refreshTokenExpired']) {
        throw 'Refresh token is expired.';
      }
      if (store.getters['auth/accessTokenExpired']) {
        const res = await store.dispatch('auth/refreshAccessToken');
        await guards (to, from, next);
      } else {
        tenantGuard(to, from, next);
      }
    } catch (error) {
      console.error(error);
      next({ name: 'login' });
    }
  }
  next();
}

export default guards;
