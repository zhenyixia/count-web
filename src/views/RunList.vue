<template>
  <div>
    <el-table
      :data="tableData"
      :stripe="true"
      :fit="true"
      :border="true"
      :height="500"
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
    <div style="display:inline-block;float:left;margin-top:15px;">
      <el-button type="primary" icon="el-icon-plus" size="small" @click.stop="enterRunData()">录入跑步数据</el-button>
    </div>
    <EnterRunDate v-if="showEnterRunDataDialog" ref="enterRunDate" @refreshDataList="refreshChange"></EnterRunDate>
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
</template>

<script>
import userViewDialog from "@/views/userView";
import addDialog from "@/views/RunAddDialog";
import { getRunList } from "@/common/httpService";
import enterRunDate from "./EnterRunDateDialog";
export default {
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
      showEnterRunDataDialog: false
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
    }
  }
};
</script>