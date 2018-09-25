<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="plus" class="handle-del mr10 right"  @click="handleAdd"> Add </el-button>
                <div class="clear"></div>
            </div>
            <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <!-- <el-table-column prop="Id" label="Id"  class-name="hiddenColumn" min-width="60"> </el-table-column> -->
                <el-table-column prop="Name" label="Team Name" sortable  min-width="100"> </el-table-column>               
                <el-table-column prop="CostCenter" label="CostCenter" sortable min-width="100"> </el-table-column>
                <el-table-column prop="Approver" label="Approver" sortable min-width="100"> </el-table-column>
                <el-table-column prop="Status" label="Status" sortable min-width="100"> </el-table-column>
                <el-table-column label="Effective Date" sortable min-width="160">
                  <template slot-scope="scope"> {{ formatDate(scope.row.EffectiveDate) }} </template>
                </el-table-column>
                <el-table-column label="Expiry Date" sortable min-width="160">
                  <template slot-scope="scope"> {{ formatDate(scope.row.ExpiryDate) }} </template>
                </el-table-column>
                <el-table-column label="Operation"   min-width="100">
                    <template slot-scope="scope">
                        <el-button size="small" type="primary"  @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    </template>
                </el-table-column>
            </el-table>          
        </div>

        <!-- Add popup -->
        <el-dialog title="Add" :visible.sync="addVisible" width="40%">
            <el-form ref="addForm" :model="addForm" label-width="100px">
                <el-form-item label="Team Name">
                    <el-input v-model="addForm.Name"></el-input>
                </el-form-item>
                <el-form-item label="Cost Center">
                 <el-select v-model="addForm.CostCenter" placeholder="Select costCenter" class="handle-select mr20">
                    <el-option v-for="cc in allCostCenters" :key="cc.Name" :label="cc.Name" :value="cc.Name"></el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="Approver">
                    <!-- <el-input v-model="addForm.Approver"></el-input> -->
                    <el-autocomplete  class="inline-input"  v-model="addForm.Approver" :fetch-suggestions="addSearch" placeholder="Input name"  @select="handleAddSelect"></el-autocomplete>
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
               <el-form-item label="Team Name">
                    <el-input v-model="editForm.Name"></el-input>
                </el-form-item>
                <el-form-item label="Cost Center">
                 <el-select v-model="editForm.CostCenter" placeholder="Select costCenter" class="handle-select mr20">
                    <el-option v-for="cc in allCostCenters" :key="cc.Name" :label="cc.Name" :value="cc.Name"></el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="Approver">
                    <el-autocomplete  class="inline-input"  v-model="editForm.Approver" :fetch-suggestions="editSearch" placeholder="Input name"  @select="handleEditSelect"></el-autocomplete>
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
    </div>
</template>

<script>
export default {
  name: "UserManagement",
  data() {
    return {
      // url: './static/vuetable.json',
      Url: "api/Teams",
      UrlCostCenter: "api/CostCenters?status=Active",
      UrlUser: "api/Users?status=Active",
      allCostCenters: [],
      allUser: [],
      tableData: [],
      multipleSelection: [],
      deleteList: [],
      addVisible: false,
      editVisible: false,
      deleteVisible: false,
      addForm: {
        Id: 0,
        Name: "",
        CostCenter: "",
        Approver: "",
        Status: this.StatusList[0],
        EffectiveDate: "",
        ExpiryDate: ""
      },
      editForm: {
        Name: "",
        CostCenter: "",
        Approver: "",
        Status: "",
        EffectiveDate: "",
        ExpiryDate: ""
      },
      deleteForm: {},
      currentIndex: -1
    };
  },
  created() {
    this.getData();
    this.getCostCenters();
    this.getUsers();
  },
  computed: {
    data() {
      return this.tableData;
    }
  },
  methods: {
    // 获取 easy-mock 的模拟数据
    getData() {
      this.$axios.get(this.$root.HostURL + this.Url).then(res => {
        if (res.status == 200 || res.statusText == "OK") {
          this.tableData = res.data;
        }
      });
    },
    getCostCenters() {
      this.$axios.get(this.$root.HostURL + this.UrlCostCenter).then(res => {
        if (res.status == 200 || res.statusText == "OK") {
          this.allCostCenters = res.data;
        }
      });
    },
    getUsers() {
      this.$axios.get(this.$root.HostURL + this.UrlUser).then(res => {
        debugger;
        if (res.status == 200 || res.statusText == "OK") {
          // this.allUser = res.data;
          if (res.data && res.data.length > 0) {
            for (var j = 0, len = res.data.length; j < len; j++) {
              this.allUser.push({ value: res.data[j].Name });
            }
          }
        }
      });
    },
    handleAdd() {
      this.addVisible = true;
    },
    addSearch(queryString, cb) {
      debugger;
      var users = this.allUser;
      var results = queryString ? users.filter(u => u.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1) : users;
      cb(results)
    },
    handleAddSelect(item) {
      console.log(item);
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
          // this.tableData.push(res.data);
          this.getData();
          this.addForm ={
            Id: 0,
            Name: "",
            CostCenter: "",
            Approver: "",
            Status: this.StatusList[0],
            EffectiveDate: "",
            ExpiryDate: ""
          }
          this.$message.success(`Add record successfully!`);
        } else {
          this.$message.error(`Add record failed!`);
        }
      }).catch(res => {
          this.$message.error(res.response.data.Message)
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
    editSearch(queryString, cb) {
      debugger;
      var users = this.allUser;
      var results = queryString ? users.filter(u => u.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1) : users;
      cb(results)
    },
    handleEditSelect(item) {
      console.log(item);
    },
    editSave() {
      this.editForm.OperationTime = new Date();
      this.$axios({
        method: "put",
        url: this.$root.HostURL + this.Url + "/" + this.editForm.Id,
        data: this.editForm
      }).then(res => {
        debugger;
        this.editVisible = false;
        if (res.status == 204) {
          this.getData();
          this.$message.success(`Edit record successfully!`);
        } else {
          this.$message.error(`Edit record failed!`);
        }
      });
    },
    handleDelete(index, row) {
      this.currentIndex = index;
      this.deleteForm = this.tableData[index];
      this.deleteVisible = true;
    },
    // 确定删除
    deleteSave() {
      this.deleteForm.Status = "Deleted";
      this.deleteForm.OperationTime = new Date();
      this.$axios({
        method: "put",
        url: this.$root.HostURL + this.Url + "/" + this.deleteForm.Id,
        data: this.deleteForm
      }).then(res => {
        debugger;
        this.deleteVisible = false;
        if (res.status == 204) {
          this.getData();
          this.$message.success(`Delete record successfully!`);
        } else {
          this.$message.error(`Delete record failed!`);
        }
      });
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
