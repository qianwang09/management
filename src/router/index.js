import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode:'history',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },      
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: 'Home' },
            children:[
                // {
                //     path: '/dashboard',
                //     component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                //     meta: { title: 'dashboard' }
                // },
                {
                    path: '/standardWorkingHour',
                    component: resolve => require(['../components/page/StandardWorkingHour.vue'], resolve),
                    meta: { title: 'StandardWorkingHour' }
                },
                {
                    path: '/myInformation',
                    component: resolve => require(['../components/page/MyInformation.vue'], resolve),
                    meta: { title: 'My Informaton' }
                },
                {
                    path: '/myProcess',
                    component: resolve => require(['../components/page/MyProcess.vue'], resolve),
                    meta: { title: 'My Process' }
                },
                {
                    path: '/myWorkingHour',
                    component: resolve => require(['../components/page/MyWorkingHour.vue'], resolve),
                    meta: { title: 'Working Hour' }
                },
                {
                    path: '/myApprove',
                    component: resolve => require(['../components/page/MyApprove.vue'], resolve),
                    meta: { title: 'Approve' }
                },
                {
                    path: '/workingHourApproval',
                    component: resolve => require(['../components/page/WorkingHourApproval.vue'], resolve),
                    meta: { title: 'Approval Status' }
                },
                // {
                //     path: '/directcost',
                //     component: resolve => require(['../components/page/CostDirect.vue'], resolve),
                //     meta: { title: 'Direct Cost' }
                // },
                // {
                //     path: '/managementcost',
                //     component: resolve => require(['../components/page/CostManagement.vue'], resolve),
                //     meta: { title: 'Management Cost' }
                // },
                // {
                //     path: '/operationcost',
                //     component: resolve => require(['../components/page/CostOperation.vue'], resolve),
                //     meta: { title: 'Operation Cost' }
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
                    meta: { title: 'processManagement' }
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
                    path: '/myTeam',
                    component: resolve => require(['../components/page/MyTeam.vue'], resolve),
                    meta: { title: 'My Team' }
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
                    path: '/report',
                    component: resolve => require(['../components/page/Report.vue'], resolve),
                    meta: { title: 'Report' }
                },
                {
                    path: '/reportApprover',
                    component: resolve => require(['../components/page/ReportApprover.vue'], resolve),
                    meta: { title: 'Report' }
                },
                {
                    path: '/reportUser',
                    component: resolve => require(['../components/page/ReportUser.vue'], resolve),
                    meta: { title: 'Report' }
                },
                
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
            redirect: '/login'
        }
    ]
})
