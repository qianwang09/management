<template>
    <div class="table">
        <div class="container">
            <!-- <div class="handle-box">
                <el-button type="primary" icon="plus" class="handle-del mr10 right"  @click="handleAdd"> Add </el-button>
                <div class="clear"></div>
            </div> -->
             <div class="handle-box">
               
                <span style="padding-left:150px;"  class="tableInfoLeft">Name: </span> 
                <el-autocomplete v-model="userName" :fetch-suggestions="suggestedUsers" @select="handleSelect" :trigger-on-focus="false" size="small" placeholder="input userName" clearable>
                   <i style="padding-top:10px;"   class="el-icon-close"    slot="suffix"    @click="handleClearClick"></i>  
                  <template slot-scope="{ item }">
                    <div class="name">{{ item.value }}</div>
                  </template>
                </el-autocomplete>
                <span  style="padding-left:15px;"  class="tableInfoLeft">Team:</span>
                <el-select size="small" v-model="selectedTeam"  @change="teamChange()" placeholder="Select Team">                   
                  <el-option  key="allteam" label="All" value=""> </el-option> 
                  <el-option  v-for="item in allTeams"  :key="item.Name" :label="item.Name" :value="item.Name"> </el-option> 
                </el-select>
                <div class="right">                 
                  <el-button class="saveBtn" size="small"  type="primary" icon="plus"  @click="handleAdd"> Add </el-button>
                  <el-button class="saveBtn" size="small"  type="primary" icon="el-icon-download" @click="Export()">Export </el-button>
                </div>
                <div class="clear"></div>
            </div>
            <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <!-- <el-table-column prop="Id" label="Id" sortable  min-width="60"> </el-table-column> -->
                <el-table-column prop="Name" label="User Name" sortable   min-width="100"> </el-table-column>
                <el-table-column prop="Team" label="Team" sortable  min-width="100"> </el-table-column>
                <!-- <el-table-column prop="Email" label="Email" sortable  min-width="100"> </el-table-column> -->
                <el-table-column prop="Level" label="Level" sortable  min-width="80"> </el-table-column>
                <el-table-column prop="Role" label="Role" sortable  min-width="100"> </el-table-column>
                <el-table-column prop="Status" label="Status" min-width="100"></el-table-column>
                <el-table-column label="Effective Date" sortable min-width="120">
                  <template slot-scope="scope"> {{ formatDate(scope.row.EffectiveDate) }} </template>
                </el-table-column>
                <el-table-column label="Expiry Date" sortable min-width="120">
                  <template slot-scope="scope"> {{ formatDate(scope.row.ExpiryDate) }} </template>
                </el-table-column>
                <el-table-column label="Operation" min-width="160">
                    <template slot-scope="scope">
                        <el-button size="small" type="primary"  @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                        <el-button size="small" type="danger" @click="handleReset(scope.$index, scope.row)">Reset Password</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <div class="pagination">
                <el-pagination background  :total="total" :page-size.sync="pageSize" :page-sizes="[20, 50, 100, 200, 500]"  :current-page.sync="pageIndex"
                @current-change="handleCurrentChange"  @size-change="handleSizeChange"  layout="total, sizes, prev, pager, next">
                </el-pagination>
            </div> -->
        </div>

        <!-- Add popup -->
        <el-dialog title="Add" :visible.sync="addVisible" width="40%">
            <el-form ref="addForm" :model="addForm" label-width="100px">
                <el-form-item label="User Name">
                    <el-input v-model="addForm.Name"></el-input>
                </el-form-item>
                <el-form-item label="Password">
                    <el-input v-model="addForm.Password"></el-input>
                </el-form-item>
                <el-form-item label="Email">
                    <el-input v-model="addForm.Email"></el-input>
                </el-form-item>
                 <el-form-item label="Team Name">
                 <el-select v-model="addForm.Team" placeholder="Select Team" class="handle-select mr10">
                    <el-option v-for="team in allTeams" :key="team.Name" :label="team.Name" :value="team.Name"></el-option>
                </el-select>
                </el-form-item>
                 <el-form-item label="Level">
                 <el-select v-model="addForm.Level" placeholder="Select level" class="handle-select mr10">
                    <el-option v-for="level in allLevels" :key="level.Name" :label="level.Name" :value="level.Name"></el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="Role">
                 <el-select v-model="addForm.Role" placeholder="Select role" class="handle-select mr10">
                    <el-option v-for="role in allRoles" :key="role.Name" :label="role.Name" :value="role.Name"></el-option>
                </el-select>
                </el-form-item>

                <el-form-item label="Status">
                 <el-select v-model="addForm.Status" placeholder="Select status" class="handle-select mr10">
                    <el-option v-for="status in StatusList" :key="status" :label="status" :value="status"></el-option>
                </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false"> Cancel </el-button>
                <el-button type="primary" @click="addSave"> Save </el-button>
            </span>
        </el-dialog>

        <!-- edit popup -->
        <el-dialog title="Edit" :visible.sync="editVisible" width="40%">
            <el-form ref="editForm" :model="editForm" label-width="100px">
               <el-form-item label="Name">
                    <el-input v-model="editForm.Name" disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="Email">
                    <el-input v-model="editForm.Email"></el-input>
                </el-form-item>
                <el-form-item label="Team Name">
                  <el-select v-model="editForm.Team" placeholder="Select Team" class="handle-select mr10">
                      <el-option v-for="team in allTeams" :key="team.Name" :label="team.Name" :value="team.Name"></el-option>
                  </el-select>
                </el-form-item>
                 <el-form-item label="Level">
                 <el-select v-model="editForm.Level" placeholder="Select level" class="handle-select mr10">
                    <el-option v-for="level in allLevels" :key="level.Name" :label="level.Name" :value="level.Name"></el-option>
                </el-select>
                </el-form-item>

                <el-form-item label="Role">
                 <el-select v-model="editForm.Role" placeholder="Select role" class="handle-select mr10">
                    <el-option v-for="role in allRoles" :key="role.Name" :label="role.Name" :value="role.Name"></el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="Status">
                 <el-select v-model="editForm.Status" placeholder="Status" class="handle-select mr10">
                   <el-option v-for="status in StatusList" :key="status" :label="status" :value="status"></el-option>
                </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false"> Cancel</el-button>
                <el-button type="primary" @click="editSave"> Save </el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="Reset Password" :visible.sync="resetVisible" width="40%" center>
             <el-form ref="editForm" :model="editForm" label-width="100px">
               <el-form-item label="Password">
                    <el-input v-model="editForm.Password"></el-input>
                </el-form-item>
             </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetVisible = false"> Cancel </el-button>
                <el-button type="primary" @click="resetSave"> Save </el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: "UserManagement",
  data() {
    return {
      // url: './static/vuetable.json',
      Url: "api/Users",
      UrlRole: 'api/Roles',
      UrlLevel: 'api/Levels',
      UrlTeam: 'api/Teams',
      total: 5,
      pageSize: 20,
      pageIndex: 1,
      allRoles: [],
      allLevels: [],
      allTeams: [],
      selectedTeam: '',
      allSuggestedUser: [],
      userName: '',
      tableData: [],
      multipleSelection: [],
      deleteList: [],
      addVisible: false,
      editVisible: false,
      resetVisible: false,
      addForm: {
        Id: 0,
        Name: "",
        Password: "",
        Email: "",
        Team: '',
        Level: "",
        Role: "",
        Status: this.StatusList[0],
        EffectiveDate: "",
        ExpiryDate: ""
      },
      editForm: {
        Id: 0,
        Name: "",
        Password: "",
        Email: "",
        Team: '',
        Level: "",
        Role: "",
        Status: this.StatusList[0],
        EffectiveDate: "",
        ExpiryDate: ""
      },
      deleteForm: {},
      currentIndex: -1
    };
  },
  created() {
    this.getData();
    this.getRoles()
    this.getLevels()
    this.getTeams()
  },
  computed: {
    data() {
      return this.tableData;
    }
  },
  methods: {
    getData() {
      // var pageStr = '?pageIndex=' + (this.pageIndex-1)  + '&pageSize=' + this.pageSize
      // this.$axios.get(this.$root.HostURL + this.Url + pageStr).then(res => {        
      // var searchStr = '?userName=' + this.userName  + '&team=' + this.selectedTeam + '&Type=search'
      var conditions = {Name: this.userName, Team: this.selectedTeam}
      this.$axios.get(this.$root.HostURL + this.Url + '/Search', {
    params: {
      Name: this.userName,
      Team: this.selectedTeam
    }
  }).then(res => {
        if (res.status == 200 || res.statusText == "OK") {
          if(res.data.Status == 1){
            this.tableData = res.data.Results
            this.total = res.data.Total
            this.allSuggestedUser = []
            for(var i = 0; i < this.tableData.length; i++){
              this.allSuggestedUser.push({value: this.tableData[i].Name})
            }
          }
        }
      });
    },
    getRoles() {
      this.$axios.get(this.$root.HostURL + this.UrlRole).then(res => {
        if (res.status == 200 || res.statusText == "OK") {
          this.allRoles = res.data;
        }
      });
    },
    getLevels() {
      this.$axios.get(this.$root.HostURL + this.UrlLevel).then(res => {
        if (res.status == 200 || res.statusText == "OK") {
          this.allLevels = res.data;
        }
      });
    },
    getTeams() {
      this.$axios.get(this.$root.HostURL + this.UrlTeam).then(res => {
        if (res.status == 200 || res.statusText == "OK") {
          this.allTeams = res.data;
          this.allTeams.forEach(team => {
            // if(team.Name.indexOf('&')>0){
            //   debugger
            //   team.Name.replace(/&/, "&amp;")
            // }
            
          });
        }
      });
    },
    suggestedUsers(queryString, cb) {
        debugger
        var users = this.allSuggestedUser;
        var results = queryString ? users.filter((item) => { return item.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0}) : users;
        // 调用 callback 返回建议列表的数据
        cb(results);
    },
    handleSelect(item) {
        console.log(item);
        this.getData()
    },
    handleClearClick(){
      this.userName = ''
      this.getData()
    },
    teamChange(){
      this.getData()
    },
    handleAdd() {
      this.addVisible = true;
    },
    addSave() {
      this.addForm.OperationTime = new Date();
      this.$axios({
        method: "post",
        url: this.$root.HostURL + this.Url,
        data: this.addForm
      }).then(res => {
        this.addVisible = false;
        if (res.status == 201) {
          this.tableData.push(res.data);
          this.addForm = {
          Id: 0,
          Name: "",
          Password: "",
          Email: "",
          Team: '',
          Level: "",
          Role: "",
          Status: this.StatusList[0],
          EffectiveDate: "",
          ExpiryDate: ""
        }
          this.$message.success(`Add record successfully!`)
        } else {
          this.$message.error(`Add record failed!`)
        }
      }).catch(res => {
          this.$message.error(res.response.data.Message)
      });
    },
    Export(){
      this.$axios
        .get(
          this.$root.HostURL +
            this.Url + '/Export' +
            "?team=" +
            this.selectedTeam +
            "&&userName=" +
            this.userName,
            {
              responseType: 'arraybuffer',
            }
        )
        .then(res => {
          var blob = new Blob([res.data], { type: "application/vnd.ms-excel" }); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
          var downloadElement = document.createElement("a");
          var href = window.URL.createObjectURL(blob);
          downloadElement.href = href;
          var downloadName = "users.xlsx";
          downloadElement.download = downloadName;
          document.body.appendChild(downloadElement);
          if (!!window.ActiveXObject || "ActiveXObject" in window) {
            navigator.msSaveBlob(blob, downloadName);
          } else {
            downloadElement.click();
            document.body.removeChild(downloadElement);
            window.URL.revokeObjectURL(href);
          }
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
      this.currentIndex = index;
      const item = this.tableData[index];
      this.editForm = item;
      this.editVisible = true;
    },
    editSave() {
      this.editForm.OperationTime = new Date();
      this.$axios({
        method: "put",
        url: this.$root.HostURL + this.Url + "/" + this.editForm.Id,
        data: this.editForm
      }).then(res => {
        this.editVisible = false;
        debugger
        if (res.status == 200) {
          this.getData();
          this.$message.success(`Edit record successfully!`);
        } else {
          this.$message.error(`Edit record failed!`);
        }
      }).catch(res => {
          this.$message.error(res.response.data.Message)
      });
    },
    handleReset(index, row) {
      this.currentIndex = index;
      this.editForm = this.tableData[index];
      this.resetVisible = true;
    },
    // reset password
    resetSave() {
      this.$axios({
        method: "put",
        url: this.$root.HostURL + this.Url + "/" + this.editForm.Id,
        data: this.editForm
      }).then(res => {
        this.resetVisible = false;
        debugger
        if (res.status == 200) {
          this.getData();
          this.$message.success(`Reset password successfully!`);
        } else {
          this.$message.error(`Reset password failed!`);
        }
      });
    },

    // 分页导航
    handleCurrentChange(val) {
      console.log(val + 'pageIndex' + this.pageIndex);
      this.pageIndex = val
      this.getData()
      // this.cur_page = val;
      // this.getData();
    },
    handleSizeChange(val) {
      console.log('sizechange' + val + 'size'+ this.pageSize)
      this.pageSize = val
      if(this.pageSize * this.pageIndex > this.total){
        this.pageIndex = 1
      }
      this.getData()
    },
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 10px;
}

.handle-select {
  min-width: 160px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.hiddenColumn {
  display: none;
}
</style>
