<template>
  <div>
    <div style="float:left;">
      <div style="position:relative;float:left;margin-bottom:0px;">
        <el-button
          icon="el-icon-arrow-left"
          size="medium"
          type="primary"
          style="margin-left:30px;"
        >前一月</el-button>
        <span style="margin-left:70px;">1/25--1/31</span>
        <el-button type="primary" size="medium" style="margin-left:70px;">
          后一月
          <i class="el-icon-arrow-right el-icon--right"></i>
        </el-button>
      </div>
      <div id="monthCountId" style="width: 1310px;height: 220px;margin-top:-5px;"></div>
    </div>
  </div>
  <!-- <v-chart ref="TrendChart" :style="{width:'100%',height: '298px'}" :options="optionTrend"></v-chart> -->
</template>
<script>
import echarts from "echarts";
import { deepClone } from "@/common/util";
import { countRunByMonth } from "@/common/httpService";
export default {
  name: "",
  data() {
    return {
      monthChart: {},
      optionData: { daysInMonth: [], kmInMonth: [], total: "0公里" },
      queryParams: {
        year: 0,
        month: 0
      }
    };
  },
  methods: {
    countByMonth() {
      let date = new Date();
      this.queryParams.year = date.getFullYear();
      this.queryParams.month = date.getMonth() + 1;
      countRunByMonth(this.queryParams).then(res => {
        if (!res) {
          this.$message.warning("查询不到月度数据");
        }
        if ((res.status = 200)) {
          this.optionData.daysInMonth = res.data.units;
          this.optionData.kmInMonth = res.data.kmList;
          this.optionData.total = res.data.total + "公里";
        }
      }).finally(()=>{
         this.drawMonths(this.optionData);
      });
    },
    drawMonths(optionData) {
      this.monthChart = this.$echarts.init(
        document.getElementById("monthCountId")
      );
      let optionTrend = {
        color: "#c23531",
        // title: {
        //   text: optionData.total,
        //   textStyle: { color: "#8043D7" }
        // },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // type: "shadow"
          }
          // formatter: param => {
          //   let data = `${param[0].name}`;
          //   for (let i in param) {
          //     data += `<br>${param[i].marker}${param[i].seriesName}:${param[i].value}`;
          //     if (param[i].seriesIndex == 2) {
          //       data += "%";
          //     }
          //   }
          //   return data;
          // }
        },
        legend: {
          // data: ["按周统计"],
          textStyle: { fontSize: 16 }
          // right: "100"
        },
        xAxis: {
          // name: "每天",
          type: "category",
          data: optionData.daysInMonth
        },
        yAxis: {
          type: "value",

          axisLine: { show: true }, // 坐标轴，默认为true
          axisTick: { show: false },
          axisLabel: {
            textStyle: { fontSize: 16 },
            formatter: "{value}",
            interval: 3
          }
        },
        grid: {
          left: 30,
          right: 100,
          bottom: 30,
          top: 60,
          height: 110,
          width: 1150
        }, // 整体统计图表格的位置，及高宽
        series: [
          {
            name: optionData.total,
            type: "bar",
            data: optionData.kmInMonth,
            stack: "stock",
            barMaxWidth: 20,
            label: {
              show: true,
              position: "top", // 数值显示在柱状图上面
              fontSize: 14,

              color: "#556575",
              formatter: params => {
                return params.value == 0 ? "" : params.value;
              }
            },
            itemStyle: {
              color: "#007ADB"
            }
            // showBackground: true,
            // backgroundStyle: {
            //   color: "rgba(180, 180, 180, 0.2)"
            // }
          }
        ]
      };
      this.monthChart.setOption(optionTrend);
    },
    resize(chart) {
      window.addEventListener("resize", function() {
        chart.resize();
      });
    }
    //调用
  },
  mounted() {
    this.countByMonth();
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>