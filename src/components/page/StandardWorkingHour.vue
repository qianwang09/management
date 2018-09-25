<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="plus" class="handle-del mr10 right"  @click="handleAdd"> Add </el-button>
                <div class="clear"></div>
            </div>
            <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <!-- <el-table-column prop="Id" label="Id" sortable min-width="60"> </el-table-column> -->
                <el-table-column label="Year Month" sortable min-width="110">
                  <template slot-scope="scope"> {{ formatDateYM(scope.row.YearMonth) }} </template>
                </el-table-column>
                <el-table-column prop="FiscalYear" label="Fiscal Year" sortable min-width="110"> </el-table-column>
                <el-table-column prop="WorkingDay" label="Working Day" sortable min-width="120"> </el-table-column>
                <el-table-column prop="WorkingHour" label="Working Hour"  min-width="110"> </el-table-column>
                <el-table-column label="Start Date"  min-width="90">
                  <template slot-scope="scope"> {{ formatDate(scope.row.Start) }} </template>
                </el-table-column>
                <el-table-column label="End Date"  min-width="90">
                  <template slot-scope="scope"> {{ formatDate(scope.row.End) }} </template>
                </el-table-column>
                <el-table-column prop="Holidays" label="Holidays"  min-width="100"> </el-table-column>
                <!-- <el-table-column prop="Status" label="Status" sortable min-width="80"> </el-table-column> -->
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
              <el-form-item label="Year Month">
                 <el-date-picker  v-model="addForm.YearMonth" type="month" placeholder="Select Year Month"> </el-date-picker>
                </el-form-item>
                <el-form-item label="FiscalYear">
                    <el-input v-model="addForm.FiscalYear"></el-input>
                </el-form-item>
                 <el-form-item label="WorkingDay">
                    <el-input v-model="addForm.WorkingDay" @change="addWorkingDayChange" type="number"></el-input>
                </el-form-item>
                <el-form-item label="WorkingHour">
                    <el-input v-model="addForm.WorkingHour" type="number"></el-input>
                </el-form-item>
                <el-form-item label="Start">
                     <el-date-picker  v-model="addForm.Start" type="date" placeholder="Select Start Date"> </el-date-picker>
                </el-form-item>
                <el-form-item label="End">
                    <el-date-picker  v-model="addForm.End" type="date" placeholder="Select End Date"> </el-date-picker>
                </el-form-item>
                <el-form-item label="Holidays">
                    <el-input v-model="addForm.Holidays"></el-input>
                </el-form-item>
                <!-- <el-form-item label="Status">
                 <el-select v-model="addForm.Status" placeholder="Select status" class="handle-select mr10">
                    <el-option v-for="status in StatusList" :key="status" :label="status" :value="status"></el-option>
                 </el-select>
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false"> Cancel </el-button>
                <el-button type="primary" @click="addSave"> Save </el-button>
            </span>
        </el-dialog>

        <!-- edit popup -->
        <el-dialog title="Edit" :visible.sync="editVisible" width="40%">
            <el-form ref="editForm" :model="editForm" label-width="100px">
               <el-form-item label="Year Month">
                 <el-date-picker  v-model="editForm.YearMonth" type="month" placeholder="Select Year Month"> </el-date-picker>
                </el-form-item>
                <el-form-item label="FiscalYear">
                    <el-input v-model="editForm.FiscalYear"></el-input>
                </el-form-item>
                 <el-form-item label="WorkingDay">
                    <el-input v-model="editForm.WorkingDay" @change="editWorkingDayChange" type="number"></el-input>
                </el-form-item>
                <el-form-item label="WorkingHour">
                    <el-input v-model="editForm.WorkingHour" type="number"></el-input>
                </el-form-item>
                <el-form-item label="Start">
                     <el-date-picker  v-model="editForm.Start" type="date" placeholder="Select Start Date"> </el-date-picker>
                </el-form-item>
                <el-form-item label="End">
                    <el-date-picker  v-model="editForm.End" type="date" placeholder="Select End Date"> </el-date-picker>
                </el-form-item>
                <el-form-item label="Holidays">
                    <el-input v-model="editForm.Holidays"></el-input>
                </el-form-item>
                <!-- <el-form-item label="Status">
                 <el-select v-model="editForm.Status" placeholder="Select status" class="handle-select mr10">
                    <el-option v-for="status in StatusList" :key="status" :label="status" :value="status"></el-option>
                </el-select>
             </el-form-item> -->
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
      // url: './static/vuetable.json',
      Url: "api/StandardWorkingHours",
      tableData: [],
      multipleSelection: [],
      allParent: [],
      addVisible: false,
      editVisible: false,
      addForm: {
        Id: 0,
        YearMonth: "",
        FiscalYear: "",
        WorkingHour: "",
        WorkingDay: "",
        Start: "",
        End: "",
        Holidays: "",
        Status: this.StatusList[0]
      },
      editForm: {
        YearMonth: "",
        FiscalYear: "",
        WorkingHour: "",
        WorkingDay: "",
        Start: "",
        End: "",
        Holidays: "",
        Status: this.StatusList[0]
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
    addWorkingDayChange() {
      if (
        this.addForm.WorkingDay &&
        Number.parseFloat(this.addForm.WorkingDay)
      ) {
        this.addForm.WorkingHour =
          Number.parseFloat(this.addForm.WorkingDay) * 8;
      }
    },
    addSave() {
      this.$axios({
        method: "post",
        url: this.$root.HostURL + this.Url,
        data: this.addForm
      }).then(res => {
        this.addVisible = false;
        if (res.status == 201) {
          this.getData();
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
    editWorkingDayChange() {
      if (
        this.editForm.WorkingDay &&
        Number.parseFloat(this.editForm.WorkingDay)
      ) {
        this.editForm.WorkingHour =
          Number.parseFloat(this.editForm.WorkingDay) * 8;
      }
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
