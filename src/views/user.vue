<template>
  <div>
    <el-table :data="tableData" stripe border style="width:100%" highlight-current-row>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="phone" label="手机号" align="center" min-width="120"></el-table-column>
      <el-table-column prop="nickname" label="昵称" align="center" min-width="100"></el-table-column>
      <el-table-column prop="createTime" label="注册时间" align="center" min-width="120"></el-table-column>
      <el-table-column prop="enableState" label="用户状态" align="center" min-width="100"></el-table-column>
      <el-table-column prop="tradeState" label="交易状态" align="center" min-width="100"></el-table-column>
      <el-table-column label="操作" align="center" min-width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="checkDetail(scope.row.phone)">查看详情</el-button>
          <el-button type="info" @click="modifyUser(scope.row.phone)">修改</el-button>
          <el-button type="info" @click="deleteUser(scope.row.phone)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-upload
        class="upload-demo btRight"
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
import {yearQuota} from "@/common/httpService";
export default {
  data() {
    return {
      tableData: {}
    };
  },
  methods: {
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
    }
  }
};
</script>