<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>

                <template v-for="item in rolemenus">
                    <template v-if="item.subs">
                        <el-submenu :index="item.index" :key="item.index">
                            <template slot="title">
                                <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                            </template>
                            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </el-submenu>
                    </template>
                    <template v-else>
                        <el-menu-item :index="item.index" :key="item.index">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </el-menu-item>
                    </template>
                </template>

        </el-menu>
    </div>
</template>

<script>
import bus from "../common/bus";
export default {
  data() {
    return {
      role: "",
      collapse: false,
      items: [
        {
          icon: "el-icon-setting",
          index: "dashboard",
          title: "Dashboard"
        },
        // {
        //   icon: "el-icon-time",
        //   index: "worktime",
        //   title: "Worktime"
        // },
        // {
        //   icon: "el-icon-date",
        //   index: "costmanagement",
        //   title: "成本管理",
        //   subs: [
        //     {
        //       index: "directcost",
        //       title: "直接成本"
        //     },
        //     {
        //       index: "managementcost",
        //       title: "管理成本"
        //     },
        //     {
        //       index: "operationcost",
        //       title: "运营成本"
        //     }
        //   ]
        // },
        // {
        //   icon: "el-icon-tickets",
        //   index: "process",
        //   title: "Process"
        // },
        {
          icon: "el-icon-document",
          index: "costcenter",
          title: "CostCenter"
        },
        {
          icon: "el-icon-document",
          index: "organization",
          title: "Organization"
        },
        {
          icon: "el-icon-news",
          index: "role",
          title: "Role"
        },
        {
          icon: "el-icon-service",
          index: "user",
          title: "User"
        },
        // {
        //     icon: 'el-icon-tickets',
        //     index: 'table',
        //     title: '基础表格'
        // },
        // {
        //   icon: "el-icon-message",
        //   index: "tabs",
        //   title: "消息管理"
        // },
        // {
        //   icon: "el-icon-date",
        //   index: "4",
        //   title: "表单相关",
        //   subs: [
        //     {
        //       index: "form",
        //       title: "基本表单"
        //     },
        //     {
        //       index: "editor",
        //       title: "富文本编辑器"
        //     },
        //     {
        //       index: "markdown",
        //       title: "markdown编辑器"
        //     },
        //     {
        //       index: "upload",
        //       title: "文件上传"
        //     }
        //   ]
        // },
        // {
        //   icon: "el-icon-star-on",
        //   index: "charts",
        //   title: "Report"
        // }
        // {
        //     icon: 'el-icon-rank',
        //     index: 'drag',
        //     title: '拖拽列表'
        // },
        // {
        //     icon: 'el-icon-warning',
        //     index: 'permission',
        //     title: '权限测试'
        // },
        // {
        //     icon: 'el-icon-error',
        //     index: '404',
        //     title: '404页面'
        // }
      ],
      itemsUser: [
        {
          icon: "el-icon-setting",
          index: "dashboard",
          title: "Home"
        },
        {
          icon: "el-icon-tickets",
          index: "myInfo",
          title: "My Information"
        },
        {
          icon: "el-icon-time",
          index: "worktime",
          title: "Worktime"
        },
        {
          icon: "el-icon-tickets",
          index: "favorites",
          title: "Favorites"
        },
        {
          icon: "el-icon-star-on",
          index: "charts",
          title: "Monthly Report"
        }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    },
    rolemenus() {
        if(this.$root.user != null && this.$root.user.Role.Name == 'Admin'){
            return this.items;
        }else{
            return this.itemsUser
        }
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    }),
      (this.role = localStorage.getItem("Name"));
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
