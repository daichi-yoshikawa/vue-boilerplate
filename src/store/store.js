import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@store/modules/auth'
import tenant from '@store/modules/tenant'
import tenantUser from '@store/modules/tenant-user'
import user from '@store/modules/user'
import window from '@store/modules/window'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    tenant,
    tenantUser,
    user,
    window,
  },
});

export default store;
