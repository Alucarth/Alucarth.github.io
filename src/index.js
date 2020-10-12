// import './style.css';

import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './components/App.vue';

// import 'vuetify/dist/vuetify.min.css';

// Vue.use(Vuetify);

const opts = {};

export default new Vuetify(opts);

console.log('Powered by Vue ');

// eslint-disable-next-line no-unused-vars
const app = new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  components: { App },
  created() {
    this.$vuetify.theme.dark = false;
  },
});
