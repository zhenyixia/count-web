<template>
  <div>
    <el-dialog
      title="录入数据"
      :visible.sync="modalShow"
      top="1%"
      width="70%"
      :before-close="modalClose"
      class="elDialogBody"
    >
      <div>
        <el-table :data="tableData" style="width:100%;" highlight-current-row>
          <el-table-column size="small" type="index" label="编号" width="50%"></el-table-column>
          <el-table-column size="small" prop="runDate" label="跑步日期"></el-table-column>
          <el-table-column size="small" prop="kilometer" label="跑步距离">
            <template slot-scope="scope">
              <el-input class="elInput" v-model="scope.row.kilometer"></el-input>
            </template>
          </el-table-column>
          <el-table-column size="small" prop="runSecond" label="跑步时长">
            <template slot-scope="scope">
              <el-input class="elInput" v-model="scope.row.runSecond"></el-input>
            </template>
          </el-table-column>
          <el-table-column size="small" prop="address" label="跑步地点">
            <template slot-scope="scope">
              <el-input class="elInput" v-model="scope.row.address" disabled="true"></el-input>
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
import { deepClone } from "@/common/util";
import { addRunData } from "@/common/httpService";
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
      for (let i = 0; i < 7; i++) {
        let dateStr = this.processDate(now);
        now.setDate(now.getDate() - 1);
        this.tableData.push({
          runDate: dateStr,
          kilometer: null,
          runSecond: null,
          address: "东滩社区"
        });
      }
    },
    processDate(date) {
      let dateStr = date.getFullYear() + "-";
      let month = date.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      let day = date.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      return dateStr + month + "-" + day;
    },
    modalClose() {
      this.modalShow = false;
      this.tableData = [];
    },
    submit() {
      this.modalShow = false;
      let paramData = deepClone(this.tableData);
      let lastParamData = [];
      for (let row of paramData) {
        if (!row.runSecond || !row.kilometer) {
          continue;
        }
        let runSecond = row.runSecond;
        row.runSecond = this.calcActualSeconds(runSecond);
        let kilometer = row.kilometer;
        let secondsByKm = (row.runSecond / kilometer).toFixed(0);
        row.timeByKm = this.calcMinSec(secondsByKm);
        row.kmByHour = Math.round(
          (row.kilometer / row.runSecond) * 3600
        ).toFixed(2);
        lastParamData.push(row);
      }

      addRunData(lastParamData).then(res => {
        alert(res.msg);
        this.tableData = [];
      });
    },
    calcActualSeconds(runSecond) {
      let minute = parseInt(runSecond);
      let second = (runSecond - minute).toFixed(2) * 100;
      return minute * 60 + second;
    },
    calcMinSec(secondsByKm) {
      let minute = secondsByKm / 60;
      let minuteInt = parseInt(minute);
      let second = Math.round((minute - minuteInt) * 60);
      return minuteInt + "分" + second + "秒";
    }
  }
};
</script>
<style scoped>
.elInput >>> .el-input__inner {
  height: 30px;
}

.elDialogBody >>> .el-dialog__body {
  padding: 8px 20px;
}
</style>