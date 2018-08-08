<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="plus" class="handle-del mr10 right"  @click="handleAdd"> Add </el-button>
            </div>
            <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection" width="55"></el-table-column> -->
                <el-table-column prop="Id" label="Id"  class-name="hiddenColumn" width="80">
                </el-table-column>
                <el-table-column prop="LoginName" label="Name" sortable  width="150">
                </el-table-column>
                <el-table-column prop="Password" label="Password" sortable width="150">
                </el-table-column>
                <el-table-column prop="Email" label="Email" sortable width="150">
                </el-table-column>
                <el-table-column prop="Level" label="Level" sortable width="80">
                </el-table-column>    
                <el-table-column prop="RoleId" label="Role" sortable width="100">
                </el-table-column>          
                <el-table-column prop="Status" label="Status" sortable width="100">
                </el-table-column>
                  <el-table-column prop="OperationTime" label="Creation Time" sortable width="200">
                </el-table-column>               
                <!-- <el-table-column prop="OperationTime" label="Operation Time" >
                </el-table-column> -->
                <el-table-column label="Operation" >
                    <template slot-scope="scope">
                        <el-button size="small" type="primary"  @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)" :disabled='isDeleted(scope.row)'>Delete</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>

        <!-- Add popup -->
        <el-dialog title="Add" :visible.sync="addVisible" width="40%">
            <el-form ref="addForm" :model="addForm" label-width="100px">
                <el-form-item label="Name">
                    <el-input v-model="addForm.LoginName"></el-input>
                </el-form-item>
                <el-form-item label="Password">
                    <el-input v-model="addForm.Password"></el-input>
                </el-form-item>
                <el-form-item label="Email">
                    <el-input v-model="addForm.Email"></el-input>
                </el-form-item>
                <el-form-item label="Level">
                    <el-input v-model="addForm.Level"></el-input>
                </el-form-item>
                <el-form-item label="Role">
                    <el-input v-model="addForm.RoleId"></el-input>
                </el-form-item>
                <el-form-item label="Status">
                 <el-select v-model="addForm.Status" placeholder="Select status" class="handle-select mr10">
                    <el-option key="Active" label="Active" value="Active"></el-option>
                    <el-option key="Deleted" label="Deleted" value="Deleted"></el-option>
                </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false"> Cancel </el-button>
                <el-button type="primary" @click="addSave"> Save </el-button>
            </span>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog title="Edit" :visible.sync="editVisible" width="40%">
            <el-form ref="editForm" :model="editForm" label-width="100px">
               <el-form-item label="Name">
                    <el-input v-model="editForm.LoginName"></el-input>
                </el-form-item>
                <el-form-item label="Password">
                    <el-input v-model="editForm.Password"></el-input>
                </el-form-item>
                <el-form-item label="Email">
                    <el-input v-model="editForm.Email"></el-input>
                </el-form-item>
                <el-form-item label="Level">
                    <el-input v-model="editForm.Level"></el-input>
                </el-form-item>
                <el-form-item label="Role">
                    <el-input v-model="editForm.RoleId"></el-input>
                </el-form-item>
                <el-form-item label="Status">
                 <el-select v-model="editForm.Status" placeholder="Status" class="handle-select mr10">
                    <el-option key="Active" label="Active" value="Active"></el-option>
                    <el-option key="Deleted" label="Deleted" value="Deleted"></el-option>
                </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false"> Cancel</el-button>
                <el-button type="primary" @click="editSave"> Edit </el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="deleteVisible" width="300px" center>
            <div class="del-dialog-cnt">Are you sure to delete？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteVisible = false"> Cancel </el-button>
                <el-button type="primary" @click="deleteSave"> Delete </el-button>
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
      tableData: [],
      multipleSelection: [],
      deleteList: [],
      addVisible: false,
      editVisible: false,
      deleteVisible: false,
      addForm: {
        Id: 0,
        LoginName: "",
        Password: "",
        Email: "",
        Level: "",
        RoleId: "",
        Status: "Active",
        OperationTime: ""
      },
      editForm: {
        Id: 0,
        LoginName: "",
        Password: "",
        Email: "",
        Level: "",
        RoleId: "",
        Status: "",
        OperationTime: ""
      },
      deleteForm: {},
      currentIndex: -1
    };
  },
  created() {
    this.getData();
  },
  computed: {
    data() {
      return this.tableData;
    }
  },
  methods: {
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    },
    // 获取 easy-mock 的模拟数据
    getData() {
      this.$axios.get(this.$root.HostURL + this.Url).then(res => {
        debugger;
        if (res.status == 200 || res.statusText == "OK") {
          this.tableData = res.data;
        }
      });
    },

    handleAdd() {
      this.addVisible = true;
    },
    addSave() {
      //   this.$axios.post(this.$root.HostURL + this.Url, this.addForm).then(res => {
      //       debugger
      //   })
      this.addForm.OperationTime = new Date();
      this.$axios({
        method: "post",
        url: this.$root.HostURL + this.Url,
        data: this.addForm
      }).then(res => {
        this.addVisible = false;
        if (res.status == 201) {
          this.tableData.push(res.data);
          this.$message.success(`Add record successfully!`);
        } else {
          this.$message.error(`Add record failed!`);
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

    isDeleted(item){
        if(item.Status == 'Deleted'){
            return true
        }
        return false
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 10px;
}

.handle-select {
  width: 120px;
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
