import axios from 'axios'

const client = axios.create(
  {
    baseURL: process.env.VUE_APP_API_SERVER_BASE_URL + ':' + process.env.VUE_APP_API_SERVER_PORT,
  }
);

client.defaults.headers.common['Content-Type'] = 'application/json';


export default client;
