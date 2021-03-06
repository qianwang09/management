import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import VueAxios from 'vue-axios'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI, { locale })

Vue.use(VueAxios, axios)
Vue.use(ElementUI, { size: 'small' })
Vue.prototype.$axios = axios
Vue.prototype.StatusList = ['Active', 'Inactive']
Vue.prototype.formatDate =  dateStr => {
    if (dateStr) {
      return dateStr.substring(0, 10);
    } else {
      return "";
    }
  }
  Vue.prototype.formatDateYM =  dateStr => {
    if (dateStr) {
      var date = new Date(dateStr)
      var month = date.getMonth() + 1
      return date.getFullYear() + '-' + (month < 10 ? '0' + month : month)
    } else {
      return "";
    }
  }
  Vue.prototype.getMonthName =  (month, nameLength) => {
    var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var monthName
    if(month){
        monthName = monthNames[Number.parseInt(month)]
    }else{
        if(month == 0){
            monthName = monthNames[0]
        }else{
            monthName = getMonthName[(new Date()).getMonth()]
        }
    }
    if(nameLength){
        monthName = monthName.substring(0, Number.parseInt(nameLength))
    }
    return monthName
  }
 
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const Name = localStorage.getItem('Name');
    const Password = localStorage.getItem('Password');
    const ValidDate = localStorage.getItem('ValidDate');
    var that = this
    var Logined = false
    if(Name && Password && (ValidDate == null || (ValidDate != null && new Date() < new Date(ValidDate)))){
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
            //HostURL:'http://localhost:9999/',
            user: null
        }
    }
}).$mount('#app');
