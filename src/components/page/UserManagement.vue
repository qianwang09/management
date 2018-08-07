<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 任务管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-select v-model="select_cate" placeholder="筛选类型" class="handle-select mr10">
                    <el-option key="1" label="General" value="General"></el-option>
                    <el-option key="2" label="Project" value="Project"></el-option>
                    <el-option key="3" label="Operation" value="Operation"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="type" label="类型" sortable width="250">
                </el-table-column>
                <el-table-column prop="code" label="代码" sortable width="250">
                </el-table-column>
                <el-table-column prop="name" label="名称" >
                </el-table-column>

                <el-table-column label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button size="small" @click="handleFavorite(scope.$index, scope.row)">收藏</el-button>
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="类型">
                <!-- <el-input v-model="form.type"></el-input> -->

                 <el-select v-model="form.type" placeholder="筛选类型" class="handle-select mr10">
                    <el-option key="1" label="General" value="General"></el-option>
                    <el-option key="2" label="Project" value="Project"></el-option>
                    <el-option key="3" label="Operation" value="Operation"></el-option>
                </el-select>

                    <!-- <el-date-picker type="date" placeholder="选择类型" v-model="form.type"  style="width: 100%;"></el-date-picker> -->
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="代码">
                    <el-input v-model="form.code"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: "basetable",
  data() {
    return {
      // url: './static/vuetable.json',
      url: "./static/tasks.json",
      tableData: [],
      cur_page: 1,
      multipleSelection: [],
      select_cate: "",
      select_word: "",
      del_list: [],
      is_search: false,
      editVisible: false,
      delVisible: false,
      form: {
        type: "",
        name: "",
        code: ""
      },
      idx: -1
    };
  },
  created() {
    this.getData();
  },
  computed: {
    data() {
      return this.tableData.filter(d => {
        let is_del = false;
        for (let i = 0; i < this.del_list.length; i++) {
          if (d.name === this.del_list[i].name) {
            is_del = true;
            break;
          }
        }
        if (!is_del) {
          if (
            d.type.indexOf(this.select_cate) > -1 &&
            (d.name.indexOf(this.select_word) > -1 ||
              d.code.indexOf(this.select_word) > -1)
          ) {
            return d;
          }
        }
      });
    }
  },
  methods: {
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    },
    // 获取 easy-mock 的模拟数据
    getData() {
      debugger;
      // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
      if (process.env.NODE_ENV === "development") {
        this.url = "/ms/table/list";
      }
      this.$axios
        .post(this.url, {
          page: this.cur_page
        })
        .then(res => {
          debugger;
          this.tableData = res.data.list;
          if (this.url == "/ms/table/list") {
            this.tableData = [
              {
                type: "General",
                name: "Meeting",
                code: "GGG0201"
              },
              {
                type: "General",
                name: "Traning",
                code: "GGG0202"
              },
              {
                type: "General",
                name: "Staff club/PPG other activity",
                code: "GGG0203"
              },
              {
                type: "General",
                name: "Leave",
                code: "GGG0204"
              },
              {
                type: "Project",
                name: "India HR",
                code: "PPP0101"
              },
              {
                type: "Project",
                name: "India FIN transition",
                code: "PPP0103"
              },
              {
                type: "Project",
                name: "CHS",
                code: "PPP0106"
              },
              {
                type: "Project",
                name: "AP full scope",
                code: "PPP0107"
              },
              {
                type: "Operation",
                name: "TEC claim processing-CN",
                code: "FTC0001"
              },
              {
                type: "Operation",
                name: "TEC claim processing (AU&JP&IND&KOR)",
                code: "FTC0008"
              },
              {
                type: "Operation",
                name: "TEC claim processing (SE)",
                code: "FTC0009"
              },
              {
                type: "Operation",
                name: "TEC claim processing (CA)",
                code: "FTC0005"
              },
              {
                type: "Operation",
                name: "TEC claim processing (UK&IE)",
                code: "FTC0010"
              },
              {
                type: "Operation",
                name: "TEC claim processing (US)",
                code: "FTC0006"
              }
            ];
          }
        });
    },
    search() {
      this.is_search = true;
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleFavorite(index, row) {
    //   this.idx = index;
    //   const item = this.tableData[index];
    //   this.form = {
    //     type: item.type,
    //     code: item.code,
    //     name: item.name
    //   };
    //   this.editVisible = true;
    },
    handleEdit(index, row) {
      this.idx = index;
      const item = this.tableData[index];
      this.form = {
        type: item.type,
        code: item.code,
        name: item.name
      };
      this.editVisible = true;
    },
    handleDelete(index, row) {
      this.idx = index;
      this.delVisible = true;
    },
    delAll() {
      const length = this.multipleSelection.length;
      let str = "";
      this.del_list = this.del_list.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + " ";
      }
      this.$message.error("删除了" + str);
      this.multipleSelection = [];
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 保存编辑
    saveEdit() {
      this.$set(this.tableData, this.idx, this.form);
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
    },
    // 确定删除
    deleteRow() {
      this.tableData.splice(this.idx, 1);
      this.$message.success("删除成功");
      this.delVisible = false;
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
</style>
