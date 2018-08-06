import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode:'history',
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/worktime',
                    component: resolve => require(['../components/page/WorktimeManagement.vue'], resolve),
                    meta: { title: '工时管理' }
                },
                {
                    path: '/myInfo',
                    component: resolve => require(['../components/page/MyInfo.vue'], resolve),
                    meta: { title: 'My Informaton' }
                },
                {
                    path: '/directcost',
                    component: resolve => require(['../components/page/CostDirect.vue'], resolve),
                    meta: { title: '直接成本' }
                },
                {
                    path: '/managementcost',
                    component: resolve => require(['../components/page/CostManagement.vue'], resolve),
                    meta: { title: '管理成本' }
                },
                {
                    path: '/operationcost',
                    component: resolve => require(['../components/page/CostOperation.vue'], resolve),
                    meta: { title: '运营成本' }
                },
                {
                    path: '/task',
                    component: resolve => require(['../components/page/TaskManagement.vue'], resolve),
                    meta: { title: '任务管理' }
                },
                {
                    path: '/favorites',
                    component: resolve => require(['../components/page/FavoritesManagement.vue'], resolve),
                    meta: { title: '我的任务' }
                },
                {
                    path: '/organization',
                    component: resolve => require(['../components/page/OrganizationManagement.vue'], resolve),
                    meta: { title: '组织管理' }
                },
                {
                    path: '/role',
                    component: resolve => require(['../components/page/RoleManagement.vue'], resolve),
                    meta: { title: '角色管理' }
                },
                {
                    path: '/staff',
                    component: resolve => require(['../components/page/StaffManagement.vue'], resolve),
                    meta: { title: '员工管理' }
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
