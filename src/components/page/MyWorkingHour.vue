<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                  <span style="margin-left:5px">{{currentUser}}
                  </span>
                  <el-date-picker class="dateSelector"  align="center" v-model="yearMonth" type="month" placeholder="Select YearMonth" @change="yearMonthChange()" :picker-options="yearMonthOptions">    </el-date-picker>
                  <div class="right">
                    <span style="margin-right:50px">{{currentStatus}}</span>
                    <el-switch :disabled="currentStatus == 'Approved'" v-model="workingHourEditable"   inactive-text="Review" active-text="Edit" > </el-switch>
                    <el-button class="saveBtn" v-show="workingHourEditable && currentStatus == 'Draft'" size="mini"  type="primary" icon="el-icon-edit" @click="saveWorkHour">Save </el-button>
                    <el-button class="saveBtn"  type="primary" icon="el-icon-edit" @click="ExportWorkingHour">ExportWorkingHour </el-button>
                  </div>
                  <div class="clear"></div>
            </div>
            <div  class="workingHourTable">
            <el-table :data="tableData" style="width: 100%" ref="multipleTable"
                show-summary :summary-method="getSummaries" :border="false" max-height="600"
                tooltip-effect="light" :highlight-current-row="true" >
                <el-table-column prop="Process" label="Process" sortable fixed  min-width="220"> </el-table-column>
                <el-table-column  label="Total" fixed class-name="alignRight"  min-width="80">
                     <template slot-scope="scope" >
                      <div>{{Total(scope.$index, scope.row)}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column v-for="(item,index) in dayList" :key="item" :label="label(item)" :class-name="workday(item)" min-width="100">
                    <template slot-scope="scope" >
                      <el-input  :readonly="!workingHourEditable" size="medium" v-model="scope.row.SummaryItemList[index].Hours" type="number" class="noBorder"/>
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
      Url: "api/MyWorkinghours",
      workingHourEditable: true,
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
      savingAction: 0
    };
  },
  created() {
    this.yearMonth = new Date();
    this.getData();
  },
  beforeRouteLeave (to, from , next) {
    if(this.savingAction < 1 && this.currentStatus == 'Draft'){
       this.$confirm('Leave without saving data!', 'Warning', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
         next()
        }).catch(() => {
         next(false)
        });
    }else{
    next()
    }
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
    currentUser() {
      if (
        this.tableData &&
        this.tableData[0] &&
        this.tableData[0].SummaryItemList[0] &&
        this.tableData[0].SummaryItemList[0].User
      ) {
        return this.tableData[0].SummaryItemList[0].User
      } else {
        return "";
      }
    },
    isApproved() {
      if (
        this.tableData &&
        this.tableData[0] &&
        this.tableData[0].SummaryItemList[0] &&
        this.tableData[0].SummaryItemList[0].ApprovalStatus == "Approved"
      ) {
        this.workingHourEditable = false;
        return true;
      }
      return false;
    },
    currentStatus(){
       if (
        this.tableData &&
        this.tableData[0] &&
        this.tableData[0].SummaryItemList[0] &&
        this.tableData[0].SummaryItemList[0].ApprovalStatus
      ){
        if(this.tableData[0].SummaryItemList[0].ApprovalStatus == 'Approved'){
          this.workingHourEditable = false
        }
        return this.tableData[0].SummaryItemList[0].ApprovalStatus
      }else{
        return ''
      }
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
          debugger
          if (res.status == 200 || res.statusText == "OK") {
            this.tableData = res.data;
            this.tableData = res.data;
          }
        });
    },
    yearMonthChange() {
      this.getData();
    },
    saveWorkHour() {
      this.savingAction++
      this.$axios({
        method: "post",
        url: this.$root.HostURL + this.Url,
        data: this.tableData
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
    detailWorkingHour(name) {
      console.log(name);
      alert(name.srcElement.name);
    },
    ExportWorkingHour(){
      this.$axios
        .get(
          this.$root.HostURL +
            this.Url + '/Export' +
            "?userName=" +
            this.$root.user.Name +
            "&&yearMonth=" +
            this.yearMonth.toISOString()
            +'&&exportExcel=export',
            {
              responseType: 'arraybuffer',
            }
        )
        .then(res => {
          debugger
      var blob = new Blob([res.data], {type: 'application/vnd.ms-excel'}); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
    　　var downloadElement = document.createElement('a');
    　　var href = window.URL.createObjectURL(blob); //创建下载的链接
    　　downloadElement.href = href;
    　　downloadElement.download = 'xxx.xlsx'; //下载后文件名
    　　document.body.appendChild(downloadElement);
    　　downloadElement.click(); //点击下载
    　　document.body.removeChild(downloadElement); //下载完成移除元素
    　　window.URL.revokeObjectURL(href); //释放掉blob对象
        });
    },
    renderHeader(h, { column, $index }) {
      return h("span", [
        h("span", column.label),
        h(
          "button",
          {
            domProps: {
              innerHTML: '<i class="el-icon-edit"></i><span>edit </span>'
            },
            class: {
              "el-button": true,
              "el-button--primary": true,
              "el-button--mini": true
            },
            //   attrs: { type: "primary", icon: "el-icon-edit", size: "mini", name: column.label, value:column.label },
            attrs: { type: "button", name: column.label, value: column.label },
            style: "margin-left: -1px;",
            on: {
              click: this.detailWorkingHour
            }
          },
          "edit "
        )
      ]);
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
    Total(index, row) {
      const item = this.tableData[index];
      this.editForm = item;
      this.editVisible = true;
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
    getSummaries(param) {
      const { columns, tableData } = param;
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
              var i = 0, iLength = this.tableData.length;
              i < iLength;
              i++
            ) {
              var workingHourProcessMonth = this.tableData[i];
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
          this.tableData &&
          this.tableData.length > 0
        ) {
          var sumHours = this.tableData.map(
            workingHourProcessDay =>
              Number(workingHourProcessDay.SummaryItemList[index - 2].Hours)
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
.saveBtn {
  margin-left: 30px;
}
</style>
