import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import { store } from './store';
import LoginForm from './components/LoginForm';
import DiaryNav from './components/DiaryNav'
import DiaryWrite from './components/DiaryWrite';
import DiaryList from './components/DiaryList';
import ListByNo from './components/ListByNo';

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'   //npm install url-loader --save-dev을 통해서 url-loader 설치                                                                    
import locale from 'element-ui/lib/locale/lang/ko'

Vue.use(ElementUI, { locale }) 
Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: LoginForm },
        {
            path: '/diary',
            component: DiaryNav,
            children: [
                { path: '/', component: DiaryList },
                { path: 'write/:no?', component: DiaryWrite},    //no파라미터로 수정 게시글 번호 받음
                { path: ':no', component: ListByNo, props:true }
            ]
        }
    ]
})

new Vue({
    el: '#app',
    store: store,
    render: h => h(App),
    router
})