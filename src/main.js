import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.use(ElementUI, { size: 'small' });
Vue.prototype.$axios = axios;

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    debugger
    const LoginName = localStorage.getItem('LoginName');
    const Password = localStorage.getItem('Password');
    const ValidDate = localStorage.getItem('ValidDate');
    var that = this
    var Logined = false
    if(LoginName && Password && (ValidDate == null || (ValidDate != null && new Date() < new Date(ValidDate)))){
        Logined = true
    }

    if(!Logined && to.path !== '/login'){
        next('/login');
    }else if(to.meta.permission){
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    }else{
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if(navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor'){
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        }else{
            next();
        }
    }
})

new Vue({
    router,
    render: h => h(App),
    data(){
        return {
            HostURL:'/',
            // HostURL:'http://localhost:9999/',
            user: null
        }
    }
}).$mount('#app');
