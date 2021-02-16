import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import HttpStatus from 'http-status-codes'

import store from '@store/store'

const client = axios.create(
  {
    baseURL: process.env.VUE_APP_API_SERVER_BASE_URL + ':' + process.env.VUE_APP_API_SERVER_PORT,
  }
);

async function refreshAuthCall(failedRequest) {
  try {
    const res = await store.dispatch('auth/refreshAccessToken');
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
}

client.interceptors.request.use(request => {
  const access_token = store.state.auth.access_token;

  if(request.data) {
    if(request.data.refreshAccessToken) {
      console.log('Send refresh access token request.');
      return request;
    }
  }

  if(access_token) {
    request.headers['Authorization'] = `Bearer ${access_token}`;
  }

  return request;
});

const axiosAuthRefreshOptions = {
  pauseInstanceWhileRefreshing: false,
  statusCodes: [401, 403, 500],
};

createAuthRefreshInterceptor(client, refreshAuthCall, axiosAuthRefreshOptions);

export default client;
