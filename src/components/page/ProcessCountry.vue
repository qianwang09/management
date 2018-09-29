<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="plus" class="handle-del mr10 right"  @click="handleAdd"> Add </el-button>
                <div class="clear"></div>
            </div>
            <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <!-- <el-table-column prop="Id" label="Id" sortable min-width="60"> </el-table-column> -->
                <el-table-column prop="Name" label="Name" sortable min-width="150"> </el-table-column>              
                <el-table-column prop="Coding" label="Coding" sortable min-width="100"> </el-table-column>
                <el-table-column prop="Status" label="Status" sortable min-width="100"> </el-table-column>
                <el-table-column label="Effective Date" sortable min-width="100">
                  <template slot-scope="scope"> {{ formatDate(scope.row.EffectiveDate) }} </template>
                </el-table-column>
                <el-table-column label="Expiry Date" sortable min-width="100">
                  <template slot-scope="scope"> {{ formatDate(scope.row.ExpiryDate) }} </template>
                </el-table-column>
                <el-table-column label="Operation" min-width="100">
                    <template slot-scope="scope">
                        <el-button size="small" type="primary"  @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- Add popup -->
        <el-dialog title="Add" :visible.sync="addVisible" width="40%">
            <el-form ref="addForm" :model="addForm" label-width="100px">
                <el-form-item label="Name">
                    <el-input v-model="addForm.Name"></el-input>
                </el-form-item>               
                <el-form-item label="Coding">
                    <el-input v-model="addForm.Coding"></el-input>
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
                    <el-input v-model="editForm.Name"  disabled="true"></el-input>
                </el-form-item>              
                <el-form-item label="Coding">
                    <el-input v-model="editForm.Coding"></el-input>
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
  data() {
    return {
      Url: "api/processCountries",
      tableData: [],
      multipleSelection: [],
      addVisible: false,
      editVisible: false,
      addForm: {
        Id: 0,
        Name: '',
        Code: '',
        Coding: '',
        Status: this.StatusList[0],
        EffectiveDate: "",
        ExpiryDate: "",
      },
      editForm: {
        Id: 0,
        Name: '',
        Code: '',
        Coding: '',
        Status: this.StatusList[0],
        EffectiveDate: "",
        ExpiryDate: "",
      },
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
          this.getData()
          this.addForm = {
            Id: 0,
            Name: '',
            Code: '',
            Coding: '',
            Status: this.StatusList[0],
            EffectiveDate: "",
            ExpiryDate: "",
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
    editSave() {
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
