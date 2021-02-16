import client from '@js/client'
import resources from '@js/resources'
import { camelKeyToSnakeKey, snakeKeyToCamelKey, } from '@js/str-utils'

const editableProperties = {
  firstName: '',
  lastName: '',
  email: '',
  imageUrl: '',
  languageCode: '',
  timezoneCode: '',
  disablePromotion: false,
}

const user = {
  namespaced: true,
  state: {
    initialized: false,
    id: null,
    ...editableProperties,
  },
  getters: {
    getUserId: state => state.id,
    getImageUrl: state => {
      if (state.imageUrl && state.imageUrl.length > 0) {
        return state.imageUrl;
      }
      return state.initialized ? require('@img/user.png') : "//:0";
    },
  },
  mutations: {
    setUser (state, payload) {
      const properties = ['id', ...Object.keys(editableProperties)];
      properties.forEach(function (prop) {
        if (prop in payload && prop in state) {
          state[prop] = payload[prop];
        }
      });
    },
    initialized (state) {
      state.initialized = true;
    },
    clearUser (state) {
      state.initialized = false;
      state.id = null;
      for (const key in editableProperties) {
        state[key] = editableProperties[key];
      }
    },
  },
  actions: {
    async getUser (ctx) {
      const res = await client.get(resources.users + `${0}/`);
      await ctx.commit('setUser', snakeKeyToCamelKey(res.data));
      return res;
    },
    async updateUser (ctx, payload) {
      const res = await client.put(
          resources.users + `${ctx.state.id}/`,
          camelKeyToSnakeKey(payload));
      await ctx.commit('setUser', payload);
      return res;
    },
    async updatePassword (ctx, { password, newPassword }) {
      const payload = {
        password: password,
        new_password: newPassword,
      };
      const res = await client.put(
          resources.users + `${ctx.state.id}/password/`, payload);
      return res;
    },
    async updateImage (ctx, { formData }) {
      const res = await client.put(
          resources.users + `${ctx.state.id}/`, formData,
          { headers: { 'Content-Type': 'multipart/form-data', } });
      await ctx.commit('setUser', { imageUrl: res.data.image });
      return res;
    },
    async deleteUserImage (ctx) {
      const formData = new FormData();
      const empty = new File([''], '')
      formData.append('image', empty, '')
      const res = await client.put(
          resources.users + `${ctx.state.id}/`, formData,
          { headers: { 'Content-Type': 'multipart/form-data', } });
      await ctx.commit('setUser', { imageUrl: '', });
      return res;
    },
  },
};

export default user;
