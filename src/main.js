import Vue from 'vue'
import App from './App.vue'
import store from './store';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  data: {
    state: store.state,
  },
  methods: store.methods,
}).$mount('#app')
