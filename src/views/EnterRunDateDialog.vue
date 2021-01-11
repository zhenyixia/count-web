<template>
  <el-dialog>
    <!-- 显示的表格 -->
    <a-table :columns="columns" :data-source="data" bordered>
      <template v-for="col in ['name', 'age', 'address']" :slot="col" slot-scope="text, record,">
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>{{ text }}</template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record,">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.key)">保存</a>
            <a-popconfirm
              title="确定取消?"
              okText="确定"
              cancelText="取消"
              @confirm="() => cancel(record.key)"
            >
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a :disabled="editingKey !== ''" @click="() => edit(record.key)">修改</a>
          </span>
        </div>
      </template>
    </a-table>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        kilometer: 1.86,
        address: "",
        runSecond: 6.24,
        runDate: "2020-01-10"
      },
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      resourcesUrl: window.SITE_CONFIG.resourcesUrl,
      dataRule: {
        nickName: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    init(id) {
      this.dataForm.userId = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.dataForm.resetFields();
      });
      if (this.dataForm.userId) {
        this.$http({
          url: this.$http.adornUrl(`/admin/user/info/${this.dataForm.userId}`),
          method: "get",
          params: this.$http.adornParams()
        }).then(({ data }) => {
          this.dataForm = data;
        });
      }
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/admin/user`),
            method: this.dataForm.userId ? "put" : "post",
            data: this.$http.adornData({
              userId: this.dataForm.userId || undefined,
              nickName: this.dataForm.nickName,
              status: this.dataForm.status
            })
          }).then(({ data }) => {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.visible = false;
                this.$emit("refreshDataList", this.page);
              }
            });
          });
        }
      });
    }
  }
};
</script>
