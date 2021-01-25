<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div id="main" style="width: 600px;height: 400px;"></div>
  <!-- <v-chart ref="TrendChart" :style="{width:'100%',height: '298px'}" :options="optionTrend"></v-chart> -->
</template>
<script>
import echarts from "echarts";
export default {
  name: "",
  data() {
    return {
      isCollapsed: false,
      charts: "",
      optionTrend: {
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    };
  },
  methods: {
    drawLine(id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption(this.optionTrend);
    }
    //调用
  },
  mounted() {
    this.$nextTick(function() {
      this.drawLine("main");
    });
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