import VueCookies from 'vue-cookies'

import client from '@js/client'
import resources from '@js/resources'

const tenant = {
  namespaced: true,
  state: {
    id: null,
    name: '',
    domain: VueCookies.get('tenant_domain') || '',
    imageUrl: null,
    description: null,
    planType: null,
    planExpiredAt: null,
    tenants: [],
  },
  getters: {
    tenantIsSelected: state => {
      return state.domain && state.domain.length > 0;
    },
    getImageUrl: state => {
      if (state.imageUrl && state.imageUrl.length > 0) {
        return state.imageUrl;
      }
      return "//:0";
    },
    getTenantDomain: state => state.domain,
  },
  mutations: {
    selectTenant (state, { name, domain, description, }) {
      state.domain = domain;
      VueCookies.set('tenant_domain', domain);
    },
    setTenant (state, { id, name, domain, description, imageUrl, planType }) {
      state.id = id;
      state.name = name;
      state.domain = domain;
      state.description = description;
      state.imageUrl = imageUrl;
      state.planType = planType;
      VueCookies.set('tenant_domain', domain);
    },
    setTenants (state, { tenants, }) {
      state.tenants = tenants;
    },
    clearTenant (state) {
      VueCookies.remove('tenant_domain');
      state.id = null;
      state.name = '';
      state.domain = '';
      state.imageUrl = null;
      state.description = '';
      state.planType = null;
      state.tenants = [];
    },
  },
  actions: {
    async getUserTenants (ctx) {
      const userId = ctx.rootGetters['user/getUserId'];
      const res = await client.get(resources.users + `${userId}/tenants/`);
      await ctx.commit('setTenants', { tenants: res.data['tenants'], });
      return res;
    },
    async getTenant (ctx, { domain, }) {
      const res = await client.get(resources.tenants + `${domain}/`);
      await ctx.commit('setTenant', {
          id: res.data.id,
          'name': res.data.name,
          'domain': res.data.domain,
          'description': res.data.description,
          'imageUrl': res.data.image,
          'planType': res.data.plan_type,
          'planExpiredAt': res.data.plan_expired_at,
      });
      return res;
    },
  },
};

export default tenant;
