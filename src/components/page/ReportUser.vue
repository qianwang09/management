<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
              <span class="tableInfoLeft">
                  <span v-show="byMonth">{{getMonthName(yearMonth.getMonth(),3)}} Working Hour: {{standardWorkingHour.WorkingHour}}</span>
              </span>              
              <el-switch size="mini"  v-model="byMonth"   inactive-text="ByYear" active-text="ByMonth" > </el-switch>
              <span style="margin-left:150px;"  class="tableInfoLeft">Date:</span>
              <el-date-picker v-show="!byMonth" size="small" class="dateSelector" v-model="yearMonth" type="year" placeholder="Select Year" @change="yearMonthChange()" :picker-options="yearMonthOptions"> </el-date-picker>
              <el-date-picker v-show="byMonth" size="small" class="dateSelector" v-model="yearMonth" type="month" placeholder="Select YearMonth" @change="yearMonthChange()" :picker-options="yearMonthOptions"> </el-date-picker>
              <!-- <span class="tableInfoLeft">Team:</span>
              <el-select size="small" v-model="selectedTeam"  placeholder="Select Team">                   
                <el-option  v-for="item in teams"  :key="item" :label="item" :value="item"> </el-option> 
              </el-select> -->
              <div class="right">                 
                    <el-button class="saveBtn" size="small"  type="primary" icon="el-icon-download" @click="ExportWorkingHourFTE('workingHour')">ExportWorkingHour </el-button>
                    <el-button class="saveBtn" size="small"  type="primary" icon="el-icon-download" @click="ExportWorkingHourFTE('FTE')">ExportFTE </el-button>
              </div>
              <div class="clear"></div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
  data() {
    return {
      Url: "api/ReportUserProcessWorkingHours",
      UrlStandardWorkingHour: "api/StandardWorkinghours",
      byMonth: false,
      standardWorkingHour: { WorkingHour: 0 },
      teams: [],
      selectedTeam: '',
      yearMonth: new Date(),
      yearMonthOptions: {
        disabledDate(time) {
          return (
            time.getTime() >
            new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
          );
        }
      }
    };
  },
  created() {
    this.yearMonth = new Date();
    this.getData();
    this.getStandardWorkingHour();
  },
  computed: {
    year() {
      return this.yearMonth.getFullYear();
    },
    month() {
      return this.yearMonth.getMonth() + 1;
    },
    dateType(){
      if(this.byMonth){
        return 'month'
      }else{
        return 'year'
      }
    }
  },
  methods: {
    // getData() {
    //   this.$axios
    //     .get(
    //       this.$root.HostURL +
    //         this.Url +
    //         "?yearMonth=" +            
    //         this.yearMonth.toISOString()+
    //         '&&dateType=' + this.dateType +
    //         '&&approver=' + this.$root.user.Name
    //     )
    //     .then(res => {
    //       if (res.status == 200 || res.statusText == "OK") {
    //         this.teams = res.data;
    //       }
    //     });
    // },
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
      if(this.byMonth){
      this.getStandardWorkingHour();
      }
    },

    ExportWorkingHourFTE(exportType) {
      this.$axios
        .get(
          this.$root.HostURL +
            this.Url +
            "/Export" +
            "?user=" +
            this.$root.user.Name +
            "&&yearMonth=" +
            this.yearMonth.toISOString() +
            "&&exportType=" +
            exportType+
            '&&dateType='+
            this.dateType,
          {
            responseType: "arraybuffer"
          }
        )
        .then(res => {
          debugger;
          var blob = new Blob([res.data], { type: "application/vnd.ms-excel" }); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
          var downloadElement = document.createElement("a");
          var href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          downloadElement.download =
          this.selectedTeam +  exportType + this.year + "-" + this.month + ".xlsx"; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        });
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
