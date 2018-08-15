<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="plus" class="handle-del mr10 right"  @click="handleAdd"> Add </el-button>
            </div>
            <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection" width="55"></el-table-column> -->
                <el-table-column prop="Id" label="Id" sortable class-name="hiddenColumn"  min-width="50">
                </el-table-column>
                <el-table-column prop="Name" label="Name" sortable min-width="50">
                </el-table-column>
                <el-table-column prop="Code" label="Code" sortable min-width="50">
                </el-table-column>
                <el-table-column prop="Coding" label="Coding" sortable min-width="50">
                </el-table-column>
                <el-table-column prop="Status" label="Status" sortable min-width="50">
                </el-table-column>
                <el-table-column label="CreationDate" sortable min-width="80">
                  <template slot-scope="scope"> {{ formatDate(scope.row.CreationDate) }} </template>
                </el-table-column>
                <el-table-column label="ExpirationDate" sortable min-width="80">
                  <template slot-scope="scope"> {{ formatDate(scope.row.ExpirationDate) }} </template>
                </el-table-column>
                <el-table-column label="Operation" >
                    <template slot-scope="scope">
                        <el-button size="small" type="primary"  @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                        <!-- <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)" :disabled='isDeleted(scope.row)'>Delete</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            <!-- <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div> -->
        </div>

        <!-- Add popup -->
        <el-dialog title="Add" :visible.sync="addVisible" width="30%">
            <el-form ref="addForm" :model="addForm" label-width="80px">
                <el-form-item label="Name">
                    <el-input v-model="addForm.Name"></el-input>
                </el-form-item>
                <el-form-item label="Code">
                    <el-input v-model="addForm.Code"></el-input>
                </el-form-item>
                <el-form-item label="Coding">
                    <el-input v-model="addForm.Coding"></el-input>
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
        <el-dialog title="Edit" :visible.sync="editVisible" width="30%">
            <el-form ref="editForm" :model="editForm" label-width="80px">
                <el-form-item label="Name">
                    <el-input v-model="editForm.Name"></el-input>
                </el-form-item>
                <el-form-item label="Code">
                    <el-input v-model="editForm.Code"></el-input>
                </el-form-item>
                <el-form-item label="Coding">
                    <el-input v-model="editForm.Coding"></el-input>
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
                <el-button type="primary" @click="editSave"> Save </el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: "basetable",
  data() {
    return {
      // url: './static/vuetable.json',
      Url: "api/ProcessCores",
      tableData: [],
      multipleSelection: [],
      deleteList: [],
      addVisible: false,
      editVisible: false,
      deleteVisible: false,
      addForm: {
        Id: 0,
        Name: '',
        Code: '',
        Coding: '',
        Status: 'Active',
      },
      editForm: {
        Id: 0,
        Name: '',
        Code: '',
        Coding: '',
        Status: 'Active',
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
    getData() {
      this.$axios.get(this.$root.HostURL + this.Url).then(res => {
        if (res.status == 200 || res.statusText == "OK") {
          this.tableData = res.data;
        }
      });
    },

    handleAdd() {
      this.addVisible = true;
    },
    addSave() {
      this.addForm.CreationDate = new Date();
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
      if(this.editForm.Status == 'Deleted'){
        this.editForm.ExpirationDate = new Date()
      }
      this.$axios({
        method: "put",
        url: this.$root.HostURL + this.Url + "/" + this.editForm.Id,
        data: this.editForm
      }).then(res => {
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
        this.deleteVisible = false;
        if (res.status == 204) {
          this.getData();
          this.$message.success(`Delete record successfully!`);
        } else {
          this.$message.error(`Delete record failed!`);
        }
      });
    },

    isDeleted(item) {
      if (item.Status == "Deleted") {
        return true;
      }
      return false;
    },
    formatDate(dateStr) {
      if (dateStr) {
        return dateStr.substring(0, 10);
      } else {
        return "";
      }
    }
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
