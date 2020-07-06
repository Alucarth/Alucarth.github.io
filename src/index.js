import './style.css';
import Vue from 'vue';
import App from './components/App.vue';

console.log('Powered by Vue ');

// eslint-disable-next-line no-unused-vars
const app = new Vue({
  el: '#app',
  components: { App },
});
