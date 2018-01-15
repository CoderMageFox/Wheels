import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './styles/styles.scss'
import router from './router/index.js'

Vue.use(ElementUI);

new Vue({
  el: '#app',
    store,
    router,
  render: h => h(App)
});



