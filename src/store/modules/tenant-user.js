import client from '@js/client'
import resources from '@js/resources'

const tenantUser = {
  namespaced: true,
  state: {
    id: null,
    jobCategory: '',
    title: '',
    description: '',
    disableEmailNotification: false,
    roleType: null,
  },
  mutations: {
    setTenantUser (state, { id, jobCategory, title, description, disableEmailNotification, roleType, }) {
      state.id = id;
      state.jobCategory = jobCategory;
      state.title = title;
      state.description = description;
      state.disableEmailNotification = disableEmailNotification;
      state.roleType = roleType;
    },
    clearTenantUser (state) {
      state.id = null;
      state.jobCategory = '';
      state.title = '';
      state.description = '';
      state.disableEmailNotification = false;
      state.roleType = null;
    },
  },
  actions: {
    async getTenantUser (ctx, { tenantDomain, }) {
      const res = await client.get(
          resources.tenants + `${tenantDomain}/users/0/`);
      const payload = await {
          id: res.data.id,
          jobCategory: res.data.job_category ? res.data.job_category.data : '',
          title: res.data.title,
          description: res.data.description,
          disableEmailNotification: res.data.disable_email_notification,
          roleType: res.data.role_type,
      };
      await ctx.commit('setTenantUser', payload);
      return res;
    },
  },
}

export default tenantUser;
