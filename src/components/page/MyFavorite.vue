<template>
    <div class="">
        <div class="container">
            <el-tabs v-model="selectedTab">
                <el-tab-pane label="All Process" name="allProcess">
                <div class="handle-box" style="margin:0 0 10px 0">
                    Search conditions:
                    <el-select v-model="functionFiltered" placeholder="Filter Function" class="filter-select mr10" @change="filterFunctionChange">
                        <el-option v-for="item in allFunction" :key="item.Name" :label="item.Name" :value="item.Name"></el-option>
                    </el-select>
                    <el-select v-model="categoryFiltered" placeholder="Filter Category" class="filter-select mr10" @change="filterCategoryChange">
                        <el-option v-for="item in filterCategory" :key="item.Name" :label="item.Name" :value="item.Name"></el-option>
                    </el-select>
                    <el-select v-model="processFiltered" placeholder="Filter Process" class="filter-select mr10" @change="filterProcessChange">
                        <el-option v-for="item in filterProcess" :key="item.Name" :label="item.Name" :value="item.Name"></el-option>
                    </el-select>
                    <el-select v-model="subProcessFiltered" placeholder="Filter SubProcess" class="filter-select mr10" >
                        <el-option v-for="item in filterSubProcess" :key="item.Name" :label="item.Name" :value="item.Name"></el-option>
                    </el-select>
                    <div class="clear"></div>
                </div>
                <el-table :data="allProcessFiltered" border style="width: 100%"  >
                    <!-- <el-table-column prop="Code" label="Code" sortable  min-width="100"> </el-table-column> -->
                    <el-table-column prop="Name" label="Name" sortable  min-width="180"> </el-table-column>
                    <el-table-column prop="Function" label="Function" sortable min-width="120"> </el-table-column>
                    <el-table-column prop="Category" label="Category" sortable min-width="110"> </el-table-column>
                    <el-table-column prop="Process" label="Process" sortable min-width="130"> </el-table-column>
                    <el-table-column prop="SubProcess" label="SubProcess" sortable min-width="140"> </el-table-column>
                    <!-- <el-table-column prop="Country" label="Country" sortable min-width="100"> </el-table-column>
                    <el-table-column prop="OHAllocation" label="OHAllocation" sortable min-width="140"> </el-table-column>
                    <el-table-column prop="Core" label="Core"  min-width="100" sortable> </el-table-column> -->
                    <el-table-column label="Operation" min-width="100" >
                        <template slot-scope="scope">
                            <el-button size="small" type="primary"  @click="addFavorite(scope.$index, scope.row)" :disabled="isFavorite(scope.$index, scope.row)">Add</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                </el-tab-pane>
                <el-tab-pane label="My Favorite" name="myFavorite">
                    <template v-if="selectedTab === 'myFavorite'">
                        <el-table :data="tableDataFavorite" border style="width: 100%"  >
                            <!-- <el-table-column prop="User" label="User" sortable  min-width="100"> </el-table-column>
                            <el-table-column prop="ProcessManagement.Code" label="Code" sortable  min-width="180"> </el-table-column> -->
                            <el-table-column prop="ProcessManagement.Name" label="Process Name" sortable  min-width="180"> </el-table-column>
                            <!-- <el-table-column prop="ProcessManagement.Function" label="Function" sortable min-width="120"> </el-table-column>
                            <el-table-column prop="ProcessManagement.Category" label="Category" sortable min-width="110"> </el-table-column>
                            <el-table-column prop="ProcessManagement.Process" label="Process" sortable min-width="130"> </el-table-column>
                            <el-table-column prop="ProcessManagement.SubProcess" label="SubProcess" sortable min-width="140"> </el-table-column>
                            <el-table-column prop="Status" label="Status" sortable min-width="100"> </el-table-column>
                            <el-table-column label="Effective Date" sortable min-width="140">
                              <template slot-scope="scope"> {{ formatDate(scope.row.EffectiveDate) }} </template>
                            </el-table-column>
                             <el-table-column label="Expiry Date" sortable min-width="140">
                              <template slot-scope="scope"> {{ formatDate(scope.row.ExpiryDate) }} </template>
                            </el-table-column> -->
                            <el-table-column label="Operation" min-width="100" >
                            <template slot-scope="scope">
                                <el-button size="small" type="primary"  @click="CancelFavorite(scope.$index, scope.row)">Remove</el-button>
                            </template>
                            </el-table-column>
                </el-table>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
export default {
  name: "tabs",
  data() {
    return {
      selectedTab: "allProcess",
      showHeader: false,
      Url: "api/FavoriteProcesses",
      UrlProcessManagement: "api/ProcessManagements",
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
      tableDataFavorite: [],
      tableDataProcess: [],

      functionFiltered: "",
      categoryFiltered: "",
      processFiltered: "",
      subProcessFiltered: ""
    };
  },
  created() {
    this.getData();
    this.getExtentionData();
  },
  computed: {
    allProcessFiltered() {
      return this.tableDataProcess.filter(f => {
        if (this.subProcessFiltered) {
          if (
            this.subProcessFiltered == f.SubProcess &&
            this.processFiltered == f.Process &&
            this.categoryFiltered == f.Category &&
            this.functionFiltered == f.Function
          ) {
            return f;
          }
        } else if (this.processFiltered) {
          if (
            this.processFiltered == f.Process &&
            this.categoryFiltered == f.Category &&
            this.functionFiltered == f.Function
          ) {
            return f;
          }
        } else if (this.categoryFiltered) {
          if (
            this.categoryFiltered == f.Category &&
            this.functionFiltered == f.Function
          ) {
            return f;
          }
        } else if (this.functionFiltered) {
          if (this.functionFiltered == f.Function) {
            return f;
          }
        } else {
          return f;
        }
      });
    },
    filterCategory() {
      if (this.functionFiltered) {
        return this.allCategory.filter(f => f.Parent == this.functionFiltered);
      }
      return "";
    },
    filterProcess() {
      if (this.categoryFiltered) {
        return this.allProcess.filter(f => f.Parent == this.categoryFiltered);
      }
      return "";
    },
    filterSubProcess() {
      if (this.processFiltered) {
        return this.allSubProcess.filter(f => f.Parent == this.processFiltered);
      }
      return "";
    }
  },
  methods: {
    getData() {
        var userName = this.$root.user == null ? '' : this.$root.user.Name
        if(!userName){
            userName = localStorage.getItem("Name")
        }
      this.$axios.get(this.$root.HostURL + this.Url + '?userName=' + userName).then(res => {
        debugger;
        if (res.status == 200 || res.statusText == "OK") {
          this.tableDataFavorite = res.data;
        }
      });
    },
    getExtentionData() {
      this.$axios
        .get(this.$root.HostURL + this.UrlProcessManagement)
        .then(res => {
          if (res.status == 200 || res.statusText == "OK") {
            debugger
            this.tableDataProcess = res.data;
          }
        });
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
      this.categoryFiltered = "";
      this.processFiltered = "";
      this.subProcessFiltered = "";
    },
    filterCategoryChange() {
      this.processFiltered = "";
      this.subProcessFiltered = "";
    },
    filterProcessChange() {
      this.subProcessFiltered = "";
    },
    isFavorite(index, row){
        var existedFavorite = this.tableDataFavorite.filter(f => f.ProcessManagement.Name == row.Name)
        if(existedFavorite && existedFavorite.length > 0){
            return true
        }
        return false
    },
    addFavorite(index, row) {
        debugger
      var selectedProcess = this.tableDataProcess[index];
      var favoriteAdd = {
        User: this.$root.user.Name,
        ProcessManagement: selectedProcess.Name,
        Status: this.StatusList[0],
        EffectiveDate: new Date()
      };
      this.$axios({
        method: "post",
        url: this.$root.HostURL + this.Url,
        data: favoriteAdd
      }).then(res => {
        if (res.status == 201) {
          this.getData()
          this.$message.success(`Add favorite successfully!`);
        } else {
          this.$message.error(`Add favorite failed!`);
        }
      })
    },
    CancelFavorite(index, row) {
        debugger
      var selectedFavorite = this.tableDataFavorite[index];
      var processName = selectedFavorite.ProcessManagement == null ? '': selectedFavorite.ProcessManagement.Name
      var favoriteCancel = {
        Id: selectedFavorite.Id,
        User: selectedFavorite.User,
        ProcessManagement: processName,
        Status: this.StatusList[1],
        ExpiryDate: new Date()
      };
      this.$axios({
        method: "PUT",
        url: this.$root.HostURL + this.Url + '/' + favoriteCancel.Id,
        data: favoriteCancel
      }).then(res => {
        debugger
      if (res.status == 204) {
          this.getData()
          this.$message.success(`Remove successfully!`);
        } else {
          this.$message.error(`Remove failed!`);
        }
      })
    },
  }
};
</script>

<style>
.message-title {
  cursor: pointer;
}
.handle-row {
  margin-top: 30px;
}
</style>

