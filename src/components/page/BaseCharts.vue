<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 图表</el-breadcrumb-item>
                <el-breadcrumb-item>基础图表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="plugins-tips">
                vue-schart：vue.js封装sChart.js的图表组件。
                访问地址：<a href="https://github.com/lin-xin/vue-schart" target="_blank">vue-schart</a>
            </div>
            <div class="schart-box">
                <div class="content-title">柱状图</div>
                <schart class="schart" canvasId="bar" :data="data1" type="bar" :options="options1"></schart>
            </div>
            <div class="schart-box">
            <div class="content-title">折线图</div>
            <schart class="schart" canvasId="line" :data="data1" type="line" :options="options2"></schart>
            </div>
            <div class="schart-box">
            <div class="content-title">饼状图</div>
            <schart class="schart" canvasId="pie" :data="data2" type="pie" :options="options3"></schart>
            </div>
            <div class="schart-box">
            <div class="content-title">环形图</div>
            <schart class="schart" canvasId="ring" :data="data2" type="ring" :options="options4"></schart>
            </div>
  <div class="schart-box">
             <div ref="myEchart" style="height:400px;width:500px;"></div> </div>
            <div ref="myEchart1" style="height:400px;width:600px;"></div> 
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
    data1: [
      { name: "2012", value: 1141 },
      { name: "2013", value: 1499 },
      { name: "2014", value: 2260 },
      { name: "2015", value: 1170 },
      { name: "2016", value: 970 },
      { name: "2017", value: 1450 }
    ],
    data2: [
      { name: "短袖", value: 1200 },
      { name: "休闲裤", value: 1222 },
      { name: "连衣裙", value: 1283 },
      { name: "外套", value: 1314 },
      { name: "羽绒服", value: 2314 }
    ],
    options1: {
      title: "某商店近年营业总额",
      autoWidth: true, // 设置宽高自适应
      showValue: false,
      bgColor: "#F9EFCC",
      fillColor: "#00887C",
      contentColor: "rgba(46,199,201,0.3)",
      yEqual: 7
    },
    options2: {
      title: "某商店近年营业总额",
      bgColor: "#D5E4EB",
      titleColor: "#00887C",
      fillColor: "red",
      contentColor: "rgba(46,199,201,0.3)"
    },
    options3: {
      title: "某商店各商品年度销量",
      bgColor: "#829dca",
      titleColor: "#ffffff",
      legendColor: "#ffffff",
      radius: 120
    },
    options4: {
      title: "某商店各商品年度销量",
      bgColor: "#829daa",
      titleColor: "#ffffff",
      legendColor: "#ffffff",
      radius: 120,
      innerRadius: 80
    },
    chart: null,
    chart1: null,
    teamTime:[['task','后勤组','攻坚组','服务组'],
    ['Meeting',30,40,50],
    ['Training',30,40,50],
    ['Staff club',30,40,50],
    ['Leave',30,40,50],
    ['India HR',230,340,450],
    ['TEC cla',230,340,450],
    ['Meeting',30,40,50]
    ],
  
      houqinTime:[['task','张后勤','李后勤','赵后勤'],
    ['Meeting',10,10,10],
    ['Training',10,10,10],
    ['Staff club',10,10,10],
    ['Leave',10,10,10],
    ['India HR',100,30,100],
    ['TEC cla',100,30,100],
    ['Meeting',5,10,15]
    ],
          gongjianTime:[['task','张攻','李攻','赵攻'],
    ['Meeting',10,10,20],
    ['Training',10,20,10],
    ['Staff club',10,20,10],
    ['Leave',10,20,10],
    ['India HR',100,110,130],
    ['TEC cla',100,100,140],
    ['Meeting',5,20,15]
    ],
          fuwuTime:[['task','张服务','李服务','赵服务'],
    ['Meeting',20,10,20],
    ['Training',10,20,20],
    ['Staff club',10,20,20],
    ['Leave',10,20,20],
    ['India HR',210,110,130],
    ['TEC cla',210,100,140],
    ['Meeting',15,20,15]
    ],
  }),
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.myEchart, "dark");
      this.chart1 = echarts.init(this.$refs.myEchart1, "light");
      this.chart1.setOption({
        title: {
          text: "小组工时统计"
        },
        tooltip: {},
        dataset: {
            source:this.teamTime,      
        },
        legend: {},
        xAxis: {
          type: "category"
        },
        yAxis: {},
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }]
      });
      this.chart1.on('click',  (params) => {
          debugger
          
          if(params.seriesName =='后勤组'){
            
                    this.chart.setOption({
        title: {
          text: "后勤组工时统计"
        },
        tooltip: {},
        dataset: {
            source:this.houqinTime,      
        },
        legend: {},
        xAxis: {
          type: "category"
        },
        yAxis: {},
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }]
      });

          }//'后勤组','攻坚组','服务组'
           if(params.seriesName =='攻坚组'){
                                  this.chart.setOption({
        title: {
          text: "攻坚组工时统计"
        },
        tooltip: {},
        dataset: {
            source:this.gongjianTime,      
        },
        legend: {},
        xAxis: {
          type: "category"
        },
        yAxis: {},
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }]
      });
          }
           if(params.seriesName =='服务组'){
                                  this.chart.setOption({
        title: {
          text: "服务组工时统计"
        },
        tooltip: {},
        dataset: {
            source:this.fuwuTime,      
        },
        legend: {},
        xAxis: {
          type: "category"
        },
        yAxis: {},
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }]
      });
          }
          console.log(params);
});
      // 把配置和数据放这里
    //   this.chart.setOption({
    //     color: ["#3398DB"],
    //     tooltip: {
    //       trigger: "axis",
    //       axisPointer: {
    //         // 坐标轴指示器，坐标轴触发有效
    //         type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
    //       }
    //     },
    //     grid: {
    //       left: "3%",
    //       right: "4%",
    //       bottom: "3%",
    //       containLabel: true
    //     },
    //     xAxis: [
    //       {
    //         type: "category",
    //         data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    //         axisTick: {
    //           alignWithLabel: true
    //         }
    //       }
    //     ],
    //     yAxis: [
    //       {
    //         type: "value"
    //       }
    //     ],
    //     series: [
    //       {
    //         name: "直接访问",
    //         type: "bar",
    //         barWidth: "60%",
    //         data: [10, 52, 200, 334, 390, 330, 220]
    //       }
    //     ]
    //   });
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