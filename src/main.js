import Vue from 'vue';
import axios from 'axios';

import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

const axiosInstance = axios.create ({
  baseURL: 'https://newsapi.org/v2/',
  headers: {
    Authorization: '0c886cc8d75b46b4822d6418525117ab'
  },
});

Vue.prototype.$axios = axiosInstance;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
