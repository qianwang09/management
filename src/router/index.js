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
            meta: { title: 'Home' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: 'dashboard' }
                },
                {
                    path: '/worktime',
                    component: resolve => require(['../components/page/WorktimeManagement.vue'], resolve),
                    meta: { title: 'Worktime' }
                },
                {
                    path: '/myInfo',
                    component: resolve => require(['../components/page/MyInfo.vue'], resolve),
                    meta: { title: 'My Informaton' }
                },
                {
                    path: '/directcost',
                    component: resolve => require(['../components/page/CostDirect.vue'], resolve),
                    meta: { title: 'Direct Cost' }
                },
                {
                    path: '/managementcost',
                    component: resolve => require(['../components/page/CostManagement.vue'], resolve),
                    meta: { title: 'Management Cost' }
                },
                {
                    path: '/operationcost',
                    component: resolve => require(['../components/page/CostOperation.vue'], resolve),
                    meta: { title: 'Operation Cost' }
                },
                // {
                //     path: '/process',
                //     component: resolve => require(['../components/page/ProcessManagement.vue'], resolve),
                //     meta: { title: 'Process Management' }
                // },
                {
                    path: '/function',
                    component: resolve => require(['../components/page/ProcessFunction.vue'], resolve),
                    meta: { title: 'Process Function' }
                },
                {
                    path: '/category',
                    component: resolve => require(['../components/page/ProcessCategory.vue'], resolve),
                    meta: { title: 'Process Category' }
                },
                {
                    path: '/process',
                    component: resolve => require(['../components/page/ProcessType.vue'], resolve),
                    meta: { title: 'Process' }
                },
                {
                    path: '/subprocess',
                    component: resolve => require(['../components/page/ProcessSubType.vue'], resolve),
                    meta: { title: 'SubProcess' }
                },
                {
                    path: '/country',
                    component: resolve => require(['../components/page/ProcessCountry.vue'], resolve),
                    meta: { title: 'Country' }
                },
                {
                    path: '/OHallocation',
                    component: resolve => require(['../components/page/ProcessOHAllocation.vue'], resolve),
                    meta: { title: 'Process OH Allocation' }
                },
                {
                    path: '/core',
                    component: resolve => require(['../components/page/ProcessCore.vue'], resolve),
                    meta: { title: 'Core"' }
                },
                {
                    path: '/processManagement',
                    component: resolve => require(['../components/page/ProcessManagement.vue'], resolve),
                    meta: { title: 'Process Management' }
                },
                {
                    path: '/favorites',
                    component: resolve => require(['../components/page/FavoritesManagement.vue'], resolve),
                    meta: { title: 'Favorites' }
                },
                {
                    path: '/costcenter',
                    component: resolve => require(['../components/page/CostCenter.vue'], resolve),
                    meta: { title: 'CostCenter' }
                },
                {
                    path: '/Team',
                    component: resolve => require(['../components/page/Team.vue'], resolve),
                    meta: { title: 'Team' }
                },
                {
                    path: '/role',
                    component: resolve => require(['../components/page/Role.vue'], resolve),
                    meta: { title: 'Role' }
                },
                {
                    path: '/User',
                    component: resolve => require(['../components/page/User.vue'], resolve),
                    meta: { title: 'User' }
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
            redirect: '/Dashboard'
        }
    ]
})
