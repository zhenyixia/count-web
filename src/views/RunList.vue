<template>
  <div>
    <div>
      <week-count-chart></week-count-chart>
    </div>
    <div>
      <el-table
        :data="tableData"
        :stripe="true"
        :fit="true"
        :border="true"
        :height="400"
        style="width:100%"
        highlight-current-row
      >
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="kilometer" label="距离" align="center"></el-table-column>
        <el-table-column prop="address" label="地址" align="center"></el-table-column>
        <el-table-column prop="runSecond" label="运动时长" align="center"></el-table-column>
        <el-table-column prop="kmByHour" label="速度-km/h" align="center"></el-table-column>
        <el-table-column prop="timeByKm" label="平均配速-s/km" align="center"></el-table-column>
        <el-table-column prop="runDate" label="运动日期" align="center"></el-table-column>
      </el-table>
      <div style="display:inline-block;float:left;margin-top:5px;">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click.stop="enterRunData()"
        >录入跑步数据</el-button>
        <el-button @click="exportTemplate">下载导入模板</el-button>
        <el-button @click="exportData">导出数据</el-button>
      </div>
      <div>
        <enter-run-date v-if="showEnterRunDataDialog" ref="enterRunDate"></enter-run-date>
      </div>
      <div style="display:inline-block;float:right;margin-top:15px;">
        <!-- 分页 开始 -->
        <div class="page">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.page.total"
            :current-page="this.page.pageNum"
            :page-size="this.page.pageSize"
            :page-sizes="[10, 15, 20, 50]"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userViewDialog from "@/views/userView";
import {
  getRunList,
  importRunData,
  downloadRunDataTemplate,
  exportRunData
} from "@/common/httpService";
import EnterRunDate from "./EnterRunDateDialog";
import WeekCountChart from "./WeekCountChart";
export default {
  components: {
    EnterRunDate: EnterRunDate,
    WeekCountChart: WeekCountChart
  },
  data() {
    return {
      tableData: [],
      name: null,
      spImportData: "",
      page: {
        pageNum: 1, //当前页号
        pageSize: 10, //每页大小
        total: 100 //总条数
      },
      //展示录入跑步数据弹出框
      showEnterRunDataDialog: false,
      downloadTemplate: downloadRunDataTemplate
    };
  },
  //默认加载的方法
  created() {
    this.init();
  },

  methods: {
    init() {
      getRunList(this.page).then(res => {
        if (res.status == 200 && res.data) {
          this.tableData = res.data.list;
          this.page.total = res.data.total;
        }
      });
    },
    handleSizeChange(val) {
      console.log(`页面大小: ${val}`);
      this.page.pageSize = val;
      this.page.pageNum = 1;
      this.init();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.pageNum = val;
      this.init();
    },

    //录入跑步数据
    enterRunData() {
      this.showEnterRunDataDialog = true;
      this.$nextTick(() => {
        this.$refs.enterRunDate.init();
      });
    },
    // 导出模板
    exportTemplate() {
      window.location.href = this.downloadTemplate;
    },
    // 导出数据
    exportData() {
      exportRunData(this.queryParams).then(res => {
        var blob = new Blob([res.data], {
          type: "application/msword;charset=utf-8"
        });
        var filename = "download.xlsx";
        var a = document.createElement("a");
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = filename;
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(a);
        a.click();
        body.removeChild(a);
        window.URL.revokeObjectURL(url);
        this.$message.success("下载成功");
      });
    }
  }
};
</script>