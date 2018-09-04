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
      itemsAdmin: [
        // {
        //   icon: "el-icon-setting",
        //   index: "dashboard",
        //   title: "Dashboard"
        // },
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
          index: "standardWorkingHour",
          title: "StandardWorkingHour"
        },
        {
          icon: "el-icon-document",
          index: "costcenter",
          title: "CostCenter"
        },
        {
          icon: "el-icon-document",
          index: "team",
          title: "Team"
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

        {
          icon: "el-icon-document",
          index: "8",
          title: "Process Management",
          subs: [
            {
              index: "function",
              title: "Function"
            },
            {
              index: "category",
              title: "Category"
            },
            {
              index: "process",
              title: "Process"
            },
            {
              index: "subprocess",
              title: "SubProcess"
            },
            {
              index: "country",
              title: "Country"
            },
            {
              index: "OHallocation",
              title: "OH Allocation"
            },
            {
              index: "core",
              title: "Core"
            },
            {
              index: "processManagement",
              title: "Process Management"
            }
          ]
        },
         {
          icon: "el-icon-service",
          index: "approvalStatus",
          title: "Approval Status"
        },

      ],
      itemsUser: [
        // {
        //   icon: "el-icon-setting",
        //   index: "dashboard",
        //   title: "Home"
        // },
        {
          icon: "el-icon-tickets",
          index: "myInformation",
          title: "My Information"
        },

        {
          icon: "el-icon-tickets",
          index: "myProcess",
          title: "My Process"
        },
        {
          icon: "el-icon-time",
          index: "myWorkingHour",
          title: "Working Hour"
        },
        {
          icon: "el-icon-time",
          index: "myApprove",
          title: "Approve"
        }

        // {
        //   icon: "el-icon-tickets",
        //   index: "tabs",
        //   title: "tabs"
        // },
        // {
        //   icon: "el-icon-star-on",
        //   index: "charts",
        //   title: "Monthly Report"
        // }
      ],
      itemsApprover: [
        // {
        //   icon: "el-icon-setting",
        //   index: "dashboard",
        //   title: "Home"
        // },
        {
          icon: "el-icon-tickets",
          index: "myInformation",
          title: "My Information"
        },

        {
          icon: "el-icon-tickets",
          index: "myProcess",
          title: "My Process"
        },
        {
          icon: "el-icon-time",
          index: "myWorkingHour",
          title: "Working Hour"
        },
        {
          icon: "el-icon-time",
          index: "myApprove",
          title: "Approve"
        },
        // {
        //   icon: "el-icon-star-on",
        //   index: "charts",
        //   title: "Monthly Report"
        // }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    },
    rolemenus() {
        if(this.$root.user != null && this.$root.user.Role && this.$root.user.Role.Name == 'Admin'){
            return this.itemsAdmin;
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
