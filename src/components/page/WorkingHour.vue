<template>
    <div class="table">      
        <div class="container">
            <div class="handle-box">
              
                  <el-date-picker  style="left:40%"    v-model="yearMonth"      type="month"      placeholder="Select YearMonth">    </el-date-picker>
                  <el-button v-show="workingHourEditable" style="float:right" type="primary" icon="el-icon-edit">Save </el-button>
                  <el-switch style="float:right" v-model="workingHourEditable"   inactive-text="Preview" active-text="Edit" > </el-switch>

            </div>
            <el-table :data="workingHourProcessMonthList" border style="width: 100%" ref="multipleTable">
                <!-- <el-table-column v-for="item in worktimeData" :prop="item" :key="item" label="item" sortable >          </el-table-column> -->
                <el-table-column prop="Process" label="Process" sortable fixed min-width="140">          </el-table-column>
               
                 <el-table-column  :label="label('01')" min-width="120">   <template slot-scope="scope" >
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[0].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[0].Hours" :readonly="workingHourEditable" />                     
                  </template>  </el-table-column>
                <el-table-column  :label="label('02')" min-width="120">   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[1].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[1].Hours" :readonly="workingHourEditable"/>                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label('03')" min-width="120">   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[2].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[2].Hours"  type="number" :readonly="!workingHourEditable"/>                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label('04')" min-width="120">   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[3].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[3].Hours" type="number" :readonly="false"/>                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label('05')" min-width="120">   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[4].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[4].Hours" type="number"/>                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label('06')" min-width="120">   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[5].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[5].Hours" type="number"/>                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label('07')" class-name="weekend" min-width="120">   <template slot-scope="scope">
                      <div v-show="!workingHourEditable" min-width="120">{{scope.row.workingHourList[6].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[6].Hours" type="number"/>                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label('08')" min-width="120">   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[7].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[7].Hours" type="number"/>                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label('09')" min-width="120">   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[8].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[8].Hours" type="number"/>                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label('10')" min-width="120">   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[9].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[9].Hours" type="number"/>                     
                  </template>  </el-table-column>
              



                  <el-table-column  :label="label('11')" min-width="120">   <template slot-scope="scope" >
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[10].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[10].Hours" :readonly="workingHourEditable" />                     
                  </template>  </el-table-column>
                <el-table-column  :label="label('12')" min-width="120">   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[11].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[11].Hours" :readonly="workingHourEditable"/>                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label('13')" min-width="120">   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[12].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[12].Hours" :readonly="!workingHourEditable"/>                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label('14')" min-width="120">   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[13].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[13].Hours" :readonly="false"/>                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label('15')" min-width="120">   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[14].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[14].Hours" />                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label('16')" min-width="120">   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[15].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[15].Hours" />                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label('17')" class-name="weekend" min-width="120">   <template slot-scope="scope">
                      <div v-show="!workingHourEditable" min-width="120">{{scope.row.workingHourList[16].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[16].Hours"/>                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label('18')" min-width="120">   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[17].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[17].Hours" />                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label('19')" min-width="120">   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[18].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[18].Hours" />                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label('20')" min-width="120">   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[19].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[19].Hours" />                     
                  </template>  </el-table-column>


                <el-table-column  :label="label('21')" min-width="120">   <template slot-scope="scope" >
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[20].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[20].Hours" :readonly="workingHourEditable" />                     
                  </template>  </el-table-column>
                <el-table-column  :label="label('22')" min-width="120">   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[21].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[21].Hours" :readonly="workingHourEditable"/>                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label('23')" min-width="120">   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[22].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[22].Hours" :readonly="!workingHourEditable"/>                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label('24')" min-width="120">   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[23].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[23].Hours" :readonly="false"/>                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label('25')" min-width="120">   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[24].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[24].Hours" />                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label('26')" min-width="120">   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[25].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[25].Hours" />                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label('27')" class-name="weekend" min-width="120">   <template slot-scope="scope">
                      <div v-show="!workingHourEditable" min-width="120">{{scope.row.workingHourList[26].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[26].Hours"/>                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label('28')" min-width="120">   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[27].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[27].Hours" />                     
                  </template>  </el-table-column>
                  <!-- <el-table-column  :label="label('29')" min-width="120">   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[28].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[28].Hours" />                     
                  </template>  </el-table-column>
                  <el-table-column  :label="label('30')" min-width="120">   <template slot-scope="scope">
                      <div v-show="!workingHourEditable">{{scope.row.workingHourList[29].Hours}}</div>
                      <el-input  v-show="workingHourEditable" v-model="scope.row.workingHourList[29].Hours" />                     
                  </template>  </el-table-column> -->
                 <!-- <el-table-column label="操作" min-width="140">
                    <template slot-scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column> -->
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
      var date= new Date(this.year, this.month, day)
      return this.month + '-' + day + '   ' + date.toDateString().substring(0,3)
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
.weekend{
  background-color: yellow;
}
</style>
