<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                Search conditions:
                <el-select v-model="filteredFunction" placeholder="Filter Function" class="filter-select mr10" @change="filterFunctionChange">
                    <el-option v-for="item in allFunction" :key="item.Name" :label="item.Name" :value="item.Name"></el-option>
                </el-select>
                <el-select v-model="filteredCategory" placeholder="Filter Category" class="filter-select mr10" @change="filterCategoryChange">
                    <el-option v-for="item in filteredCategorys" :key="item.Name" :label="item.Name" :value="item.Name"></el-option>
                </el-select>
                <el-select v-model="filteredProcess" placeholder="Filter Process" class="filter-select mr10" @change="filterProcessChange">
                    <el-option v-for="item in filteredProcesss" :key="item.Name" :label="item.Name" :value="item.Name"></el-option>
                </el-select>
                <el-select v-model="filteredSubProcess" placeholder="Filter SubProcess" class="filter-select mr10" >
                    <el-option v-for="item in filteredSubProcesss" :key="item.Name" :label="item.Name" :value="item.Name"></el-option>
                </el-select>
                <!-- <el-button type="primary" icon="plus" class="handle-del mr10 right"  @click="resetFilters"> Reset </el-button> -->
                <el-button type="primary" icon="plus" class="handle-del mr10 right" @click="handleAdd"> Add </el-button>
                <div class="clear"></div>
            </div>
            <el-table :data="dataFiltered" border style="width: 100%"  max-height="600" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column prop="Id" label="Id"  min-width="60"> </el-table-column>
                <el-table-column prop="Code" label="Code" sortable  min-width="100"> </el-table-column>
                <el-table-column prop="Name" label="Name" sortable  min-width="150"> </el-table-column>
                <el-table-column prop="Status" label="Status" sortable min-width="80"> </el-table-column>
                <el-table-column prop="Function" label="Function" sortable min-width="100"> </el-table-column>
                <el-table-column prop="Category" label="Category" sortable min-width="110"> </el-table-column>
                <el-table-column prop="Process" label="Process" sortable min-width="110"> </el-table-column>
                <el-table-column prop="SubProcess" label="SubProcess" sortable min-width="110"> </el-table-column>
                <el-table-column prop="Country" label="Country" sortable min-width="100"
                :filters="filterCountrys" :filtered-value="filteredCountry"  :filter-method="filterHandler"> </el-table-column>
                <el-table-column prop="OHAllocation" label="OHAllocation" sortable min-width="130"
                :filters="filterOHAllocations"   :filter-method="filterHandler" :filtered-value="filteredOHAllocation"> </el-table-column>
                <el-table-column prop="Core" label="Core"  min-width="100" sortable
                :filters="filterCores"   :filter-method="filterHandler"> </el-table-column>                
                <el-table-column label="Operation" min-width="80" >
                    <template slot-scope="scope">
                        <el-button size="small" type="primary"  @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div> -->
        </div>

        <!-- Add popup -->
        <el-dialog title="Add" :visible.sync="addVisible" width="40%">
            <el-form ref="addForm" :model="addForm" label-width="100px">               
                <el-form-item label="Function">
                    <el-select v-model="addForm.Function" @change="addFunctionChange" placeholder="Select Function" class="handle-select mr10">
                        <el-option v-for="item in allFunction" :key="item.Name" :label="item.Name" :value="item.Name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Category">
                    <el-select v-model="addForm.Category" @change="addCategoryChange"  placeholder="Select Category" class="handle-select mr10">
                        <el-option v-for="item in addFormCategories" :key="item.Name" :label="item.Name" :value="item.Name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Process">
                    <el-select v-model="addForm.Process" @change="addProcessChange"  placeholder="Select Process" class="handle-select mr10">
                        <el-option v-for="item in addFormTypes" :key="item.Name" :label="item.Name" :value="item.Name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="SubProcess">
                    <el-select v-model="addForm.SubProcess" placeholder="Select SubProcess" class="handle-select mr10">
                        <el-option v-for="item in addFormSubProcesss" :key="item.Name" :label="item.Name" :value="item.Name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Country">
                    <el-select v-model="addForm.Country" placeholder="Select Country" class="handle-select mr10">
                        <el-option v-for="item in allCountry" :key="item.Name" :label="item.Name" :value="item.Name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="OHAllocation">
                    <el-select v-model="addForm.OHAllocation" placeholder="Select OHAllocation" class="handle-select mr10">
                        <el-option v-for="item in allOHAllocation" :key="item.Name" :label="item.Name" :value="item.Name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Core">
                    <el-select v-model="addForm.Core" placeholder="Select Core" class="handle-select mr10">
                        <el-option v-for="item in allCore" :key="item.Name" :label="item.Name" :value="item.Name"></el-option>
                    </el-select>
                </el-form-item>               
                <el-form-item label="Code">
                    <el-input v-model="addFormCode" ></el-input>
                </el-form-item>
                  <el-form-item label="Name">
                    <el-input v-model="addForm.Name"></el-input>
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
                <el-form-item label="Function">
                    <el-select v-model="editForm.Function" @change="editFunctionChange" placeholder="Select Function" class="handle-select mr10">
                        <el-option v-for="item in allFunction" :key="item.Name" :label="item.Name" :value="item.Name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Category">
                    <el-select v-model="editForm.Category" @change="editCategoryChange"  placeholder="Select Category" class="handle-select mr10">
                        <el-option v-for="item in editFormCategories" :key="item.Name" :label="item.Name" :value="item.Name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Process">
                    <el-select v-model="editForm.Process" @change="editProcessChange"  placeholder="Select Process" class="handle-select mr10">
                        <el-option v-for="item in editFormProcesss" :key="item.Name" :label="item.Name" :value="item.Name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="SubProcess">
                    <el-select v-model="editForm.SubProcess" placeholder="Select SubProcess" class="handle-select mr10">
                        <el-option v-for="item in editFormSubProcesss" :key="item.Name" :label="item.Name" :value="item.Name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Country">
                    <el-select v-model="editForm.Country" placeholder="Select Country" class="handle-select mr10">
                        <el-option v-for="item in allCountry" :key="item.Name" :label="item.Name" :value="item.Name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="OHAllocation">
                    <el-select v-model="editForm.OHAllocation" placeholder="Select OHAllocation" class="handle-select mr10">
                        <el-option v-for="item in allOHAllocation" :key="item.Name" :label="item.Name" :value="item.Name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Core">
                    <el-select v-model="editForm.Core" placeholder="Select Core" class="handle-select mr10">
                        <el-option v-for="item in allCore" :key="item.Name" :label="item.Name" :value="item.Name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Code">
                    <el-input v-model="editFormCode" ></el-input>
                </el-form-item>
                <el-form-item label="Name">
                    <el-input v-model="editForm.Name"></el-input>
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
      Url: "api/ProcessManagements",
      UrlFunction: "api/ProcessFunctions?status=Active",
      UrlCategory: "api/ProcessCategories?status=Active",
      UrlType: "api/ProcessTypes?status=Active",
      UrlSubProcess: "api/ProcessSubTypes?status=Active",
      UrlCountry: "api/ProcessCountries?status=Active",
      UrlOHAllocation: "api/ProcessOHAllocations?status=Active",
      UrlCore: "api/ProcessCores?status=Active",
      allFunction: [],
      allCategory: [],
      allProcess: [],
      allSubProcess: [],
      allCountry: [],
      allOHAllocation: [],
      allCore: [],
      tableData: [],
      multipleSelection: [],

      filteredFunction: "",
      filteredCategory: "",
      filteredProcess: "",
      filteredSubProcess: "",
      filteredCountry: [],
      filteredOHAllocation: [],

      addVisible: false,
      editVisible: false,
      addForm: {
        Id: 0,
        Name: "",
        Code: "",
        Function: "",
        Category: "",
        Process: "",
        SubProcess: "",
        Country: "",
        OHAllocation: "",
        Core: "",
        Status: this.StatusList[0],
        EffectiveDate: "",
        ExpiryDate: ""
      },
      addFormCategories: null,
      addFormTypes: null,
      addFormSubProcesss: null,

      editForm: {
        Id: 0,
        Name: "",
        Code: "",
        Function: "",
        Category: "",
        Type: "",
        SubProcess: "",
        Country: "",
        OHAllocation: "",
        Core: "",
        Status: this.StatusList[0],
        EffectiveDate: "",
        ExpiryDate: ""
      },
      editFormCategories: null,
      editFormProcesss: null,
      editFormSubProcesss: null
    };
  },
  created() {
    this.getData();
    this.getExtentionData();
  },
  computed: {
    data() {
      return this.tableData;
    },
    dataFiltered() {
      return this.tableData.filter(f => {
        if (this.filteredSubProcess) {
          if (
            this.filteredSubProcess == f.SubProcess &&
            this.filteredProcess == f.Process &&
            this.filteredCategory == f.Category &&
            this.filteredFunction == f.Function
          ) {
            return f;
          }
        } else if (this.filteredProcess) {
          if (
            this.filteredProcess == f.Process &&
            this.filteredCategory == f.Category &&
            this.filteredFunction == f.Function
          ) {
            return f;
          }
        } else if (this.filteredCategory) {
          if (
            this.filteredCategory == f.Category &&
            this.filteredFunction == f.Function
          ) {
            return f;
          }
        } else if (this.filteredFunction) {
          if (this.filteredFunction == f.Function) {
            return f;
          }
        } else {
          return f;
        }
      });
    },
    filteredCategorys() {
      if (this.filteredFunction) {
        return this.allCategory.filter(f => f.Parent == this.filteredFunction);
      }
      return "";
    },
    filteredProcesss() {
      if (this.filteredCategory) {
        return this.allProcess.filter(f => f.Parent == this.filteredCategory);
      }
      return "";
    },
    filteredSubProcesss() {
      if (this.filteredProcess) {
        return this.allSubProcess.filter(f => f.Parent == this.filteredProcess);
      }
      return "";
    },
    filterCountrys() {
      var filters = [];
      for (var i = 0; i < this.allCountry.length; i++) {
        filters.push({
          text: this.allCountry[i].Name,
          value: this.allCountry[i].Name
        });
      }
      return filters;
    },
    filterOHAllocations() {
      var filters = [];
      for (var i = 0; i < this.allOHAllocation.length; i++) {
        filters.push({
          text: this.allOHAllocation[i].Name,
          value: this.allOHAllocation[i].Name
        });
      }
      return filters;
    },
    filterCores() {
      var filters = [];
      for (var i = 0; i < this.allCore.length; i++) {
        filters.push({
          text: this.allCore[i].Name,
          value: this.allCore[i].Name
        });
      }
      return filters;
    },
    addFormCode() {
      if (
        this.addForm.Function &&
        this.addForm.Category &&
        this.addForm.Process &&
        this.addForm.Country &&
        this.addForm.OHAllocation &&
        this.addForm.Core
      ) {
        var addSubProcess = "";
        if (
          !this.addForm.SubProcess &&
          this.addFormSubProcesss &&
          this.addFormSubProcesss.length > 0
        ) {
          return "";
        } else if (!this.addForm.SubProcess && !this.addFormSubProcesss) {
          addSubProcess = "00";
        } else {
          var currentSubProcess = this.allSubProcess.find(
            item => item.Name == this.addForm.SubProcess
          );
          if (currentSubProcess && currentSubProcess.Coding) {
            addSubProcess = currentSubProcess.Coding;
          } else {
            addSubProcess = "00";
          }
        }
        var addFunction = this.allFunction.find(
          item => item.Name == this.addForm.Function
        ).Coding;
        var addCategory = this.allCategory.find(
          item => item.Name == this.addForm.Category
        ).Coding;
        var addProcess = this.allProcess.find(
          item => item.Name == this.addForm.Process
        ).Coding;
        var addCountry = this.allCountry.find(
          item => item.Name == this.addForm.Country
        ).Coding;
        var addOHAllocation = this.allOHAllocation.find(
          item => item.Name == this.addForm.OHAllocation
        ).Coding;
        var addCore = this.allCore.find(item => item.Name == this.addForm.Core)
          .Coding;
        return (
          addFunction +
          addCategory +
          addProcess +
          addSubProcess +
          addCountry +
          addOHAllocation +
          addCore
        );
      }
      return "";
    },
    editFormCode() {
      if (
        this.editForm.Function &&
        this.editForm.Category &&
        this.editForm.Process &&
        this.editForm.Country &&
        this.editForm.OHAllocation &&
        this.editForm.Core
      ) {
        var editSubProcess = "";
        if (
          !this.editForm.SubProcess &&
          this.editFormSubProcesss &&
          this.editFormSubProcesss.length > 0
        ) {
          return "";
        } else if (!this.editForm.SubProcess && !this.editFormSubProcesss) {
          editSubProcess = "00";
        } else {
          var currentSubProcess = this.allSubProcess.find(
            item => item.Name == this.editForm.SubProcess && item.Parent == this.editForm.Process
          );
          if (currentSubProcess && currentSubProcess.Coding) {
            editSubProcess = currentSubProcess.Coding;
          } else {
            editSubProcess = "00";
          }
        }
        var editFunction = this.allFunction.find(
          item => item.Name == this.editForm.Function
        ).Coding;
        var editCategory = this.allCategory.find(
          item => item.Name == this.editForm.Category
        ).Coding;
        var editProcess = this.allProcess.find(
          item => item.Name == this.editForm.Process
        ).Coding;
        var editCountry = this.allCountry.find(
          item => item.Name == this.editForm.Country
        ).Coding;
        var editOHAllocation = this.allOHAllocation.find(
          item => item.Name == this.editForm.OHAllocation
        ).Coding;
        var editCore = this.allCore.find(
          item => item.Name == this.editForm.Core
        ).Coding;
        return (
          editFunction +
          editCategory +
          editProcess +
          editSubProcess +
          editCountry +
          editOHAllocation +
          editCore
        );
      }
      return "";
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
    getExtentionData() {
      this.$axios.get(this.$root.HostURL + this.UrlFunction).then(res => {
        if (res.status == 200 || res.statusText == "OK") {
          this.allFunction = res.data;
        }
      });
      this.$axios.get(this.$root.HostURL + this.UrlCategory).then(res => {
        if (res.status == 200 || res.statusText == "OK") {
          this.allCategory = res.data;
        }
      });
      this.$axios.get(this.$root.HostURL + this.UrlType).then(res => {
        if (res.status == 200 || res.statusText == "OK") {
          this.allProcess = res.data;
        }
      });
      this.$axios.get(this.$root.HostURL + this.UrlSubProcess).then(res => {
        if (res.status == 200 || res.statusText == "OK") {
          this.allSubProcess = res.data;
        }
      });
      this.$axios.get(this.$root.HostURL + this.UrlCountry).then(res => {
        if (res.status == 200 || res.statusText == "OK") {
          this.allCountry = res.data;
        }
      });
      this.$axios.get(this.$root.HostURL + this.UrlOHAllocation).then(res => {
        if (res.status == 200 || res.statusText == "OK") {
          this.allOHAllocation = res.data;
        }
      });
      this.$axios.get(this.$root.HostURL + this.UrlCore).then(res => {
        if (res.status == 200 || res.statusText == "OK") {
          this.allCore = res.data;
        }
      });
    },
    filterFunctionChange() {
      this.filteredCategory = "";
      this.filteredProcess = "";
      this.filteredSubProcess = "";
    },
    filterCategoryChange() {
      this.filteredProcess = "";
      this.filteredSubProcess = "";
    },
    filterProcessChange() {
      this.filteredSubProcess = "";
    },
    resetFilters() {
      this.filteredFunction = "";
      this.filteredCategory = "";
      this.filteredProcess = "";
      this.filteredSubProcess = "";
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    filterCore(value, row, column) {
      return row.Core === value;
    },
    handleAdd() {
      debugger;
      this.addVisible = true;
    },
    addFunctionChange() {
      this.addForm.Category = "";
      this.addFormCategories = null;
      if (
        this.addForm.Function &&
        this.allCategory &&
        this.allCategory.length > 0
      ) {
        this.addFormCategories = this.allCategory.filter(
          item => item.Parent == this.addForm.Function
        );
      }
      this.addForm.Process = "";
      this.addForm.SubProcess = "";
    },
    addCategoryChange() {
      this.addForm.Process = "";
      this.addFormTypes = null;
      if (
        this.addForm.Category &&
        this.allProcess &&
        this.allProcess.length > 0
      ) {
        this.addFormTypes = this.allProcess.filter(
          item => item.Parent == this.addForm.Category
        );
      }
      this.addForm.SubProcess = "";
    },
    addProcessChange() {
      this.addForm.SubProcess = "";
      this.addFormSubProcesss = null;
      if (
        this.addForm.Process &&
        this.allSubProcess &&
        this.allSubProcess.length > 0
      ) {
        this.addFormSubProcesss = this.allSubProcess.filter(
          item => item.Parent == this.addForm.Process
        );
      }
    },
    addSave() {
      //   this.$axios.post(this.$root.HostURL + this.Url, this.addForm).then(res => {
      //       debugger
      //   })
      if (!this.addFormCode) {
        return;
      }
      this.addForm.Code = this.addFormCode;
      this.addForm.CreationDate = new Date();
      this.addForm.ExpirationDate;
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
    editFunctionChange() {
      this.editForm.Category = "";
      this.editFormCategories = null;
      if (
        this.editForm.Function &&
        this.allCategory &&
        this.allCategory.length > 0
      ) {
        this.editFormCategories = this.allCategory.filter(
          item => item.Parent == this.editForm.Function
        );
      }
      this.editForm.Process = "";
      this.editForm.SubProcess = "";
    },
    editCategoryChange() {
      this.editForm.Process = "";
      this.editFormProcesss = null;
      if (
        this.editForm.Category &&
        this.allProcess &&
        this.allProcess.length > 0
      ) {
        this.editFormProcesss = this.allProcess.filter(
          item => item.Parent == this.editForm.Category
        );
      }
      this.editForm.SubProcess = "";
    },
    editProcessChange() {
      this.editForm.SubProcess = "";
      this.editFormSubProcesss = null;
      if (
        this.editForm.Process &&
        this.allSubProcess &&
        this.allSubProcess.length > 0
      ) {
        this.editFormSubProcesss = this.allSubProcess.filter(
          item => item.Parent == this.editForm.Processs
        );
      }
    },
    editSave() {
      if (this.editForm.Status == "Deleted") {
        this.editForm.ExpirationDate = new Date();
      }
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
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 10px;
}
.filter-select {
  min-width: 100px;
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
