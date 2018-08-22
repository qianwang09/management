<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 工时管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量新增</el-button>
                  <el-input v-model="select_word" placeholder="按员工筛选" class="handle-input mr10"></el-input>
                <el-select v-model="select_cate" placeholder="按任务筛选" class="handle-select mr10">
                      <el-option key="1" label="Traning" value="Traning"></el-option>
                    <el-option key="2" label="Meeting" value="Meeting"></el-option>
                    <el-option key="3" label="TEC VAT handling-CN" value="TEC VAT handling-CN"></el-option>
                    <el-option key="4" label="TEC claim processing (CA)" value="TEC claim processing (CA)"></el-option>
                </el-select>

                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <el-button type="primary" icon="plus" class="handle-del mr10 right" style="float:right;" @click="createWorktime">新增工时</el-button> -->
            </div>
            <el-table :data="worktimeData" border style="width: 100%" ref="multipleTable">
                <el-table-column type="selection" width="55"></el-table-column>
                <!-- <el-table-column v-for="item in worktimeData" :prop="item" :key="item" label="item" sortable >          </el-table-column> -->
                <el-table-column prop="Process" label="Process" sortable >          </el-table-column>
                <el-table-column prop="01" label="01" sortable width="150">                </el-table-column>           
                <el-table-column prop="02.hour" label="02" >                </el-table-column>
                 <el-table-column  label="03" >
                    <template slot-scope="scope">
                      <div v-show="editMode">{{scope.row['03']}}</div>
                      <el-input  v-show="!editMode" v-model="scope.row['03']" />                     
                  </template>
                </el-table-column>
                 <el-table-column label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
          
        </div>

    </div>
</template>

<script>
export default {
  name: "basetable",
  data() {
    return {
      editMode: true,
      // worktimeData: [{Process: 'process1', '01': 3, '02': {hour:3, status:'1'}, '03': 9},{Process: 'process2', '01': 5, '02': {hour:6, status:'1'}, '03': 9}],
      worktimeData: [{Process: 'process1', '01': 3, '03': 9},{Process: 'process2', '01': 5,  '03': 9}],
      yearMonth: '2018-03',
    };
  },
  created() {
    
  },
  computed: {
   
  },
  methods: {
       handleEdit(index, row) {
         debugger
      this.idx = index;
      const item = this.worktimeData[index];
      this.editMode = !this.editMode
     
    },
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
