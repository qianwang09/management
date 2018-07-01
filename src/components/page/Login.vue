<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                 <el-alert v-if="loginValidateFailed"
    title="用户名或密码错误"
    type="error">
  </el-alert>
                <div class="login-btn" style="margin-top:10px;">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;">Tips : admin/user  123。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      loginValidateFailed: false,
      userUrl: "/static/users.json",
      ruleForm: {
        username: "admin",
        password: "123"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.loginValidateFailed = false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.get(this.userUrl).then(res => {
            debugger;
            if (res.status == 200 || res.statusText == "OK")
              var users = res.data;
            var that = this;
            users.forEach(user => {
              if (
                user.username == that.ruleForm.username &&
                user.password == that.ruleForm.password
              ) {
                localStorage.setItem("ms_username", user.username);
                localStorage.setItem("ms_role", user.role);
                this.$router.push("/");
              }
            });

            this.loginValidateFailed = true;
            // this.$notify.error({
            //   title: "登陆错误",
            //   message: "用户名或密码错误，请确认后重新输入"
            // });
          });
        } else {
          this.loginValidateFailed = true;
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 180px;
  margin: -150px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
}
</style>