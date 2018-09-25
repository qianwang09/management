<template>
    <div class="login-wrap">
        <div class="ms-title">Worktime Management</div>
        <div class="ms-login">
            <el-form :model="LoginUser" :rules="rules" ref="LoginUser" label-width="0px" class="demo-ruleForm" v-loading="loading">
                <el-form-item prop="Name">
                    <el-input v-model="LoginUser.Name" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="Password">
                    <el-input type="password" placeholder="password" v-model="LoginUser.Password" @keyup.enter.native="submitForm('LoginUser')"></el-input>
                </el-form-item>
                 <el-alert v-if="LoginValidateFailed"
                  title="Username or password error"
                  type="error">
                </el-alert>
                <div class="box">
                  <!-- <el-checkbox size="small"  class="rememberUser" v-model="RememberUser"></el-checkbox><span class="rememberUserLabel">七天内免登陆</span> -->
                  <el-button type="text" class="forgetPassword" @click="forgetPassword">Forget password?</el-button>
                </div>

                <div class="login-btn" style="margin-top:10px;">
                    <el-button type="primary" @click="submitForm('LoginUser')">Login</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;">Tips : admin/user/reviewer/approver  123。</p>
            </el-form>
        </div>

        <el-dialog title="ResetPassword" :visible.sync="ShowResetPassword" width="40%">
            <el-form ref="ResetPassword" :model="ResetInfo" label-width="100px">
                <el-form-item label="Name">
                    <el-input v-model="ResetInfo.Name"></el-input>
                </el-form-item>
                <!-- <el-form-item label="Email">
                 <el-input v-model="ResetInfo.Email"></el-input>
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="ShowResetPassword = false"> Cancel </el-button>
                <el-button type="primary" @click="ResetPassword"> ResetPassword </el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
export default {
  data: function() {
    return {
      Url: "api/Users",
      RememberUser: false,
      LoginValidateFailed: false,
      ShowResetPassword: false,
      ResetInfo: { Name: "", Email: "" },
      LoginUser: {
        Name: "",
        Password: ""
      },
      User: null,
      loading: false,
      rules: {
        Name: [
          { required: true, message: "Please input username", trigger: "blur" }
        ],
        Password: [
          { required: true, message: "Please input password ", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.LoginValidateFailed = false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          var queryStr =
            "?Name=" +
            this.LoginUser.Name +
            "&Password=" +
            this.LoginUser.Password;
          this.$axios
            .get(this.$root.HostURL + this.Url + queryStr)
            .then(res => {
              this.loading = false
              if (res.status == 200 || res.statusText == "OK") {
                if (
                  res.data.Name == this.LoginUser.Name &&
                  res.data.Password == this.LoginUser.Password
                ) {
                  localStorage.setItem("Name", res.data.Name);
                  localStorage.setItem("Password", res.data.Password);
                  debugger;
                  this.user = res.data;
                  this.$root.user = res.data;

                  // if(this.RememberUser){
                  //   var Now = new Date();
                  //   var ValidDate = new Date(Now.setDate(Now.getDate() + 7))
                  //   localStorage.setItem("ValidDate", ValidDate);
                  // }else{
                  //   localStorage.removeItem("ValidDate")
                  // }
                  if (res.data && res.data.Role) {
                    if (res.data.Role.Name.toLowerCase() == "admin") {
                      this.$router.push("/workingHourApproval");
                    } else if (res.data.Role.Name.toLowerCase() == "user") {
                      this.$router.push("/myWorkingHour");
                    } else if (res.data.Role.Name.toLowerCase() == "approver") {
                      this.$router.push("/myWorkingHour");
                    } else if (res.data.Role.Name.toLowerCase() == "reviewer") {
                      this.$router.push("/report");
                    }
                  } else {
                    this.$router.push("/Login");
                  }

                  // this.$router.push("/Login");
                } else {
                  this.LoginValidateFailed = true;
                  this.$notify.error({
                    title: "Login error",
                    message: "Username or password error, please input again!"
                  });
                }
              } else {
                this.$notify.error({
                  title: "Login error",
                  message:
                    "Login authentication failed, please double-check and input again!"
                });
              }
            });
        } else {
          this.loading = false
          this.LoginValidateFailed = true;
          console.log("error submit!!");
          return false;
        }
      });
    },
    forgetPassword() {
      this.ShowResetPassword = true;
    },
    ResetPassword() {
      if (!this.ResetInfo.Name) {
        this.$message.error(`Name is required!`);
        return;
      }
      // if (!this.ResetInfo.Email) {
      //   this.$message.error(`Email is required!`);
      //   return;
      // }
      this.$axios
        .get(
          this.$root.HostURL +
            this.Url +
            "/ResetPassword" +
            "?name=" +
            this.ResetInfo.Name +
            "&&email=" +
            this.ResetInfo.Email
        )
        .then(res => {
          if (res.status == 200 || res.statusText == "OK") {
            var result = res.data;
            this.ShowResetPassword = false;
            if (result.Status == -1) {
              this.$message.error(
                `User don't exist. Please check name and email.`
              );
            } else if (result.Status == 0) {
              this.$message.error(
                `Send reset email fail. Please try again later.`
              );
            } else if (result.Status == 1) {
              this.$message.success(
                `Success. Please check the new password in your email.`
              );
            }
          }
        });
    }
  },
  created: function() {
    this.LoginUser.Name = localStorage.getItem("Name");
    var ValidateStr = localStorage.getItem("ValidDate");
    if (ValidateStr && new Date() < new Date(ValidateStr)) {
      this.LoginUser.Password = localStorage.getItem("Password");
    }
  }
};
</script>

<style scoped>
.box {
  overflow: hidden;
}

.box .rememberUser {
  float: left;
  padding: 9px;
}
.box .rememberUserLabel {
  float: left;
  font-size: 12px;
  padding: 9px 0;
  color: #999;
}
.box .forgetPassword {
  float: right;
}
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
  height: 220px;
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
