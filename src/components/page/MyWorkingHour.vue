<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
              <span class="tableInfoLeft">
                  <span>Name: {{currentUser}}</span>
                  <span>{{getMonthName(yearMonth.getMonth(),3)}} Working Hour: {{standardWorkingHour.WorkingHour}}</span>
                  <span>Status: {{currentStatus}}</span>
              </span>
                  <el-date-picker size="small" style="margin-left:100px;" class="dateSelector"  align="center" v-model="yearMonth" type="month" placeholder="Select YearMonth" @change="yearMonthChange()" :picker-options="yearMonthOptions">    </el-date-picker>
                  <div class="right">                 
                    <el-switch size="mini" :disabled="currentStatus != 'Draft'" v-model="workingHourEditable"   inactive-text="Review" active-text="Edit" > </el-switch>
                    <el-button class="saveBtn" size="small"  type="primary" icon="el-icon-edit" v-show="workingHourEditable && currentStatus == 'Draft'"   @click="saveWorkHour">Save </el-button>
                    <el-button class="saveBtn" size="small"  type="primary" icon="el-icon-download" @click="ExportWorkingHourFTE('workingHour')">ExportWorkingHour </el-button>
                    <el-button class="saveBtn" size="small"  type="primary" icon="el-icon-download" @click="ExportWorkingHourFTE('FTE')">ExportFTE </el-button>
                  </div>
                  <div class="clear"></div>
            </div>
            <div  class="workingHourTable">
            <el-table :data="tableData" style="width: 100%" ref="multipleTable" v-loading="loading"
                show-summary :summary-method="getSummaries" :border="false" max-height="600"
                tooltip-effect="light" :highlight-current-row="true" >
                <el-table-column prop="Process" label="Process" sortable fixed  min-width="230"> </el-table-column>
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
      UrlStandardWorkingHour: "api/StandardWorkinghours",
      standardWorkingHour: { WorkingHour: 0 },
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
      loading: false,
      savingAction: 0
    };
  },
  created() {
    this.yearMonth = new Date();
    this.getData();
    this.getStandardWorkingHour();
  },
  beforeRouteLeave(to, from, next) {
    if (this.savingAction < 1 && this.currentStatus == "Draft") {
      this.$confirm("Leave without saving data!", "Warning", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        type: "warning"
      })
        .then(() => {
          next();
        })
        .catch(() => {
          next(false);
        });
    } else {
      next();
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
        return this.tableData[0].SummaryItemList[0].User;
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
    currentStatus() {
      if (
        this.tableData &&
        this.tableData[0] &&
        this.tableData[0].SummaryItemList[0] &&
        this.tableData[0].SummaryItemList[0].ApprovalStatus
      ) {
        if (this.tableData[0].SummaryItemList[0].ApprovalStatus == "Approved") {
          this.workingHourEditable = false;
        }
        return this.tableData[0].SummaryItemList[0].ApprovalStatus;
      } else {
        return "";
      }
    }
  },
  methods: {
    getData() {
      this.loading = true
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
            this.tableData = res.data;            
          }
          this.loading = false
        });
    },
    getStandardWorkingHour() {
      this.$axios
        .get(
          this.$root.HostURL +
            this.UrlStandardWorkingHour +
            "?yearMonth=" +
            this.yearMonth.toISOString()
        )
        .then(res => {
          debugger;
          if (res.status == 200 || res.statusText == "OK") {
            if (res.data && res.data.WorkingHour) {
              this.standardWorkingHour = res.data;
            } else {
              this.standardWorkingHour = { WorkingHour: 0 };
            }
          }
        });
    },
    yearMonthChange() {
      this.getData();
      this.getStandardWorkingHour();
    },
    saveWorkHour() {
      this.savingAction++;
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
    ExportWorkingHourFTE(exportType) {
      this.$axios
        .get(
          this.$root.HostURL +
            this.Url +
            "/Export" +
            "?userName=" +
            this.$root.user.Name +
            "&&yearMonth=" +
            this.yearMonth.toISOString() +
            "&&exportType=" +
            exportType,
          {
            responseType: "arraybuffer"
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
      var date = new Date(
        this.yearMonth.getFullYear(),
        this.yearMonth.getMonth(),
        day
      );
      return (
        this.month + "-" + day + "   " + date.toDateString().substring(0, 3)
      );
    },
    workday(day) {
      var date = new Date(
        this.yearMonth.getFullYear(),
        this.yearMonth.getMonth(),
        day
      );
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
          if (this.tableData && this.tableData.length > 0) {
            var total = 0;
            for (var i = 0, iLength = this.tableData.length; i < iLength; i++) {
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
        if (this.tableData && this.tableData.length > 0) {
          var sumHours = this.tableData.map(workingHourProcessDay =>
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
