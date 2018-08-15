<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                Search conditions:
                <el-select v-model="filteredFunction" placeholder="Process Function" class="filter-select mr10" @change="filterFunctionChange">
                    <el-option v-for="item in allFunction" :key="item.Code" :label="item.Name" :value="item.Code"></el-option>
                </el-select>
                <el-select v-model="filteredCategory" placeholder="Process Category" class="filter-select mr10" @change="filterCategoryChange">
                    <el-option v-for="item in filteredCategorys" :key="item.Code" :label="item.Name" :value="item.Code"></el-option>
                </el-select>
                <el-select v-model="filteredType" placeholder="Process Type" class="filter-select mr10" @change="filterTypeChange">
                    <el-option v-for="item in filteredTypes" :key="item.Code" :label="item.Name" :value="item.Code"></el-option>
                </el-select>
                <el-select v-model="filteredSubType" placeholder="Process SubType" class="filter-select mr10" >
                    <el-option v-for="item in filteredSubTypes" :key="item.Code" :label="item.Name" :value="item.Code"></el-option>
                </el-select>
                <el-button type="primary" icon="plus" class="handle-del mr10 right"  @click="resetFilters"> Reset </el-button>
                <el-button type="primary" icon="plus" class="handle-del mr10 right" style="float:right;" @click="handleAdd"> Add </el-button>
            </div>
            <el-table :data="dataFiltered" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column prop="Id" label="Id"  class-name="hiddenColumn" width="80"> </el-table-column>
                <el-table-column prop="Name" label="Name" sortable  min-width="100" fixed> </el-table-column>
                <el-table-column prop="Code" label="Code" sortable min-width="120" fixed> </el-table-column>
                <el-table-column prop="Function" label="Function" sortable min-width="120"> </el-table-column>
                <el-table-column prop="Category" label="Category" sortable width="120"> </el-table-column>
                <el-table-column prop="Type" label="Type" sortable width="120"> </el-table-column>
                <el-table-column prop="SubType" label="SubType" sortable min-width="120"> </el-table-column>
                <el-table-column prop="Country" label="Country" sortable min-width="120"
                :filters="filterCountrys" :filtered-value="filteredCountrys"  :filter-method="filterHandler"> </el-table-column>
                <el-table-column prop="OHAllocation" label="OHAllocation" sortable min-width="150"
                :filters="filterOHAllocations"   :filter-method="filterHandler" :filtered-value="filteredOHAllocations"> </el-table-column>
                <el-table-column prop="Core" label="Core"  min-width="100" sortable
                :filters="filterCores"   :filter-method="filterHandler"> </el-table-column>
                <el-table-column prop="Status" label="Status" sortable min-width="100"> </el-table-column>
                <el-table-column label="Operation" min-width="110" fixed>
                    <template slot-scope="scope">
                        <el-button size="small" type="primary"  @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
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
                    <el-input v-model="addForm.Name"></el-input>
                </el-form-item>
                <el-form-item label="Code">
                    <el-input v-model="addFormCode" ></el-input>
                </el-form-item>
                <el-form-item label="Function">
                    <el-select v-model="addForm.Function" @change="addFunctionChange" placeholder="Select Function" class="handle-select mr10">
                        <el-option v-for="item in allFunction" :key="item.Code" :label="item.Name" :value="item.Code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Category">
                    <el-select v-model="addForm.Category" @change="addCategoryChange"  placeholder="Select Category" class="handle-select mr10">
                        <el-option v-for="item in addFormCategories" :key="item.Code" :label="item.Name" :value="item.Code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Type">
                    <el-select v-model="addForm.Type" @change="addTypeChange"  placeholder="Select Type" class="handle-select mr10">
                        <el-option v-for="item in addFormTypes" :key="item.Code" :label="item.Name" :value="item.Code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="SubType">
                    <el-select v-model="addForm.SubType" placeholder="Select SubType" class="handle-select mr10">
                        <el-option v-for="item in addFormSubTypes" :key="item.Code" :label="item.Name" :value="item.Code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Country">
                    <el-select v-model="addForm.Country" placeholder="Select Country" class="handle-select mr10">
                        <el-option v-for="item in allCountry" :key="item.Code" :label="item.Name" :value="item.Code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="OHAllocation">
                    <el-select v-model="addForm.OHAllocation" placeholder="Select OHAllocation" class="handle-select mr10">
                        <el-option v-for="item in allOHAllocation" :key="item.Code" :label="item.Name" :value="item.Code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Core">
                    <el-select v-model="addForm.Core" placeholder="Select Core" class="handle-select mr10">
                        <el-option v-for="item in allCore" :key="item.Code" :label="item.Name" :value="item.Code"></el-option>
                    </el-select>
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

        <!-- edit popup -->
        <el-dialog title="Edit" :visible.sync="editVisible" width="40%">
            <el-form ref="editForm" :model="editForm" label-width="100px">
               <el-form-item label="Name">
                    <el-input v-model="editForm.Name"></el-input>
                </el-form-item>
                <el-form-item label="Code">
                    <el-input v-model="editFormCode" ></el-input>
                </el-form-item>
                <el-form-item label="Function">
                    <el-select v-model="editForm.Function" @change="editFunctionChange" placeholder="Select Function" class="handle-select mr10">
                        <el-option v-for="item in allFunction" :key="item.Code" :label="item.Name" :value="item.Code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Category">
                    <el-select v-model="editForm.Category" @change="editCategoryChange"  placeholder="Select Category" class="handle-select mr10">
                        <el-option v-for="item in editFormCategories" :key="item.Code" :label="item.Name" :value="item.Code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Type">
                    <el-select v-model="editForm.Type" @change="editTypeChange"  placeholder="Select Type" class="handle-select mr10">
                        <el-option v-for="item in editFormTypes" :key="item.Code" :label="item.Name" :value="item.Code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="SubType">
                    <el-select v-model="editForm.SubType" placeholder="Select SubType" class="handle-select mr10">
                        <el-option v-for="item in editFormSubTypes" :key="item.Code" :label="item.Name" :value="item.Code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Country">
                    <el-select v-model="editForm.Country" placeholder="Select Country" class="handle-select mr10">
                        <el-option v-for="item in allCountry" :key="item.Code" :label="item.Name" :value="item.Code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="OHAllocation">
                    <el-select v-model="editForm.OHAllocation" placeholder="Select OHAllocation" class="handle-select mr10">
                        <el-option v-for="item in allOHAllocation" :key="item.Code" :label="item.Name" :value="item.Code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Core">
                    <el-select v-model="editForm.Core" placeholder="Select Core" class="handle-select mr10">
                        <el-option v-for="item in allCore" :key="item.Code" :label="item.Name" :value="item.Code"></el-option>
                    </el-select>
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
      Url: "api/Processes",
      UrlFunction: "api/ProcessFunctions",
      UrlCategory: "api/ProcessCategories",
      UrlType: "api/ProcessTypes",
      UrlSubType: "api/ProcessSubTypes",
      UrlCountry: "api/ProcessCountries",
      UrlOHAllocation: "api/ProcessOHAllocations",
      UrlCore: "api/ProcessCores",
      allFunction: [],
      allCategory: [],
      allType: [],
      allSubType: [],
      allCountry: [],
      allOHAllocation: [],
      allCore: [],
      tableData: [],
      multipleSelection: [],
      deleteList: [],

      filteredFunction: '',
      filteredCategory: '',
      filteredType: '',
      filteredSubType: '',
      filteredCountrys: [],
      filteredOHAllocations: [],

      addVisible: false,
      editVisible: false,
      deleteVisible: false,
      addForm: {
        Id: 0,
        Name: "",
        Code: "",
        Function: "",
        Category: "",
        Type: "",
        SubType: "",
        Country: "",
        OHAllocation: "",
        Core: "",
        Status: "Active",
        CreationTime: ""
      },
      addFormCategories: null,
      addFormTypes: null,
      addFormSubTypes: null,
      editForm: {
        Id: 0,
        Name: "",
        Code: "",
        Function: "",
        Category: "",
        Type: "",
        SubType: "",
        Country: "",
        OHAllocation: "",
        Core: "",
        Status: "Active",
        CreationTime: ""
      },
      editFormCategories: null,
      editFormTypes: null,
      editFormSubTypes: null
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
          if(this.filteredSubType ){
              if(this.filteredSubType == f.SubType && this.filteredType == f.Type && this.filteredCategory == f.Category && this.filteredFunction == f.Function){
                return f
              }
          }else if(this.filteredType){
               if(this.filteredType == f.Type && this.filteredCategory == f.Category && this.filteredFunction == f.Function){
                return f
              }
          }else if(this.filteredCategory){
               if(this.filteredCategory == f.Category && this.filteredFunction == f.Function){
                return f
              }
          }else if(this.filteredFunction){
               if(this.filteredFunction == f.Function){
                return f
              }
          }else{
              return f
          }
      })
    },
    filteredCategorys(){
        if(this.filteredFunction){
            return  this.allCategory.filter(f => f.Parent == this.filteredFunction)
        }
        return ''
    },
    filteredTypes(){
        if(this.filteredCategory){
            return  this.allType.filter(f => f.Parent == this.filteredCategory)
        }
        return ''
    },
    filteredSubTypes(){
        if(this.filteredType){
            return  this.allSubType.filter(f => f.Parent == this.filteredType)
        }
        return ''
    },
    filterCountrys() {
      var filters = [];
      for (var i = 0; i < this.allCountry.length; i++) {
        filters.push({
          text: this.allCountry[i].Name,
          value: this.allCountry[i].Code
        });
      }
      return filters;
    },
    filterOHAllocations() {
      var filters = [];
      for (var i = 0; i < this.allOHAllocation.length; i++) {
        filters.push({
          text: this.allOHAllocation[i].Name,
          value: this.allOHAllocation[i].Code
        });
      }
      return filters;
    },
    filterCores() {
      var filters = [];
      for (var i = 0; i < this.allCore.length; i++) {
        filters.push({
          text: this.allCore[i].Name,
          value: this.allCore[i].Code
        });
      }
      return filters;
    },
    addFormCode() {
      if (
        this.addForm.Function &&
        this.addForm.Category &&
        this.addForm.Type &&
        this.addForm.Country &&
        this.addForm.OHAllocation &&
        this.addForm.Core
      ) {
        var addSubType = "";
        if (
          !this.addForm.SubType &&
          this.addFormSubTypes &&
          this.addFormSubTypes.length > 0
        ) {
          return "";
        } else if (!this.addForm.SubType && !this.addFormSubTypes) {
          addSubType = "00";
        } else {
          var currentSubType = this.allSubType.find(
            item => item.Code == this.addForm.SubType
          );
          if (currentSubType && currentSubType.Coding) {
            addSubType = currentSubType.Coding;
          } else {
            addSubType = "00";
          }
        }
        var addFunction = this.allFunction.find(
          item => item.Code == this.addForm.Function
        ).Coding;
        var addCategory = this.allCategory.find(
          item => item.Code == this.addForm.Category
        ).Coding;
        var addType = this.allType.find(item => item.Code == this.addForm.Type)
          .Coding;
        var addCountry = this.allCountry.find(
          item => item.Code == this.addForm.Country
        ).Coding;
        var addOHAllocation = this.allOHAllocation.find(
          item => item.Code == this.addForm.OHAllocation
        ).Coding;
        var addCore = this.allCore.find(item => item.Code == this.addForm.Core)
          .Coding;
        return (
          addFunction +
          addCategory +
          addType +
          addSubType +
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
        this.editForm.Type &&
        this.editForm.Country &&
        this.editForm.OHAllocation &&
        this.editForm.Core
      ) {
        var editSubType = "";
        if (
          !this.editForm.SubType &&
          this.editFormSubTypes &&
          this.editFormSubTypes.length > 0
        ) {
          return "";
        } else if (!this.editForm.SubType && !this.editFormSubTypes) {
          editSubType = "00";
        } else {
          var currentSubType = this.allSubType.find(
            item => item.Code == this.editForm.SubType
          );
          if (currentSubType && currentSubType.Coding) {
            editSubType = currentSubType.Coding;
          } else {
            editSubType = "00";
          }
        }
        var editFunction = this.allFunction.find(
          item => item.Code == this.editForm.Function
        ).Coding;
        var editCategory = this.allCategory.find(
          item => item.Code == this.editForm.Category
        ).Coding;
        var editType = this.allType.find(
          item => item.Code == this.editForm.Type
        ).Coding;
        var editCountry = this.allCountry.find(
          item => item.Code == this.editForm.Country
        ).Coding;
        var editOHAllocation = this.allOHAllocation.find(
          item => item.Code == this.editForm.OHAllocation
        ).Coding;
        var editCore = this.allCore.find(
          item => item.Code == this.editForm.Core
        ).Coding;
        return (
          editFunction +
          editCategory +
          editType +
          editSubType +
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
          this.allType = res.data;
        }
      });
      this.$axios.get(this.$root.HostURL + this.UrlSubType).then(res => {
        if (res.status == 200 || res.statusText == "OK") {
          this.allSubType = res.data;
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
    filterFunctionChange(){
        this.filteredCategory = ''
        this.filteredType = ''
        this.filteredSubType = ''
    },
    filterCategoryChange(){
        this.filteredType = ''
        this.filteredSubType = ''
    },
    filterTypeChange(){
        this.filteredSubType = ''
    },
    resetFilters(){
        this.filteredFunction = ''
        this.filteredCategory = ''
        this.filteredType = ''
        this.filteredSubType = ''
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
      this.addForm.Type = "";
      this.addForm.SubType = "";
    },
    addCategoryChange() {
      this.addForm.Type = "";
      this.addFormTypes = null;
      if (this.addForm.Category && this.allType && this.allType.length > 0) {
        this.addFormTypes = this.allType.filter(
          item => item.Parent == this.addForm.Category
        );
      }
      this.addForm.SubType = "";
    },
    addTypeChange() {
      this.addForm.SubType = "";
      this.addFormSubTypes = null;
      if (this.addForm.Type && this.allSubType && this.allSubType.length > 0) {
        this.addFormSubTypes = this.allSubType.filter(
          item => item.Parent == this.addForm.Type
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
      this.editForm.Type = "";
      this.editForm.SubType = "";
    },
    editCategoryChange() {
      this.editForm.Type = "";
      this.editFormTypes = null;
      if (this.editForm.Category && this.allType && this.allType.length > 0) {
        this.editFormTypes = this.allType.filter(
          item => item.Parent == this.editForm.Category
        );
      }
      this.editForm.SubType = "";
    },
    editTypeChange() {
      this.editForm.SubType = "";
      this.editFormSubTypes = null;
      if (this.editForm.Type && this.allSubType && this.allSubType.length > 0) {
        this.editFormSubTypes = this.allSubType.filter(
          item => item.Parent == this.editForm.Type
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

    isDeleted(item) {
      if (item.Status == "Deleted") {
        return true;
      }
      return false;
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 10px;
}
.filter-select{
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
