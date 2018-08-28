<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                  <span style="margin-left:5px">
                  </span>
                  <el-date-picker style="left:40%" v-model="yearMonth" type="month" placeholder="Select YearMonth" @change="yearMonthChange()" :picker-options="yearMonthOptions">    </el-date-picker>
                  <div style="float:right">
                    <el-button class="saveBtn" v-show="workingHourEditable" size="mini"  type="primary" icon="el-icon-edit" @click="saveWorkHour">Approve </el-button>
                  </div>

            </div>
            <div  id="myWorkingHourTable">
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable"
              show-summary :summary-method="getSummaries" :border="false"
                max-height="500" :fit="true">
                <!-- <el-table-column v-for="item in worktimeData" :prop="item" :key="item" label="item" sortable >          </el-table-column> -->
                <el-table-column prop="Process" label="Process" sortable fixed min-width="160" >  eee <el-button>detail</el-button>       </el-table-column>
                 <el-table-column  label="Total" min-width="100" fixed>
                     <template slot-scope="scope" >
                     <div>{{Total(scope.$index, scope.row)}}</div>
                    </template>
                  </el-table-column>


                 <el-table-column v-for="(item,index) in teamMembers" :key="item.User" :label="item.User "  >
                   <el-button>detail</el-button>
                   <template slot-scope="scope" >
                      <div>{{scope.row.WorkingHourMemberProcessMonthList[index].Hours}}</div>
                  </template>
                </el-table-column>

            </el-table>
            </div>
        </div>

    </div>
</template>

<script>
export default {
  data() {
    return {
      Url: "api/MyApprovals",
      workingHourEditable: true,
      yearMonth: new Date(),
      yearMonthOptions: {
           disabledDate(time) {
            return time.getTime() > new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
          },
      },
      tableData: [],
      WorkingHourMemberProcessMonthList: [],
      teamMembers: []
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
    days() {
      return new Date(
        this.yearMonth.getFullYear(),
        this.yearMonth.getMonth() + 1,
        0
      ).getDate();
    },

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
            //this.WorkingHourTeamProcessMonthList = res.data;
            if(this.tableData && this.tableData.length > 0 &&
            this.tableData[0] && this.tableData[0].WorkingHourMemberProcessMonthList){
              this.teamMembers = this.tableData[0].WorkingHourMemberProcessMonthList
            }
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
          debugger
        this.addVisible = false;
        if (res.status == 201) {
          this.getData();
          this.$message.success(`Save workHour successfully!`);
        } else {
          this.$message.error(`Save workHour failed!`);
        }
      });
    },
    renderHeader(param){
      debugger
      const { columns, workingHourProcessMonthList } = param;
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
      if (row && row.WorkingHourMemberProcessMonthList) {
        for (var i = 0, length = row.WorkingHourMemberProcessMonthList.length; i < length; i++) {
          total += Number.parseFloat(row.WorkingHourMemberProcessMonthList[i].Hours);
        }
        return total;
      } else {
        return 0;
      }
    },
    getSummaries(param) {
      const { columns, WorkingHourTeamProcessMonthList } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "Sum";
          return;
        }
        if (index == 1) {
          if (
            this.tableData &&
            this.tableData.length > 0
          ) {
            var total = 0;
            for (
              var i = 0, iLength = this.tableData.length; i < iLength; i++
            ) {
              var WorkingHourTeamProcessMonth = this.tableData[i];
              for (
                var j = 0,
                  jLen = WorkingHourTeamProcessMonth.WorkingHourMemberProcessMonthList.length;
                j < jLen;
                j++
              ) {
                var value = Number(
                  WorkingHourTeamProcessMonth.WorkingHourMemberProcessMonthList[j].Hours
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
        debugger;
        if (
          this.tableData &&
          this.tableData.length > 0
        ) {
          var sumHours = this.tableData.map(
            WorkingHourTeamProcessMonth =>
              Number(WorkingHourTeamProcessMonth.WorkingHourMemberProcessMonthList[index - 2].Hours)
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
    }
    //       const values = data.map(item => Number(item[column.property]));
    //       if (!values.every(value => isNaN(value))) {
    //         sums[index] = values.reduce((prev, curr) => {
    //           const value = Number(curr);
    //           if (!isNaN(value)) {
    //             return prev + curr;
    //           } else {
    //             return prev;
    //           }
    //         }, 0);
    //         sums[index] += ' 元';
    //       } else {
    //         sums[index] = 'N/A';
    //       }
    //     });

    //     return sums;
    //   }
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
