<template>
    <div class="table">
        <div class="container">
            <div class="handle-box" style="padding:20px 10px;">
               <span class="tableInfoLeft">
                  <span>Name: {{team.Name}}</span>
                  <span>Cost Center: {{team.CostCenter}}</span>
              </span>
            </div>
            <el-table :data="data" border style="width: 100%" >
                <el-table-column prop="Id" label="Id" sortable  min-width="60"> </el-table-column>
                <el-table-column prop="Name" label="User Name" sortable   min-width="100"> </el-table-column>
                <el-table-column prop="Level" label="Level" sortable  min-width="60"> </el-table-column>
                <el-table-column prop="Role" label="Role" sortable  min-width="100"> </el-table-column>
                <el-table-column prop="Status" label="Status" sortable  min-width="100"></el-table-column>
                <el-table-column label="Effective Date" sortable min-width="120">
                  <template slot-scope="scope"> {{ formatDate(scope.row.EffectiveDate) }} </template>
                </el-table-column>
                <el-table-column label="Expiry Date" sortable min-width="120">
                  <template slot-scope="scope"> {{ formatDate(scope.row.ExpiryDate) }} </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
  name: "UserManagement",
  data() {
    return {
      // url: './static/vuetable.json',
      Url: "api/Users",
      UrlRole: 'api/Roles',
      UrlLevel: 'api/Levels',
      UrlTeam: 'api/Teams',
      tableData: [],
      team: ''
    };
  },
  created() {
    this.getData();
    this.getTeams()
  },
  computed: {
    data() {
      return this.tableData;
    }
  },
  methods: {
    getData() {     
      this.$axios.get(this.$root.HostURL + this.Url + '?approver=' + this.$root.user.Name + '&&status=Active' ).then(res => {
        debugger
        if (res.status == 200 || res.statusText == "OK") {
          this.tableData = res.data
        }
      });
    },
    getTeams() {
      this.$axios.get(this.$root.HostURL + this.UrlTeam + '?name=' + this.$root.user.Team.Name).then(res => {
        if (res.status == 200 || res.statusText == "OK") {
          this.team = res.data;
        }
      });
    },
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 10px;
}

.handle-select {
  min-width: 160px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.hiddenColumn {
  display: none;
}
</style>
