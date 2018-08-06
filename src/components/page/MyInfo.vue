<template>
    <div>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>基本表单</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class="container">
            <div class="form-box">
                <el-form ref="user" :model="user" label-width="120px">
                    <el-form-item label="UserName">
                        <el-input v-model="user.LoginName" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="Level">
                        <el-select v-model="user.Level" placeholder="Please select" :disabled="true">
                            <el-option key="1" label="1" value="1"></el-option>
                            <el-option key="2" label="2" value="2"></el-option>
                            <el-option key="3" label="3" value="3"></el-option>
                            <el-option key="4" label="4" value="4"></el-option>
                            <el-option key="5" label="5" value="5"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Email">
                        <el-input v-model="user.Email" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="Status">
                        <el-input v-model="user.Status" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="CreationTime">
                        <el-input v-model="user.CreationTime" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="Organiztion">
                        <el-input v-model="user.Organiztion.Name" :disabled="true"></el-input>
                    </el-form-item>

                    <el-form-item label="Role">
                        <el-input v-model="user.Role.Name" :disabled="true"></el-input>
                    </el-form-item>
                    <div v-if="ShowPassword">
                     <el-form-item label="Origin Password">
                        <el-input type="password" v-model="user.Passord" ></el-input>
                    </el-form-item>
                    <el-form-item label="New Password">
                        <el-input type="password"  v-model="user.NewPassword" ></el-input>
                    </el-form-item>
                    <el-form-item label="New Password">
                        <el-input type="password"  v-model="user.NewPassword" ></el-input>
                    </el-form-item>
                    </div>
                    <el-form-item>
                        <el-button type="primary" @click="ChangeShowPassword()" v-if="!ShowPassword">Change Passord</el-button>
                        <el-button type="primary" @click="SubmitShowPassword()" v-if="ShowPassword">Submit</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
export default {
  name: "MyInfo",
  data: function() {
    return {
      options: [
        {
          value: "guangdong",
          label: "广东省",
          children: [
            {
              value: "guangzhou",
              label: "广州市",
              children: [
                {
                  value: "tianhe",
                  label: "天河区"
                },
                {
                  value: "haizhu",
                  label: "海珠区"
                }
              ]
            },
            {
              value: "dongguan",
              label: "东莞市",
              children: [
                {
                  value: "changan",
                  label: "长安镇"
                },
                {
                  value: "humen",
                  label: "虎门镇"
                }
              ]
            }
          ]
        },
        {
          value: "hunan",
          label: "湖南省",
          children: [
            {
              value: "changsha",
              label: "长沙市",
              children: [
                {
                  value: "yuelu",
                  label: "岳麓区"
                }
              ]
            }
          ]
        }
      ],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: true,
        type: ["步步高"],
        resource: "小天才",
        desc: "",
        options: []
      },
      ShowPassword: false,
      user: null
    };
  },
  methods: {
    onSubmit() {
      this.$message.success("提交成功！");
    },
    ChangeShowPassword(){
        this.ShowPassword = !this.ShowPassword
    }
  },
  created: function(){
      debugger
      if(this.$root.user){
          this.user = this.$root.user
      }
  }
};
</script>
