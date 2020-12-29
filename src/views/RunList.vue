<template>
  <div>
    <el-table :data="tableData" :stripe='true' :fit='true' border style="width:100%" highlight-current-row>
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="kilometer" label="距离" align="center"></el-table-column>
      <el-table-column prop="address" label="地址" align="center"></el-table-column>
      <el-table-column prop="runSecond" label="运动时长" align="center"></el-table-column>
      <el-table-column prop="kmByHour" label="速度-km/h" align="center"></el-table-column>
      <el-table-column prop="timeByKm" label="平均配速" align="center"></el-table-column>
      <el-table-column prop="runDate" label="运动日期" align="center"></el-table-column>
      <!-- <el-table-column prop="enableState" label="用户状态" align="center"></el-table-column>
      <el-table-column prop="tradeState" label="交易状态" align="center"></el-table-column>-->
      <el-table-column label="操作" min-width="150" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="checkDetail(scope.row)">查看详情</el-button>
          <el-button type="info" @click="modifyUser(scope.row)">修改</el-button>
          <el-button type="info" @click="deleteUser(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-upload
        class="upload-demo"
        :action="spImportData"
        :name="name"
        :limit="1"
        :on-success="afterSuccess"
      >
        <button class="bt importDataBt">导入</button>
      </el-upload>
    </div>
  </div>
</template>

<script>
import userViewDialog from '@/views/userView'
import { getRunList } from "@/common/httpService"
export default {
  data() {
    return {
      tableData: [],
      name: null, 
      spImportData: ""
    };
  },
  //默认加载的方法
  created() {
    this.init();
  },

  methods: {
    init() {
      let params = {pageNum:1,pageSize:10};
      getRunList(params).then(res => {
        this.tableData = res.data;
      });


      /* this.tableData = [
        {
          phone: 123,
          nickname: "nike1",
          createTime: "2020-7-30",
          enableState: "active",
          tradeState: "active"
        }
      ]; */
    },

    //删除用户
    deleteUser(val) {
      console.log(val);

      //这里写相应的逻辑，val是指传进来的参数也就是上面的scope.row.phone；也可以是scope.row.nickname等
    },
    //修改用户
    modifyUser(val) {
      let self = this;
    },
    //查看详情
    checkDetail(val) {
      console.log(val);
    },
    afterSuccess() {}
  }
};
</script>