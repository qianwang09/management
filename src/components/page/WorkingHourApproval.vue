<template>
    <div class="table">
        <div class="container">
             <div class="handle-box">
                <span style="margin-left:5px"></span>
                <div class="dateSelector"  >                
                  <el-date-picker align="center" v-model="yearMonth" type="month" placeholder="Select YearMonth" :picker-options="yearMonthOptions" @change="yearMonthChange()"> </el-date-picker>
                  <el-button class="saveBtn right" size="small"  type="primary" icon="el-icon-check" :disabled="!allApproved" @click="generateReportClick">Generate Report </el-button>
                </div>
                <div class="clear"></div>
          </div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="Id" label="Id"   min-width="60"> </el-table-column>
                <el-table-column prop="Team" label="Team" sortable  min-width="100"> </el-table-column>               
                <el-table-column prop="ApprovalStatus" label="Status" sortable  min-width="100"> </el-table-column>               
                <el-table-column label="Operation" min-width="100">
                    <template slot-scope="scope">
                        <el-button size="small" :type="notApproved(scope.row)? 'info': 'primary'"   @click="handleReject(scope.$index, scope.row)" :disabled="notApproved(scope.row)">Reject</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="Message" :visible.sync="generateReportVisible" width="300px" center>
            <div class="del-dialog-cnt">Are you sure to generate month report, this operation can't be cancelled</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="generateReportVisible = false">Cancel</el-button>
                <el-button type="primary" @click="generateMonthlyReport">OK</el-button>
            </span>
        </el-dialog>
  
    </div>
</template>

<script>
export default {
  name: "basetable",
  data() {
    return {
      Url: "api/WorkingHourApprovals",
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
      allApproved: true, 
      generateReportVisible : false,
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
    generateReportClick(){
      this.generateReportVisible = true
    },
    generateMonthlyReport(){
      this.$axios({
        method: "put",
        url:
          this.$root.HostURL +
          this.Url +    
          "?yearMonth=" +
          this.yearMonth.toISOString() +
          '&&action=close'
      }).then(res => {        
        if (res.status == 200) {
          this.getData()
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
    notApproved(row){
      if(row.ApprovalStatus && row.ApprovalStatus == 'Approved'){
        return false
      }
      return true
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
