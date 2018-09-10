<template>
    <div class="table">
        <div class="container">
             <div class="handle-box">
                <span style="margin-left:5px"></span>
                <div class="dateSelector"  >                
                  <el-date-picker align="center" v-model="yearMonth" type="month" placeholder="Select YearMonth" @change="yearMonthChange()" :picker-options="yearMonthOptions">    </el-date-picker>
                  <el-button class="saveBtn right" size="small"  type="primary" icon="el-icon-check"  @click="closeWorkingHour" :disabled="!allApproved">Close </el-button>
                </div>
                <div class="clear"></div>
          </div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="Id" label="Id"   min-width="60"> </el-table-column>
                <el-table-column prop="Team" label="Team" sortable  min-width="100"> </el-table-column>               
                <el-table-column prop="ApprovalStatus" label="Status" sortable  min-width="100"> </el-table-column>               
                <el-table-column label="Operation" min-width="100">
                    <template slot-scope="scope">
                        <el-button size="small" :type="isDraft(scope.row)? 'info': 'primary'"   @click="handleReject(scope.$index, scope.row)" :disabled="isDraft(scope.row)">Reject</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

  
    </div>
</template>

<script>
export default {
  name: "basetable",
  data() {
    return {
      Url: "api/ApprovalProcesses",
      yearMonth: new Date(),
      yearMonthOptions: {
        disabledDate(time) {
          return (
            time.getTime() >
            new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
          );
        }
      },
      tableData: [],  
      allApproved: false, 
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    data() {
      return this.tableData;
    }
  },
  methods: {    
    getData() {
      this.$axios.get(this.$root.HostURL + this.Url +  "?yearMonth=" + this.yearMonth.toISOString()).then(res => {
        debugger;
        if (res.status == 200 || res.statusText == "OK") {
          this.tableData = res.data;
        }
      });
    },
    closeWorkingHour(){
      this.$axios({
        method: "put",
        url:
          this.$root.HostURL +
          this.Url +
          '?action=close' +         
          "&&yearMonth=" +
          this.yearMonth.toISOString()
      }).then(res => {
        debugger;
        if (res.status == 200 && res.data.Status == "1") {
          this.$message.success(`Close successfully!`);
        } else {
          this.$message.error(`Close failed!`);
        }
      });
    },
     yearMonthChange(){
      this.getData()
    },
    handleReject(index, row) {
      this.$axios({
        method: "put",
        url:  this.$root.HostURL + this.Url +  "/" + row.Id,
        data: row
      }).then(res => {
        if (res.status == 204) {
          this.getData();
          this.$message.success(`Reject record successfully!`);
        } else {
          this.$message.error(`Reject record failed!`);
        }
      });
    },   
    isDraft(row){
      if(row.ApprovalStatus == 'Draft'){
        return true
      }
      return false
    }
  }
    
}
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
