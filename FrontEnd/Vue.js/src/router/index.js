import Vue from 'vue'
import Router from 'vue-router'
const _import = file => require('../views/' + file + '.vue')


Vue.use(Router);

export const RouterList = [
    { path: '/login', component: _import('login/index'), hidden: true },
];
/*使用RouterList指定路由指向*/
export default new Router({
    routes: RouterList
})
