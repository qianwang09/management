<template>
    <div class="table">
        <div class="container">
          <div class="handle-box">
                <span style="margin-left:5px"></span>
                <el-date-picker style="left:40%" v-model="yearMonth" type="month" placeholder="Select YearMonth" @change="yearMonthChange()" :picker-options="yearMonthOptions">    </el-date-picker>
                <div style="float:right">
                    <el-button class="saveBtn" size="mini"  type="primary" icon="el-icon-edit" @click="approveWorkHours" :disabled="isApproved">Approve </el-button>
                </div>
          </div>
          <div  class="myWorkingHourTable">
            <el-table :data="tableData"  style="width: 100%" ref="multipleTable"
              show-summary :summary-method="getSummaries" :border="true"
                max-height="500" :highlight-current-row="true">
                <el-table-column prop="Process" label="Process" sortable fixed min-width="160" >  eee <el-button>detail</el-button>       </el-table-column>
                 <el-table-column  label="Total" min-width="100" fixed>
                     <template slot-scope="scope" >
                     <div>{{Total(scope.$index, scope.row)}}</div>
                    </template>
                  </el-table-column>
                 <el-table-column v-for="(item,index) in teamMembers" :key="item.User" :label="item.User" :render-header="renderHeader">
                   <template slot-scope="scope" >
                      <div>{{scope.row.WorkingHourProcessUserMonthList[index].Hours}}</div>
                  </template>
                </el-table-column>
            </el-table>
          </div>
        </div>

         <!-- user detail-->
        <el-dialog title="User detail" :visible.sync="userDetailVisible" width="90%">
          <div class="handle-box">
                  <span style="margin-left:5px">{{user}}
                  </span>
                  <div style="float:right">
                    <el-switch :disabled="isApproved" v-model="workingHourEditable"   inactive-text="Review" active-text="Edit" > </el-switch>
                    <el-button class="saveBtn" v-show="workingHourEditable" size="mini"  type="primary" icon="el-icon-edit" @click="saveWorkHour">Save </el-button>
                  </div>
            </div>
          <div  class="myWorkingHourTable">
            <el-table :data="workingHourProcessMonthList"  show-summary :summary-method="getSummariesWorkingHour" :border="false"
                tooltip-effect="light"  max-height="600" style="width:100%" >
                <el-table-column prop="Process" label="Process" sortable fixed min-width="210"> </el-table-column>
                 <el-table-column  label="Total" min-width="120" fixed>
                     <template slot-scope="scope" >
                      <div>{{TotalWorkingHour(scope.$index, scope.row)}}</div>
                    </template>
                  </el-table-column>
                 <el-table-column v-for="(item,index) in dayList" :key="item" :label="label(item)" :class-name="workday(item)" min-width="120">
                    <template slot-scope="scope" >
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[index].Hours" type="number" class="noBorder"/>
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
      // WorkingHourProcessUserMonthList: [],
      teamMembers: [],
      user: '',
      userDetailVisible: false,
      detailUser: '',
      workingHourEditable: false,
      workingHourProcessMonthList: []

    };
  },
  created() {
    this.yearMonth = new Date();
    this.getData();
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
      for (var i = 1; i < monthDays; i++) {
        if (i < 10) {
          dayList.push("0" + i);
        } else {
          dayList.push(i);
        }
      }
      return dayList
    },
    isApproved() {
      if (
        this.tableData &&
        this.tableData.length > 0 &&
        this.tableData[0].ApprovalStatus == "Approved"
      ) {
        return true;
      }
      return false;
    }
  },
  methods: {
    getData() {
      this.$axios
        .get(
          this.$root.HostURL +
            this.Url +
            "?userName=" +
            this.$root.user.Name +
            "&&yearMonth=" +
            this.yearMonth.toISOString()
        )
        .then(res => {
          if (res.status == 200 || res.statusText == "OK") {
            debugger;
            this.tableData = res.data;
            //this.WorkingHourProcessApproverMonthList = res.data;
            if (
              this.tableData &&
              this.tableData.length > 0 &&
              this.tableData[0] &&
              this.tableData[0].WorkingHourProcessUserMonthList
            ) {
              this.teamMembers = this.tableData[0].WorkingHourProcessUserMonthList;
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
          "?userName=" +
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
    getWorkingHourData() {
      if(!this.user){
        return
      }
      this.$axios
        .get(
          this.$root.HostURL +
            this.UrlWorkingHour +
            "?userName=" +
            this.user +
            "&&yearMonth=" +
            this.yearMonth.toISOString()
        )
        .then(res => {
          if (res.status == 200 || res.statusText == "OK") {
            this.workingHourProcessMonthList = res.data;
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
          this.$message.success(`Save workHour successfully!`);
        } else {
          this.$message.error(`Save workHour failed!`);
        }
      });
    },
    yearMonthChange() {
      this.getData();
    },
    saveWorkHour() {
      this.$axios({
        method: "post",
        url: this.$root.HostURL + this.Url,
        data: this.workingHourProcessMonthList
      }).then(res => {
        this.addVisible = false;
        if (res.status == 201) {
          this.getData();
          this.$message.success(`Save workHour successfully!`);
        } else {
          this.$message.error(`Save workHour failed!`);
        }
      });
    },
    detailWorkingHour(mouseEvent) {
      if (
        mouseEvent &&
        mouseEvent.currentTarget &&
        mouseEvent.currentTarget.type == "button" &&
        mouseEvent.currentTarget.name
      ) {
        this.user = mouseEvent.currentTarget.name
        this.getWorkingHourData()
        this.userDetailVisible = true
      }
    },
    renderHeader(h, { column, $index }) {
      // 编辑最后一列的表头
      return h("div", [
        h("span", column.label),
        h("button", {
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
          style: "margin-left: 5px;",
          on: {
            click: this.detailWorkingHour
          }
        })
      ]);
    },
    workday(day) {
      var date = new Date(this.year, this.month, day);
      if (date.getDay() >= 1 && date.getDay() <= 5) {
        return "workday";
      } else {
        return "weekend";
      }
    },
    Total(index, row) {
      const item = this.tableData[index];
      var total = 0;
      if (row && row.WorkingHourProcessUserMonthList) {
        for (
          var i = 0, length = row.WorkingHourProcessUserMonthList.length;
          i < length;
          i++
        ) {
          total += Number.parseFloat(
            row.WorkingHourProcessUserMonthList[i].Hours
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
                    WorkingHourProcessApproverMonth
                      .WorkingHourProcessUserMonthList.length;
                j < jLen;
                j++
              ) {
                var value = Number(
                  WorkingHourProcessApproverMonth.WorkingHourProcessUserMonthList[
                    j
                  ].Hours
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
              WorkingHourProcessApproverMonth.WorkingHourProcessUserMonthList[
                index - 2
              ].Hours
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
      var date = new Date(this.year, this.month, day);
      return (
        this.month + "-" + day + "   " + date.toDateString().substring(0, 3)
      );
    },
   workday(day) {
      var date = new Date(this.year, this.month, day);
      if (date.getDay() >= 1 && date.getDay() <= 5) {
        return "workday";
      } else {
        return "weekend";
      }
    },
    TotalWorkingHour(index, row) {
      const item = this.tableData[index];
      this.editForm = item;
      this.editVisible = true;
      var total = 0;
      if (row && row.workingHourList) {
        for (var i = 0, length = row.workingHourList.length; i < length; i++) {
          total += Number.parseFloat(row.workingHourList[i].Hours);
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
                  jLen = workingHourProcessMonth.workingHourList.length;
                j < jLen;
                j++
              ) {
                var value = Number(
                  workingHourProcessMonth.workingHourList[j].Hours
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
              Number(workingHourProcessMonth.workingHourList[index - 2].Hours)
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
