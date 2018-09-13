<template>
    <div class="table">
        <div class="container">
          <div class="handle-box">
                  <span class="tableInfoLeft">
                      <span>Status: {{currentStatus}}</span>
                  </span>
                  
                  <span style="margin-left:150px;" class="tableInfoLeft">Team:</span>
                  <el-select size="small" v-model="selectedTeam" @change="teamChange()" placeholder="Select Team">                   
                   <el-option  v-for="item in approverTeams"  :key="item" :label="item" :value="item"> </el-option> 
                  </el-select>
                  <span class="tableInfoLeft">Date:</span>
                  <el-date-picker size="small" class="dateSelector" v-model="yearMonth" type="month" placeholder="Select YearMonth" @change="yearMonthChange()" :picker-options="yearMonthOptions"> </el-date-picker>
                  <div class="right">       
                    <el-button class="saveBtn" size="small" type="primary" icon="el-icon-edit" @click="approveWorkHours" :disabled="currentStatus != 'Draft'">Approve </el-button>  
                    <el-button class="saveBtn" size="small" type="primary" icon="el-icon-download" @click="ExportTeamWorkingHourFTE('workingHour')">ExportWorkingHour </el-button>
                    <el-button class="saveBtn" size="small" type="primary" icon="el-icon-download" @click="ExportTeamWorkingHourFTE('FTE')">ExportFTE </el-button>   
                  </div>         
                <div class="clear"></div>
          </div>
          <div  class="workingHourTable" id="myApprove">
            <el-table :data="tableData"  style="width: 100%" ref="multipleTable"
              show-summary :summary-method="getSummaries" :border="true"
                max-height="500" :highlight-current-row="true">
                <el-table-column prop="Process" label="Process" sortable fixed min-width="230" class-name="processColumn" > </el-table-column>
                <el-table-column  label="Total" min-width="80" fixed>
                     <template slot-scope="scope" >
                     <div>{{Total(scope.$index, scope.row)}}</div>
                    </template>
                  </el-table-column>
                 <el-table-column v-for="(item,index) in approvalUsers" :key="item.User" :label="item.User" :render-header="renderHeader" min-width="120">
                   <template slot-scope="scope" >
                      <div>{{scope.row.SummaryItemList[index].Hours}}</div>
                  </template>
                </el-table-column>
            </el-table>
          </div>
        </div>

         <!-- user detail-->
        <el-dialog title="User detail" :visible.sync="userDetailVisible" width="90%">
          <div class="handle-box">
              <span class="tableInfoLeft">
                  <span>Name: {{detailUser}}</span>
                  <span>{{getMonthName(month,3)}} Working Hour: {{standardWorkingHour.WorkingHour}}</span>
                  <span>Status: {{currentStatus}}</span>
              </span>
                  <div style="float:right">
                    <el-switch size="small"  :disabled="currentStatus != 'Draft'" v-model="workingHourEditable"   inactive-text="Review" active-text="Edit" > </el-switch>
                    <el-button class="saveBtn" size="small" type="primary" icon="el-icon-edit" v-show="workingHourEditable" @click="saveWorkHour">Save </el-button>
                    <el-button class="saveBtn" size="small" type="primary" icon="el-icon-download" @click="ExportWorkingHourFTE('workingHour')">ExportWorkingHour </el-button>
                    <el-button class="saveBtn" size="small" type="primary" icon="el-icon-download" @click="ExportWorkingHourFTE('FTE')">ExportFTE </el-button>
                  </div>
            </div>
          <div  class="workingHourTable">
            <el-table :data="workingHourProcessMonthList"  show-summary :summary-method="getSummariesWorkingHour" :border="false"
                tooltip-effect="light"  max-height="600" style="width:100%" >
                <el-table-column prop="Process" label="Process" sortable fixed min-width="230"> </el-table-column>
                 <el-table-column  label="Total" min-width="120" fixed class-name="alignRight">
                     <template slot-scope="scope" >
                      <div>{{TotalWorkingHour(scope.$index, scope.row)}}</div>
                    </template>
                  </el-table-column>
                 <el-table-column v-for="(item,index) in dayList" :key="item" :label="label(item)" :class-name="workday(item)" min-width="120">
                    <template slot-scope="scope" >
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.SummaryItemList[index].Hours" type="number" class="noBorder"/>
                    </template>
                  </el-table-column>
            </el-table>
          </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
      Url: "api/MyApprovals",
      UrlWorkingHour: "api/MyWorkinghours",
      UrlTeam: "api/Teams",
      UrlStandardWorkingHour: "api/StandardWorkinghours",
      standardWorkingHour: {WorkingHour: 0},
      approverTeams: [],
      selectedTeam: '',
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
      approvalUsers: [],
      // user: '',
      userDetailVisible: false,
      detailUser: '',
      workingHourEditable: false,
      workingHourProcessMonthList: []

    };
  },
  created() {
    this.yearMonth = new Date();
    this.$axios
      .get(
          this.$root.HostURL +
            this.UrlTeam +
            "?approverName=" +
            this.$root.user.Name 
        )
        .then(res => {
          if (res.status == 200 || res.statusText == "OK") {
            this.approverTeams = res.data;
            if(this.approverTeams && this.approverTeams.length > 0){
              this.selectedTeam = this.approverTeams[0]
            }
            this.getData()
          }
        });
  },
  computed: {
    year() {
      return this.yearMonth.getFullYear();
    },
    month() {
      return this.yearMonth.getMonth() + 1;
    },
    dayList() {
      var monthDays = new Date(
        this.yearMonth.getFullYear(),
        this.yearMonth.getMonth() + 1,
        0
      ).getDate();
      var dayList = [];
      for (var i = 1; i <= monthDays; i++) {
        if (i < 10) {
          dayList.push("0" + i);
        } else {
          dayList.push(i);
        }
      }
      return dayList;
    },
    isApproved() {
      if (
        this.tableData &&
        this.tableData.length > 0 &&
        this.tableData[0].SummaryItemList[0] &&
        this.tableData[0].SummaryItemList[0].ApprovalStatus == "Approved"
      ) {
        return true;
      }
      return false;
    },
    currentStatus() {
      if (
        this.tableData &&
        this.tableData.length > 0 &&
        this.tableData[0].SummaryItemList[0] &&
        this.tableData[0].SummaryItemList[0].ApprovalStatus
      ) {
        if(this.tableData[0].SummaryItemList[0].ApprovalStatus == 'Approved'){
          this.workingHourEditable = false
        }
        return this.tableData[0].SummaryItemList[0].ApprovalStatus
      }
      return '';
    }
  },
  methods: {
    getData() {
      if(!this.selectedTeam){
        this.$message.error(`Must select team first`);
        return;
      }
      if(!this.$root.user ||  !this.$root.user.Name){
        this.$message.error(`Please relogin`);
        return;
      }
      this.$axios
        .get(
          this.$root.HostURL +
            this.Url +         
            "?team=" +
            this.selectedTeam +
            "&&yearMonth=" +
            this.yearMonth.toISOString()
        )
        .then(res => {
          if (res.status == 200 || res.statusText == "OK") {
            debugger;
            this.tableData = res.data;
            if (
              this.tableData &&
              this.tableData.length > 0 &&
              this.tableData[0].SummaryItemList
            ) {
              this.approvalUsers = this.tableData[0].SummaryItemList;
            }
          }
        });
    },   
    approveWorkHours() {
      this.$axios({
        method: "put",
        url:
          this.$root.HostURL +
          this.Url +
          "?team=" +
          this.selectedTeam +
          "&&approver=" +
          this.$root.user.Name +
          "&&yearMonth=" +
          this.yearMonth.toISOString()
      }).then(res => {
        debugger;
        if (res.status == 200 && res.data.Status == "1") {
          this.getData();
          this.$message.success(`Approve successfully!`);
        } else {
          this.$message.error(`Approve failed!`);
        }
      });
    },
    ExportTeamWorkingHourFTE(exportType){
      this.$axios
        .get(
          this.$root.HostURL +
            this.Url + '/Export' +
            "?team=" +
            this.selectedTeam +
            "&&yearMonth=" +
            this.yearMonth.toISOString()
            +'&&exportType=' + exportType,
            {
              responseType: 'arraybuffer',
            }
        )
        .then(res => {
          var blob = new Blob([res.data], { type: "application/vnd.ms-excel" }); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
          var downloadElement = document.createElement("a");
          var href = window.URL.createObjectURL(blob);
          downloadElement.href = href;
          var downloadName = exportType + this.year + "-" + this.month + ".xlsx";
          downloadElement.download = downloadName;
          document.body.appendChild(downloadElement);
          if (!!window.ActiveXObject || "ActiveXObject" in window) {
            navigator.msSaveBlob(blob, downloadName);
          } else {
            downloadElement.click();
            document.body.removeChild(downloadElement);
            window.URL.revokeObjectURL(href);
          }
        });
    },
    getWorkingHourData() {
      if(!this.detailUser){
        return
      }
      this.$axios
        .get(
          this.$root.HostURL +
            this.UrlWorkingHour +
            "?userName=" +
            this.detailUser +
            "&&yearMonth=" +
            this.yearMonth.toISOString()
        )
        .then(res => {
          if (res.status == 200 || res.statusText == "OK") {
            this.workingHourProcessMonthList = res.data;
          }
        });
    },
    getStandardWorkingHour(){
      this.$axios
        .get(
          this.$root.HostURL +
            this.UrlStandardWorkingHour +
            '?yearMonth=' +
            this.yearMonth.toISOString()
        )
        .then(res => {
          debugger
          if (res.status == 200 || res.statusText == "OK") {
            if(res.data && res.data.WorkingHour){
              this.standardWorkingHour = res.data;
            }else{
              this.standardWorkingHour = {WorkingHour: 0}
            }
          }
        });
    },
    saveWorkHour() {
      this.$axios({
        method: "post",
        url: this.$root.HostURL + this.UrlWorkingHour,
        data: this.workingHourProcessMonthList
      }).then(res => {
        // this.addVisible = false;
        if (res.status == 201) {
          this.getWorkingHourData();
          this.getData()
          this.$message.success(`Save workHour successfully!`);
        } else {
          this.$message.error(`Save workHour failed!`);
        }
      });
    },    
    
    ExportWorkingHourFTE(exportType){
      this.$axios
        .get(
          this.$root.HostURL +
            this.UrlWorkingHour + '/Export' +
            "?userName=" +
            this.detailUser +
            "&&yearMonth=" +
            this.yearMonth.toISOString()
            +'&&exportType=' + exportType,
            {
              responseType: 'arraybuffer',
            }
        )
        .then(res => {
          var blob = new Blob([res.data], { type: "application/vnd.ms-excel" }); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
          var downloadElement = document.createElement("a");
          var href = window.URL.createObjectURL(blob);
          downloadElement.href = href;
          var downloadName = exportType + this.year + "-" + this.month + ".xlsx";
          downloadElement.download = downloadName;
          document.body.appendChild(downloadElement);
          if (!!window.ActiveXObject || "ActiveXObject" in window) {
            navigator.msSaveBlob(blob, downloadName);
          } else {
            downloadElement.click();
            document.body.removeChild(downloadElement);
            window.URL.revokeObjectURL(href);
          }    　　
        });
    }, 
    yearMonthChange() {
      this.getData();
    },
    teamChange(){
      this.getData()
    },
    detailWorkingHour(mouseEvent) {
      if (
        mouseEvent &&
        mouseEvent.currentTarget &&
        mouseEvent.currentTarget.type == "button" &&
        mouseEvent.currentTarget.name
      ) {
        this.detailUser = mouseEvent.currentTarget.name
        this.getWorkingHourData()
        this.getStandardWorkingHour()
        this.userDetailVisible = true
      }
    },
    renderHeader(h, { column, $index }) {
      // 编辑最后一列的表头
      return h("div", [
        h("div", { style: "display:block;line-height:23px;margin-left:5px;",},column.label),
        h("div", { style: "display:block;line-height:23px;",},[ h("button", {
          domProps: {
            innerHTML: '<i class="el-icon-edit"></i><span>detail</span>'
          },
          class: {
            "el-button": true,
            "el-button--primary": true,
            "el-button--mini": true
          },
          //   attrs: { type: "primary", icon: "el-icon-edit", size: "mini", name: column.label, value:column.label },
          attrs: { type: "button", name: column.label, value: column.label },
          style: "margin-left: 0;",
          on: {
            click: this.detailWorkingHour
          }
        })]),  
      ]);
    },
    Total(index, row) {
      const item = this.tableData[index];
      var total = 0;
      if (row && row.SummaryItemList) {
        for (
          var i = 0, length = row.SummaryItemList.length;
          i < length;
          i++
        ) {
          total += Number.parseFloat(
            row.SummaryItemList[i].Hours
          );
        }
        return total;
      } else {
        return 0;
      }
    },
    getSummaries(param) {
      const { columns, WorkingHourProcessApproverMonthList } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "Sum";
          return;
        }
        if (index == 1) {
          if (this.tableData && this.tableData.length > 0) {
            var total = 0;
            for (var i = 0, iLength = this.tableData.length; i < iLength; i++) {
              var WorkingHourProcessApproverMonth = this.tableData[i];
              for (
                var j = 0,
                  jLen =
                    WorkingHourProcessApproverMonth.SummaryItemList.length;
                j < jLen;
                j++
              ) {
                var value = Number(
                  WorkingHourProcessApproverMonth.SummaryItemList[j].Hours
                );
                if (isNaN(value)) {
                  value = 0;
                }
                total += value;
              }
            }
            sums[index] = total;
          } else {
            sums[index] = 0;
          }
          return;
        }
        if (this.tableData && this.tableData.length > 0) {
          var sumHours = this.tableData.map(WorkingHourProcessApproverMonth =>
            Number(
              WorkingHourProcessApproverMonth.SummaryItemList[index - 2].Hours
            )
          );
          if (!sumHours.every(value => isNaN(value))) {
            sums[index] = sumHours.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = 0;
          }
          //sums[index] = 2
        } else {
          sums[index] = 0;
        }
      });
      return sums;
    },
    label(day) {
      var date = new Date(this.yearMonth.getFullYear(), this.yearMonth.getMonth(), day);
      return (
        this.month + "-" + day + "   " + date.toDateString().substring(0, 3)
      );
    },
    workday(day) {
      var date = new Date(this.yearMonth.getFullYear(), this.yearMonth.getMonth(), day);
      if (date.getDay() >= 1 && date.getDay() <= 5) {
        return "workday alignRight";
      } else {
        return "weekend alignRight";
      }
    },
    TotalWorkingHour(index, row) {    
      var total = 0;
      if (row && row.SummaryItemList) {
        for (var i = 0, length = row.SummaryItemList.length; i < length; i++) {
          total += Number.parseFloat(row.SummaryItemList[i].Hours);
        }
        return total;
      } else {
        return 0;
      }
    },
    getSummariesWorkingHour(param) {
      const { columns, workingHourProcessMonthList } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "Sum";
          return;
        }
        if (index == 1) {
          if (
            this.workingHourProcessMonthList &&
            this.workingHourProcessMonthList.length > 0
          ) {
            var total = 0;
            for (
              var i = 0, iLength = this.workingHourProcessMonthList.length;
              i < iLength;
              i++
            ) {
              var workingHourProcessMonth = this.workingHourProcessMonthList[i];
              for (
                var j = 0,
                  jLen = workingHourProcessMonth.SummaryItemList.length;
                j < jLen;
                j++
              ) {
                var value = Number(
                  workingHourProcessMonth.SummaryItemList[j].Hours
                );
                if (isNaN(value)) {
                  value = 0;
                }
                total += value;
              }
            }
            sums[index] = total;
          } else {
            sums[index] = 0;
          }
          return;
        }
        if (
          this.workingHourProcessMonthList &&
          this.workingHourProcessMonthList.length > 0
        ) {
          var sumHours = this.workingHourProcessMonthList.map(
            workingHourProcessMonth =>
              Number(workingHourProcessMonth.SummaryItemList[index - 2].Hours)
          );
          if (!sumHours.every(value => isNaN(value))) {
            sums[index] = sumHours.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = 1;
          }
          //sums[index] = 2
        } else {
          sums[index] = 1;
        }
      });
      return sums;
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
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
#myWorkingHourTable input {
  border-style: none;
}
.saveBtn {
  margin-left: 30px;
}
</style>
