<template>
  <div>
    <div  style="float:left;display:inline;">
      <div id="weekDayCountId" style="width: 600px;height: 200px;"></div>
      <div style="position:relative;float:left;">
        <el-button icon="el-icon-back">前一周</el-button>
        <el-button icon="el-icon-right" style="margin-left:350px;">后一周</el-button>
      </div>
    </div>
    <div>
      <div id="yearCountId" style="width: 600px;height: 200px;"></div>
      <div style="position:relative;float:left;">
        <el-button icon="el-icon-back">前一周</el-button>
        <el-button icon="el-icon-right" style="margin-left:350px;">后一周</el-button>
      </div>
    </div>
  </div>
  <!-- <v-chart ref="TrendChart" :style="{width:'100%',height: '298px'}" :options="optionTrend"></v-chart> -->
</template>
<script>
import echarts from "echarts";
import {deepClone} from "@/common/util";
export default {
  name: "",
  data() {
    return {
      weekDays: ["周一", "周二", "周三", "周四", "周五", "周六", "周七"],
      isCollapsed: false,
      charts: ""
    };
  },
  methods: {
    drawWeekDays(optionData) {
      let chart = this.$echarts.init(document.getElementById(optionData.id));
      let optionTrend = {
        color: "#c23531",
        title: {
          text: optionData.total,
          textStyle: { color: "#8043D7" }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: param => {
            let data = `${param[0].name}`;
            for (let i in param) {
              data += `<br>${param[i].marker}${param[i].seriesName}:${param[i].value}`;
              if (param[i].seriesIndex == 2) {
                data += "%";
              }
            }
            return data;
          }
        },
        legend: {
          // data: ["按周统计"],
          textStyle: { fontSize: 16 }
          // right: "100"
        },
        xAxis: {
          name: "每天",
          type: "category",
          data: optionData.weekDays
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
          height: 90,
          width: 450
        }, // 整体统计图表格的位置，及高宽
        series: [
          {
            name: "单位：公里",
            type: "bar",
            data: optionData.weekKm,
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
            },
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)"
            }
          }
        ]
      };
      chart.setOption(optionTrend);
    },
    drawYears(optionData) {
      let chart = this.$echarts.init(document.getElementById(optionData.id));
      let optionTrend = {
        color: "#c23531",
        title: {
          text: optionData.total,
          textStyle: { color: "#8043D7" }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: param => {
            let data = `${param[0].name}`;
            for (let i in param) {
              data += `<br>${param[i].marker}${param[i].seriesName}:${param[i].value}`;
              if (param[i].seriesIndex == 2) {
                data += "%";
              }
            }
            return data;
          }
        },
        legend: {
          // data: ["按周统计"],
          textStyle: { fontSize: 16 }
          // right: "100"
        },
        xAxis: {
          name: "每天",
          type: "category",
          data: optionData.weekDays
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
          height: 90,
          width: 450
        }, // 整体统计图表格的位置，及高宽
        series: [
          {
            name: "单位：公里",
            type: "bar",
            data: optionData.weekKm,
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
            },
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)"
            }
          }
        ]
      };
      chart.setOption(optionTrend);
    }
    //调用
  },
  mounted() {
    let optionData = {};
    optionData.weekDays = ["一", "二", "三", "四", "五", "六", "日"];
    optionData.weekKm = [5, 20, 36, 10, 10, 20, 12];
    optionData.total = "150公里";
    optionData.id = "weekDayCountId";
    this.drawWeekDays(optionData);
    let optionData2 = deepClone(optionData);
    optionData2.id = "weekDayCountId2";
    this.drawYears(optionData2);

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