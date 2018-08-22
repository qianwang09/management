<template>
    <div>
        <div class="container">
            <div class="form-box">
                <el-form ref="user" :model="user" label-width="140px">
                    <el-form-item label="UserName">
                        <el-input v-model="user.Name" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="Role">
                        <el-input v-model="user.Role.Name" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="Level">
                        <el-input v-model="user.Level"  :disabled="true">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="Team">
                        <el-input v-model="user.Team.Name" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="Approver">
                        <el-input v-model="user.Team.Approver" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="Email">
                        <el-input v-model="user.Email" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="Status">
                        <el-input v-model="user.Status" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="EffectiveDate">
                        <el-input v-model="user.EffectiveDate" :disabled="true"></el-input>
                    </el-form-item>
                     <el-form-item label="ExpiryDate">
                        <el-input v-model="user.ExpiryDate" :disabled="true"></el-input>
                    </el-form-item>
                    <div v-if="ShowPassword">
                     <!-- <el-form-item label="Origin Password">
                        <el-input  v-model="user.Password" :disabled="true"></el-input>
                    </el-form-item> -->
                    <el-form-item label="New Password">
                        <el-input type="password"  v-model="newPassword" ></el-input>
                    </el-form-item>
                    <el-form-item label="Repeat Password">
                        <el-input type="password"  v-model="newPassword2" ></el-input>
                    </el-form-item>
                    </div>
                    <el-form-item>
                        <el-button type="primary" @click="ChangeShowPassword()" v-if="!ShowPassword">Change Password</el-button>
                        <el-button type="primary" @click="SubmitShowPassword()" v-if="ShowPassword">Submit</el-button>
                        <el-button type="primary" @click="ShowPassword=false" v-if="ShowPassword">Back</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
export default {
  name: "MyInformation",
  data: function() {
    return {
      Url: 'api/Users',
      ShowPassword: false,
      newPassword: '',
      newPassword2: '',
    //   user: null
    };
  },
   computed: {
    user() {
        if(this.$root.user){
            return this.$root.user
        }else{
            return {
            Id: 0,
            Name: '',
            Password: '',
            Tel: '',
            Email: '',
            Level: '',
            Status: '',
            Team: {Name:'', Approver: ''},
            Role: {Name:''},
            EffectiveDate: '',
            ExpiryDate: ''
        }
        }

    }
  },
  methods: {
    onSubmit() {
      this.$message.success("submit successfully");
    },
    ChangeShowPassword(){
        this.ShowPassword = !this.ShowPassword
    },
    SubmitShowPassword(){
        //  public int Id { get; set; }
        // public string Name { get; set; }
        // public string Password { get; set; }
        // public string Tel { get; set; }
        // public string Email { get; set; }
        // public string Level { get; set; }
        // public string Status { get; set; }
        // public string Team { get; set; }
        // public string Role { get; set; } // user  approver reviewer admin
        // public DateTime? EffectiveDate { get; set; }
        // public DateTime? ExpiryDate { get; set; }
        if(this.newPassword != this.newPassword2){
            this.$message.error("Password is not same");
            return
        }
        var currentUser = {
            Id: this.user.Id,
            Name: this.user.Name,
            Password: this.newPassword,
            Tel: this.user.Tel,
            Email: this.user.Email,
            Level: this.user.Level,
            Status: this.user.Status,
            Team: this.user.Team.Name,
            Role: this.user.Role.Name,
            EffectiveDate: this.user.EffectiveDate,
            ExpiryDate: this.user.ExpiryDate
        }
        this.$axios({
        method: "put",
        url: this.$root.HostURL + this.Url + "/" + this.user.Id +'?page=MyInformation',
        data: currentUser
        }).then(res => {

        if (res.status == 204) {
          this.$message.success(`Update password successfully!`);
        } else {
          this.$message.error(`Update password failed!`);
        }
      });

    }
  },
  created: function(){
    //   debugger
    //   if(this.$root.user){
    //       this.user = this.$root.user
    //   }
  }
};
</script>
