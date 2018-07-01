<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 图表</el-breadcrumb-item>
                <el-breadcrumb-item>月度汇总</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
           <!-- <div class="plugins-tips">
                eschart：ECharts，一个使用 JavaScript 实现的开源可视化库。
                示例访问地址：<a href="http://echarts.baidu.com/examples/" target="_blank">echart</a>
            </div>   -->
            <div style="padding:10px;">  
          <el-select v-model="selectedMonth" filterable placeholder="选择月份" @change='selectedMonthChange'>
            <el-option
              v-for="item in reportMonths"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
</div>

            <div ref="myEchart1" style="height:500px;width:1000px;"></div> 
             <div ref="myEchart" style="height:500px;width:1000px;" v-show="showchild"></div> 

        </div>
    </div>
</template>

<script>
import Schart from "vue-schart";
import echarts from "echarts";
export default {
  name: "basecharts",
  components: {
    Schart
  },
  data: () => ({
    username: '',
    showchild:false,
    reportMonths: [{
      label:'2018-01',
      value:'2018-01',
    },
    {
      label:'2018-02',
      value:'2018-02',
    },
    {
      label:'2018-03',
      value:'2018-03',
    },
    {
      label:'2018-04',
      value:'2018-04',
    },
    {
      label:'2018-05',
      value:'2018-05',
    }],
    worktimeUrl: "/static/worktime.json",
    myWorktimeList: [],
    teams: [
      {
        value: "houqinzu",
        label: "后勤组"
      },
      {
        value: "gongjianzu",
        label: "攻坚组"
      },
      {
        value: "fuwuzu",
        label: "服务组"
      }
    ],
    selectedTeam: "",
    selectedMonth: '2018--03',
    chart: null,
    chart1: null,
    myWorktimeSummery: [
      ["kpi/date", "我的工时", "标准工时"],    
    ],
    selectedWorktimeDetail: [],
    // houqinTime: [
    //   ["task", "张后勤", "李后勤", "赵后勤"],
    //   ["Meeting", 10, 10, 10],
    //   ["Training", 10, 10, 10],
    //   ["Staff club", 10, 10, 10],
    //   ["Leave", 10, 10, 10],
    //   ["India HR", 100, 30, 100],
    //   ["TEC cla", 100, 30, 100],
    //   ["Meeting", 5, 10, 15]
    // ],
    // gongjianTime: [
    //   ["task", "张攻", "李攻", "赵攻"],
    //   ["Meeting", 10, 10, 20],
    //   ["Training", 10, 20, 10],
    //   ["Staff club", 10, 20, 10],
    //   ["Leave", 10, 20, 10],
    //   ["India HR", 100, 110, 130],
    //   ["TEC cla", 100, 100, 140],
    //   ["Meeting", 5, 20, 15]
    // ],
    // fuwuTime: [
    //   ["task", "张服务", "李服务", "赵服务"],
    //   ["Meeting", 20, 10, 20],
    //   ["Training", 10, 20, 20],
    //   ["Staff club", 10, 20, 20],
    //   ["Leave", 10, 20, 20],
    //   ["India HR", 210, 110, 130],
    //   ["TEC cla", 210, 100, 140],
    //   ["Meeting", 15, 20, 15]
    // ]
  }),
  mounted() {
    this.getData()
   
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
      getData() {
      debugger;
      this.username = localStorage.getItem("ms_username");
      // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
      this.$axios.get(this.worktimeUrl).then(res => {
        debugger;
        if (res.status == 200 || res.statusText == "OK")
          //this.tableData = res.data
        
        var that = this;
        res.data.forEach(item => {
          if(item.name == this.username){
            this.myWorktimeList.push(item)

            this.myWorktimeSummery.push([item.date.substring(8), item.total, 8])
          }
          // item.worktime.forEach(worktimeItem => {
          //   // if (that.taskColumns.indexOf(worktimeItem.task)<0) {
          //   //   that.taskColumns.push(worktimeItem.task);
          //   // }
          //   // item[worktimeItem.task] = worktimeItem.hour;
          // });
        });
         this.initChart();
      });
      // this.$axios.get(this.favoriteUrl).then(res => {
      //   debugger;
      //   if (res.status == 200 || res.statusText == "OK")
      //     var favoritesList = res.data;
      //   var that = this;

      //   favoritesList.forEach(favorite => {
      //     if (favorite.username == this.username) {
      //       that.favorites = favorite.tasks;
      //       //for creation: create favorite task and work hour structure
      //       that.favorites.forEach(f => {
      //         that.worktimeFavoriteTemplate.push({
      //           name: f.name,
      //           code: f.code,
      //           hour: 0
      //         });
      //       });
      //     }
      //   });
      // });
    },



    initChart() {
      this.chart1 = echarts.init(this.$refs.myEchart1, "light");
      var options = {
        title: {
          text: "个人月度汇总"
        },
        tooltip: {},
        dataset: {
          source: this.myWorktimeSummery
        },
        legend: {},
        xAxis: {
          type: "category"
        },
        yAxis: {},
        series: []
      };
      for (var i = 0; i < this.myWorktimeSummery[0].length - 1; i++) {
        options.series.push({ type: "bar" });
      }
      this.chart1.setOption(options);

      this.chart1.on("click", params => {
        debugger;
        if (this.chart != null) {
          this.chart.dispose();
        }
        var dateStr = '2018-03-'+ params.data[0]
        this.selectedWorktimeDetail = [['date/worktime', dateStr]]
         this.myWorktimeList.forEach(item => {
           if(item.date == dateStr){
             item.worktime.forEach(worktimeItem => {
               this.selectedWorktimeDetail.push([worktimeItem.task, worktimeItem.hour])
             })
           }
         })
        this.chart = echarts.init(this.$refs.myEchart, "dark");
        var detailOption =  {
            title: {
              text: "任务详细"
            },
            tooltip: {},
            dataset: {
              source: this.selectedWorktimeDetail
            },
            legend: {},
            xAxis: {
              type: "category"
            },
            yAxis: {},
            series: []
          };
          for (var i = 0; i < this.selectedWorktimeDetail[0].length - 1; i++) {
            detailOption.series.push({ type: "bar" });
          }

    
        // if (params.seriesName == "后勤组") {
        //   teamOption = {
        //     title: {
        //       text: "后勤组工时统计"
        //     },
        //     tooltip: {},
        //     dataset: {
        //       source: this.houqinTime
        //     },
        //     legend: {},
        //     xAxis: {
        //       type: "category"
        //     },
        //     yAxis: {},
        //     series: []
        //   };
        //   for (var i = 0; i < this.houqinTime[0].length - 1; i++) {
        //     teamOption.series.push({ type: "bar" });
        //   }
        // }
        // if (params.seriesName == "攻坚组") {
        //   teamOption = {
        //     title: {
        //       text: "攻坚组工时统计"
        //     },
        //     tooltip: {},
        //     dataset: {
        //       source: this.gongjianTime
        //     },
        //     legend: {},
        //     xAxis: {
        //       type: "category"
        //     },
        //     yAxis: {},
        //     series: []
        //   };
        //   for (var i = 0; i < this.gongjianTime[0].length - 1; i++) {
        //     teamOption.series.push({ type: "bar" });
        //   }
        // }
        // if (params.seriesName == "服务组") {
        //   teamOption = {
        //     title: {
        //       text: "服务组工时统计"
        //     },
        //     tooltip: {},
        //     dataset: {
        //       source: this.fuwuTime
        //     },
        //     legend: {},
        //     xAxis: {
        //       type: "category"
        //     },
        //     yAxis: {},
        //     series: []
        //   };
        //   for (var i = 0; i < this.fuwuTime[0].length - 1; i++) {
        //     teamOption.series.push({ type: "bar" });
        //   }
        // }
        this.chart.setOption(detailOption);
        console.log(params);
        this.showchild = true;
      });
    },
    selectedMonthChange(){

    },
    selectedTeamChange() {
      debugger;
      if (this.selectedTeam == "houqinzu") {
        this.teamTime = [
          ["task", "后勤组"],
          ["Meeting", 30],
          ["Training", 30],
          ["Staff club", 30],
          ["Leave", 30],
          ["India HR", 230],
          ["TEC cla", 230],
          ["Meeting", 30]
        ];
      }
      if (this.selectedTeam == "gongjianzu") {
        this.teamTime = [
          ["task", "攻坚组"],
          ["Meeting", 40],
          ["Training", 40],
          ["Staff club", 40],
          ["Leave", 40],
          ["India HR", 340],
          ["TEC cla", 340],
          ["Meeting", 40]
        ];
      }

      if (this.selectedTeam == "fuwuzu") {
        this.teamTime = [
          ["task", "服务组"],
          ["Meeting", 50],
          ["Training", 50],
          ["Staff club", 50],
          ["Leave", 50],
          ["India HR", 450],
          ["TEC cla", 450],
          ["Meeting", 50]
        ];
      }
      if (this.chart != null) {
        this.chart.dispose();
        this.chart = null;
      }
      if (this.chart1 != null) {
        this.chart1.dispose();
        this.chart1 = null;
      }
      this.initChart();
    }
  }
};
</script>

<style scoped>
.schart-box {
  display: inline-block;
  margin: 20px;
}
.schart {
  width: 500px;
  height: 400px;
}
.content-title {
  clear: both;
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
</style>