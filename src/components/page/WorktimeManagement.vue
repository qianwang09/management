<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 工时管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量新增</el-button>
                  <el-input v-model="select_word" placeholder="按员工筛选" class="handle-input mr10"></el-input>
                <el-select v-model="select_cate" placeholder="按任务筛选" class="handle-select mr10">
                      <el-option key="1" label="Traning" value="Traning"></el-option>
                    <el-option key="2" label="Meeting" value="Meeting"></el-option>
                    <el-option key="3" label="TEC VAT handling-CN" value="TEC VAT handling-CN"></el-option>
                    <el-option key="4" label="TEC claim processing (CA)" value="TEC claim processing (CA)"></el-option>
                </el-select>

                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <el-button type="primary" icon="plus" class="handle-del mr10 right" style="float:right;" @click="createWorktime">新增工时</el-button>
            </div>
            <el-table :data="worktimeList" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="姓名" sortable >
                </el-table-column>
                <el-table-column prop="date" label="日期" sortable width="150">
                </el-table-column>           
                 <el-table-column prop="status" label="状态" >
                </el-table-column>
                <el-table-column  v-for="task in taskColumns" :prop="task" :label="task" :key="task">
                </el-table-column>
                <el-table-column label="操作" width="250">
                    <template slot-scope="scope">
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
        <el-dialog title="编辑工时" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">           
                <el-form-item label="日期">
                   <el-date-picker type="date" placeholder="选择日期" v-model="form.date"  style="width: 100%;"></el-date-picker>
                </el-form-item>         
              <el-table
                :data="form.worktime"
                style="width: 100%">
                <el-table-column
                  prop="task"
                  label="任务"
                  width="280">
                </el-table-column>              
                <el-table-column
                label="工时"
                width="280">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.hour" ></el-input>                
                </template>
              </el-table-column>
          </el-table>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="新增工时" :visible.sync="createVisible" width="30%">
            <el-form ref="form" :model="createform" label-width="50px">
                <!-- <el-form-item label="姓名">
                    <el-input v-model="form.name"  :disabled="true"></el-input>
                </el-form-item> -->
                <el-form-item label="日期">
                   <el-date-picker type="date" placeholder="选择日期" v-model="createform.date" ></el-date-picker>
                </el-form-item>
              <template>
              <el-table
                :data="createform.worktime"
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="任务"
                  width="280">
                </el-table-column>              
                <el-table-column
                label="工时"
                width="280">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.hour" ></el-input>                
                </template>
              </el-table-column>
          </el-table>
  </template>


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
      username: "",
      worktimeUrl: "/static/worktime.json",
      favoriteUrl: "/static/favorites.json",
      favorites: [],
      tableData: [],
      cur_page: 1,
      multipleSelection: [],
      select_cate: "",
      select_word: "",
      del_list: [],
      is_search: false,
      createVisible: false,
      editVisible: false,
      delVisible: false,
      worktimeFavoriteTemplate: [],
      worktimeList: [],
      taskColumns: [],
      form: {
        name: "",
        date: "",
        worktime: []
      },
      createform: {
        name: "",
        date: "",
        worktime: []
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
            d.task.indexOf(this.select_cate) > -1 &&
            (d.name.indexOf(this.select_word) > -1 ||
              d.name.indexOf(this.select_word) > -1)
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
      this.username = localStorage.getItem("ms_username");
      // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
      this.$axios.get(this.worktimeUrl).then(res => {
        debugger;
        if (res.status == 200 || res.statusText == "OK")
          //this.tableData = res.data
          this.worktimeList = res.data;
        var that = this;
        this.worktimeList.forEach(item => {
          item.worktime.forEach(worktimeItem => {
            if (that.taskColumns.indexOf(worktimeItem.task)<0) {
              that.taskColumns.push(worktimeItem.task);
            }
            item[worktimeItem.task] = worktimeItem.hour;
          });
        });
      });
      this.$axios.get(this.favoriteUrl).then(res => {
        debugger;
        if (res.status == 200 || res.statusText == "OK")
          var favoritesList = res.data;
        var that = this;

        favoritesList.forEach(favorite => {
          if (favorite.username == this.username) {
            that.favorites = favorite.tasks;
            //for creation: create favorite task and work hour structure
            that.favorites.forEach(f => {
              that.worktimeFavoriteTemplate.push({
                name: f.name,
                code: f.code,
                hour: 0
              });
            });
          }
        });
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
    createWorktime() {
      //const item = this.tableData[index];
      debugger;

      var today = new Date();
      this.createform = {
        name: "",
        date: today,
        worktime: []
      };
      this.createform.name = this.username;
      this.createform.worktime = this.worktimeFavoriteTemplate.slice(0);
      this.createVisible = true;
    },
   
    handleEdit(index, row) {
      this.idx = index;
      const item = this.worktimeList[index];
      this.form = item
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
