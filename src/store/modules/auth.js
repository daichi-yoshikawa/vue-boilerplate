import axios from 'axios'
import HttpStatus from 'http-status-codes'
import VueCookies from 'vue-cookies'

import client from '@js/client'
import publicClient from '@js/public-client'
import resources from '@js/resources'

function getExpiresAt (expires_in) {
  const now = new Date().getTime();
  return now + expires_in * 1000;
}

const auth = {
  namespaced: true,
  state: {
    access_token: VueCookies.get('access_token') || null,
    refresh_token: VueCookies.get('refresh_token') || null,
    access_expires_at: VueCookies.get('access_expires_at') || null,
    refresh_expires_at: VueCookies.get('refresh_expires_at') || null,
  },
  getters: {
    accessTokenExpired: (state) => {
      if (!state.access_expires_at | !state.access_token) {
        return true;
      }
      return new Date().getTime() >= state.access_expires_at;
    },
    refreshTokenExpired: (state) => {
      if (!state.refresh_expires_at | !state.refresh_token) {
        return true;
      }
      return new Date().getTime() >= state.refresh_expires_at;
    },
  },
  mutations: {
    setAccessToken (state, { access_token, access_expires_at }) {
      state.access_token = access_token;
      state.access_expires_at = access_expires_at;
      VueCookies.set('access_token', access_token);
      VueCookies.set('access_expires_at', access_expires_at)
      axios.defaults.headers.common['Authorization'] = access_token;
    },
    setRefreshToken (state, { refresh_token, refresh_expires_at }) {
      state.refresh_token = refresh_token;
      state.refresh_expires_at = refresh_expires_at;
      VueCookies.set('refresh_token', refresh_token);
      VueCookies.set('refresh_expires_at', refresh_expires_at);
    },
    clearAccessToken (state) {
      state.access_token = null;
      state.access_expires_at = null;
      VueCookies.remove('access_token');
      VueCookies.remove('access_expires_at');
    },
    clearRefreshToken (state) {
      state.refresh_token = null;
      state.refresh_expires_at = null;
      VueCookies.remove('refresh_token');
      VueCookies.remove('refresh_expires_at');
    },
  },
  actions: {
    async login (ctx, userData) {
      await ctx.commit('clearAccessToken');
      await ctx.commit('clearRefreshToken');
      const res = await publicClient.post(resources.token, userData);
      await ctx.commit('setAccessToken', {
          access_token: res.data['access'],
          access_expires_at: getExpiresAt(res.data['access_expires_in']),
      });
      await ctx.commit('setRefreshToken', {
          refresh_token: res.data['refresh'],
          refresh_expires_at: getExpiresAt(res.data['refresh_expires_in']),
      });
      return res;
    },
    async verifyAccessToken (ctx) {
      const res = await client.post(resources.tokenToVerify);
    },
    async refreshAccessToken (ctx) {
      const payload = { refresh: ctx.state.refresh_token };
      const res = await publicClient.post(resources.tokenToRefresh, payload);
      await ctx.commit('setAccessToken', {
          access_token: res.data['access'],
          access_expires_at: getExpiresAt(res.data['access_expires_in']),
      });
      return res;
    },
    async logout (ctx) {
      const payload = { "refresh": ctx.state.refresh_token };
      const res = await client.post(resources.tokenToRevoke, payload);
      await ctx.commit('clearAccessToken');
      await ctx.commit('clearRefreshToken');
      await ctx.commit('user/clearUser', null, { root: true });
      await ctx.commit('tenant/clearTenant', null, { root: true });
      await ctx.commit('tenantUser/clearTenantUser', null, { root: true });
    },
  },
};

export default auth;
