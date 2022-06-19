import Vue from 'vue';
import App from './App.vue';
import { message1, message2 } from './data-1';
import func from './data-2';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

// func(message1);
// func(message2);
