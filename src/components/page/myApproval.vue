<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                  <span style="margin-left:5px">{{currentUser}}
                  </span>
                  <el-date-picker style="left:40%" v-model="yearMonth" type="month" placeholder="Select YearMonth" @change="yearMonthChange()" :picker-options="yearMonthOptions">    </el-date-picker>
                  <div style="float:right">
                    <el-switch  v-model="workingHourEditable"   inactive-text="Review" active-text="Edit" > </el-switch>
                    <el-button class="saveBtn" v-show="workingHourEditable" size="mini"  type="primary" icon="el-icon-edit" @click="saveWorkHour">Save </el-button>
                  </div>

            </div>
            <div  id="myWorkingHourTable">
            <el-table :data="workingHourProcessMonthList" border style="width: 100%" ref="multipleTable"
                show-summary :summary-method="getSummaries" max-height="500">
                <!-- <el-table-column v-for="item in worktimeData" :prop="item" :key="item" label="item" sortable >          </el-table-column> -->
                <el-table-column prop="Process" label="Process" sortable fixed min-width="210">          </el-table-column>
                 <el-table-column  label="Total" min-width="120" fixed>
                     <template slot-scope="scope" >
                      <div>{{Total(scope.$index, scope.row)}}</div>
                      <!-- <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[0].Hours" type="number"/> -->
                    </template>
                  </el-table-column>
                 <el-table-column  :label="label('01')" :class-name="workday('01')" min-width="120" >   <template slot-scope="scope" >
                      <!-- <div v-show="!workingHourEditable">{{scope.row.workingHourList[0].Hours}}</div> -->
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[0].Hours" type="number" class="noBorder"/>
                  </template>  </el-table-column>
                <el-table-column  :label="label('02')" :class-name="workday('02')" min-width="120">   <template slot-scope="scope">
                      <!-- <div v-show="!workingHourEditable">{{scope.row.workingHourList[1].Hours}}</div> -->
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[1].Hours" type="number" class="noBorder"/>
                  </template>  </el-table-column>
                  <el-table-column  :label="label('03')" :class-name="workday('03')" min-width="120">   <template slot-scope="scope">
                      <!-- <div v-show="!workingHourEditable">{{scope.row.workingHourList[2].Hours}}</div> -->
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[2].Hours"  type="number" class="noBorder"/>
                  </template>  </el-table-column>
                  <el-table-column  :label="label('04')" :class-name="workday('04')" min-width="120">   <template slot-scope="scope">
                      <!-- <div v-show="!workingHourEditable">{{scope.row.workingHourList[3].Hours}}</div> -->
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[3].Hours" type="number"/>
                  </template>  </el-table-column>
                  <el-table-column  :label="label('05')" :class-name="workday('05')" min-width="120">   <template slot-scope="scope">
                      <!-- <div v-show="!workingHourEditable">{{scope.row.workingHourList[4].Hours}}</div> -->
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[4].Hours" type="number"/>
                  </template>  </el-table-column>
                  <el-table-column  :label="label('06')" :class-name="workday('06')" min-width="120">   <template slot-scope="scope">
                      <!-- <div v-show="!workingHourEditable">{{scope.row.workingHourList[5].Hours}}</div> -->
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[5].Hours" type="number"/>
                  </template>  </el-table-column>
                  <el-table-column  :label="label('07')" :class-name="workday('07')"  min-width="120">   <template slot-scope="scope">
                      <!-- <div v-show="!workingHourEditable" min-width="120">{{scope.row.workingHourList[6].Hours}}</div> -->
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[6].Hours" type="number"/>
                  </template>  </el-table-column>
                  <el-table-column  :label="label('08')" :class-name="workday('08')" min-width="120">   <template slot-scope="scope">
                      <!-- <div v-show="!workingHourEditable">{{scope.row.workingHourList[7].Hours}}</div> -->
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[7].Hours" type="number"/>
                  </template>  </el-table-column>
                  <el-table-column  :label="label('09')" :class-name="workday('09')" min-width="120">   <template slot-scope="scope">
                      <!-- <div v-show="!workingHourEditable">{{scope.row.workingHourList[8].Hours}}</div> -->
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[8].Hours" type="number"/>
                  </template>  </el-table-column>
                  <el-table-column  :label="label('10')" :class-name="workday('10')" min-width="120">   <template slot-scope="scope">
                      <!-- <div v-show="!workingHourEditable">{{scope.row.workingHourList[9].Hours}}</div> -->
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[9].Hours" type="number"/>
                  </template>  </el-table-column>




                  <el-table-column  :label="label('11')" :class-name="workday('11')" min-width="120">   <template slot-scope="scope" >
                      <!-- <div v-show="!workingHourEditable">{{scope.row.workingHourList[10].Hours}}</div> -->
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[10].Hours"  type="number"/>
                  </template>  </el-table-column>
                <el-table-column  :label="label('12')" :class-name="workday('12')" min-width="120">   <template slot-scope="scope">
                      <!-- <div v-show="!workingHourEditable">{{scope.row.workingHourList[11].Hours}}</div> -->
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[11].Hours"  type="number"/>
                  </template>  </el-table-column>
                  <el-table-column  :label="label('13')" :class-name="workday('13')" min-width="120">   <template slot-scope="scope">
                      <!-- <div v-show="!workingHourEditable">{{scope.row.workingHourList[12].Hours}}</div> -->
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[12].Hours" type="number"/>
                  </template>  </el-table-column>
                  <el-table-column  :label="label('14')" :class-name="workday('14')" min-width="120">   <template slot-scope="scope">
                      <!-- <div v-show="!workingHourEditable">{{scope.row.workingHourList[13].Hours}}</div> -->
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[13].Hours" type="number"/>
                  </template>  </el-table-column>
                  <el-table-column  :label="label('15')" :class-name="workday('15')" min-width="120">   <template slot-scope="scope">
                      <!-- <div v-show="!workingHourEditable">{{scope.row.workingHourList[14].Hours}}</div> -->
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[14].Hours"  type="number"/>
                  </template>  </el-table-column>
                  <el-table-column  :label="label('16')" :class-name="workday('16')" min-width="120">   <template slot-scope="scope">
                      <!-- <div v-show="!workingHourEditable">{{scope.row.workingHourList[15].Hours}}</div> -->
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[15].Hours"  type="number"/>
                  </template>  </el-table-column>
                  <el-table-column  :label="label('17')" :class-name="workday('17')"  min-width="120">   <template slot-scope="scope">
                      <!-- <div v-show="!workingHourEditable" min-width="120">{{scope.row.workingHourList[16].Hours}}</div> -->
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[16].Hours" type="number"/>
                  </template>  </el-table-column>
                  <el-table-column  :label="label('18')" :class-name="workday('18')" min-width="120">   <template slot-scope="scope">
                      <!-- <div v-show="!workingHourEditable">{{scope.row.workingHourList[17].Hours}}</div> -->
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[17].Hours"  type="number"/>
                  </template>  </el-table-column>
                  <el-table-column  :label="label('19')" :class-name="workday('19')" min-width="120">   <template slot-scope="scope">
                      <!-- <div v-show="!workingHourEditable">{{scope.row.workingHourList[18].Hours}}</div> -->
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[18].Hours"  type="number"/>
                  </template>  </el-table-column>
                  <el-table-column  :label="label('20')" :class-name="workday('20')" min-width="120">   <template slot-scope="scope">
                      <!-- <div v-show="!workingHourEditable">{{scope.row.workingHourList[19].Hours}}</div> -->
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[19].Hours"  type="number"/>
                  </template>  </el-table-column>


                <el-table-column  :label="label('21')" :class-name="workday('21')" min-width="120">   <template slot-scope="scope" >
                      <!-- <div v-show="!workingHourEditable">{{scope.row.workingHourList[20].Hours}}</div> -->
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[20].Hours"  type="number"/>
                  </template>  </el-table-column>
                <el-table-column  :label="label('22')" :class-name="workday('22')"  min-width="120">   <template slot-scope="scope">
                      <!-- <div v-show="!workingHourEditable">{{scope.row.workingHourList[21].Hours}}</div> -->
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[21].Hours" type="number"/>
                  </template>  </el-table-column>
                  <el-table-column  :label="label('23')" :class-name="workday('23')" min-width="120">   <template slot-scope="scope">
                      <!-- <div v-show="!workingHourEditable">{{scope.row.workingHourList[22].Hours}}</div> -->
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[22].Hours"  type="number"/>
                  </template>  </el-table-column>
                  <el-table-column  :label="label('24')" :class-name="workday('24')" min-width="120">   <template slot-scope="scope">
                      <!-- <div v-show="!workingHourEditable">{{scope.row.workingHourList[23].Hours}}</div> -->
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[23].Hours" type="number"/>
                  </template>  </el-table-column>
                  <el-table-column  :label="label('25')" :class-name="workday('25')" min-width="120">   <template slot-scope="scope">
                      <!-- <div v-show="!workingHourEditable">{{scope.row.workingHourList[24].Hours}}</div> -->
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[24].Hours"  type="number"/>
                  </template>  </el-table-column>
                  <el-table-column  :label="label('26')" :class-name="workday('26')" min-width="120">   <template slot-scope="scope">
                      <!-- <div v-show="!workingHourEditable">{{scope.row.workingHourList[25].Hours}}</div> -->
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[25].Hours"  type="number"/>
                  </template>  </el-table-column>
                  <el-table-column  :label="label('27')" :class-name="workday('27')"  min-width="120">   <template slot-scope="scope">
                      <!-- <div v-show="!workingHourEditable" min-width="120">{{scope.row.workingHourList[26].Hours}}</div> -->
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[26].Hours" type="number"/>
                  </template>  </el-table-column>
                  <el-table-column  :label="label('28')" :class-name="workday('28')" min-width="120">   <template slot-scope="scope">
                      <!-- <div v-show="!workingHourEditable">{{scope.row.workingHourList[27].Hours}}</div> -->
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[27].Hours"  type="number"/>
                  </template>  </el-table-column>
                  <el-table-column v-if="days>=29"  :label="label('29')" :class-name="workday('29')" min-width="120">
                      <template slot-scope="scope">
                      <!-- <div v-show="!workingHourEditable">{{scope.row.workingHourList[27].Hours}}</div> -->
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[28].Hours"  type="number"/>
                  </template>  </el-table-column>
                  <el-table-column  v-if="days>=30" :label="label('30')" :class-name="workday('30')" min-width="120">   <template slot-scope="scope">
                      <!-- <div v-show="!workingHourEditable">{{scope.row.workingHourList[27].Hours}}</div> -->
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[29].Hours"  type="number"/>
                  </template>  </el-table-column>
                  <el-table-column v-if="days>=31" :label="label('31')" :class-name="workday('31')" min-width="120">   <template slot-scope="scope">
                      <!-- <div v-show="!workingHourEditable">{{scope.row.workingHourList[27].Hours}}</div> -->
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[30].Hours"  type="number"/>
                  </template>  </el-table-column>
                  <!-- <el-table-column  :label="label('29')" min-width="120">   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[28].Hours}}</div>
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[28].Hours" />
                  </template>  </el-table-column>
                  <el-table-column  :label="label('30')" min-width="120">   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[29].Hours}}</div>
                      <el-input  :readonly="!workingHourEditable" size="mini" v-model="scope.row.workingHourList[29].Hours" />
                  </template>  </el-table-column> -->
                 <!-- <el-table-column label="操作" min-width="140">
                    <template slot-scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column> -->
            </el-table>
            </div>
        </div>

    </div>
</template>

<script>
export default {
  name: "basetable",
  data() {
    return {
      Url: "api/workinghours",
      workingHourEditable: true,
      // worktimeData: [{Process: 'process1', '01': 3, '02': {hour:3, status:'1'}, '03': 9},{Process: 'process2', '01': 5, '02': {hour:6, status:'1'}, '03': 9}],
      worktimeData: [
        { Process: "process1", "01": 3, "02": 7, "03": 6 },
        { Process: "process2", "01": 5, "03": 9 }
      ],
      yearMonth: new Date(),
      yearMonthOptions: {
           disabledDate(time) {
            return time.getTime() > new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
          },
      },
      tableData: [],
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
    days() {
      return new Date(
        this.yearMonth.getFullYear(),
        this.yearMonth.getMonth() + 1,
        0
      ).getDate();
    },
    currentUser() {
      if (
        this.workingHourProcessMonthList &&
        this.workingHourProcessMonthList[0] &&
        this.workingHourProcessMonthList[0].User
      ) {
        return this.workingHourProcessMonthList[0].User;
      } else {
        return "";
      }
    }
    // Total(index, row){
    //   const item = this.tableData[index]
    //   this.editForm = item
    //   this.editVisible = true
    //   var total = 0
    //   if(row && row.workingHourList){
    //       for(var i = 0, length = row.workingHourList.length; i < length; i++){
    //           total += row.workingHourList[i]
    //       }
    //       return total
    //   }else{
    //       return 0
    //   }
    // }
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
            this.workingHourProcessMonthList = res.data;
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
    Total(index, row) {
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
    getSummaries(param) {
      const { columns, workingHourProcessMonthList } = param;
      const sums = [];
      console.log("columns");
      console.log(columns);
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
        debugger;
        if (
          this.workingHourProcessMonthList &&
          this.workingHourProcessMonthList.length > 0
        ) {
          var sumHours = this.workingHourProcessMonthList.map(
            workingHourProcessMonth =>
              Number(workingHourProcessMonth.workingHourList[index - 2].Hours)
          );
          console.log("sumHours");
          console.log(sumHours);
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
