<template>
    <div class="table">      
        <div class="container">
            <div class="handle-box">
              
                  <el-date-picker  style="left:40%"    v-model="yearMonth"      type="month"      placeholder="Select YearMonth">    </el-date-picker>
                  <el-switch style="float:right" v-model="workingHourEditable"   inactive-text="Preview" active-text="Edit" > </el-switch>

            </div>
            <el-table :data="workingHourProcessMonthList" border style="width: 100%" ref="multipleTable">
                <!-- <el-table-column v-for="item in worktimeData" :prop="item" :key="item" label="item" sortable >          </el-table-column> -->
                <el-table-column prop="Process" label="Process" sortable fixed min-width="140">          </el-table-column>
               
                 <el-table-column  :label="label(1)" >   <template slot-scope="scope" min-width="120">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[0].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[0].Hours" />                     
                  </template>  </el-table-column>
                <el-table-column  :label="label(2)" >   <template slot-scope="scope" min-width="120">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[1].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[1].Hours" />                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label(3)" >   <template slot-scope="scope" min-width="120">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[2].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[2].Hours" />                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label(4)" >   <template slot-scope="scope" min-width="120">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[3].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[3].Hours" />                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label(5)" >   <template slot-scope="scope" min-width="120">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[4].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[4].Hours" />                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label(6)" >   <template slot-scope="scope" min-width="120">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[5].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[5].Hours" />                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label(7)" >   <template slot-scope="scope" min-width="120">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[6].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[6].Hours" />                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label(8)" >   <template slot-scope="scope" min-width="120">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[7].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[7].Hours" />                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label(9)" >   <template slot-scope="scope" min-width="120">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[8].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[8].Hours" />                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label(10)" >   <template slot-scope="scope" min-width="120">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[9].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[9].Hours" />                     
                  </template>  </el-table-column>
              



                  <el-table-column  :label="label(11)" >   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[10].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[10].Hours" />                     
                  </template>  </el-table-column>
                <el-table-column  :label="label(12)" >   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[11].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[11].Hours" />                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label(13)" >   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[12].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[12].Hours" />                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label(4)" >   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[3].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[3].Hours" />                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label(5)" >   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[4].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[4].Hours" />                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label(6)" >   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[5].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[5].Hours" />                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label(7)" >   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[6].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[6].Hours" />                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label(8)" >   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[7].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[7].Hours" />                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label(9)" >   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[8].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[8].Hours" />                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label(10)" >   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[9].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[9].Hours" />                     
                  </template>  </el-table-column>

                 <el-table-column label="操作" min-width="140">
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
      Url: 'api/workinghours',
      workingHourEditable: true,
      // worktimeData: [{Process: 'process1', '01': 3, '02': {hour:3, status:'1'}, '03': 9},{Process: 'process2', '01': 5, '02': {hour:6, status:'1'}, '03': 9}],
      worktimeData: [{Process: 'process1', '01': 3, '02':7, '03': 6},
      {Process: 'process2', '01': 5,  '03': 9}],
      yearMonth: new Date(),
      tableData: [],
      workingHourProcessMonthList: []
    }
  },
  created() {
    this.yearMonth = new Date()
    this.getData()
    
  },
  computed: {
    year(){
      return this.yearMonth.getFullYear()
    },
    month(){
      return this.yearMonth.getMonth() + 1
    },
    days(){
      retrun (new Date(this.year, this.month, 0)).getDate()
    },
    
   
  },
  methods: {
    getData() {
      this.$axios.get(this.$root.HostURL + this.Url + '?userName=' + this.$root.user.Name + '&&yearMonth=' + this.yearMonth.toISOString()).then(res => {
        if (res.status == 200 || res.statusText == "OK") {
          debugger
          this.tableData = res.data;
          this.workingHourProcessMonthList = res.data
        }
      });
    },
    label(day){
      return this.month + '-' + day
    },
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
