<template>
  <div>
    <el-dialog
      title="录入数据"
      :visible.sync="modalShow"
      top="1%"
      width="70%"
      :before-close="modalClose"
    >
      <div>
        <el-table :data="tableData" max-height="550" style="width:100%;" highlight-current-row>
          <el-table-column size="small" type="index" label="编号" width="50%"></el-table-column>
          <el-table-column size="small" prop="runDate" label="跑步日期"></el-table-column>
          <el-table-column size="small" prop="kilometer" label="跑步距离">
            <template slot-scope="scope">
              <el-input v-model="scope.row.kilometer"></el-input>
            </template>
          </el-table-column>
          <el-table-column size="small" prop="runSecond" label="跑步时长">
            <template slot-scope="scope">
              <el-input v-model="scope.row.runSecond"></el-input>
            </template>
          </el-table-column>
          <el-table-column size="small" prop="address" label="跑步地点">
            <template slot-scope="scope">
              <el-input v-model="scope.row.address"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <div style="display:inline-block;float:center;margin-top:20px;">
          <el-button type="primary" size="small" @click="submit()">提交</el-button>
          <el-button type="primary" size="small" @click="modalClose()">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalShow: false,
      tableData: []
    };
  },
  methods: {
    init() {
      this.modalShow = true;
      let now = new Date();
      for (let i = 0; i < 10; i++) {
        let dateStr = now.toLocaleDateString().replaceAll("/", "-");
        now.setDate(now.getDate() - 1);
        this.tableData.push({
          runDate: dateStr,
          kilometer: null,
          runSecond: null,
          address: "东滩社区"
        });
      }
    },
    modalClose() {
      this.modalShow = false;
      this.tableData = [];
    },
    submit() {}
  }
};
</script>