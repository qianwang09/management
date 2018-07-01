<template>
    <div style="text-align: center;" id="favoritescontainer"> 
    <template>
  <el-transfer  style="text-align: left; display: inline-block width:600px; max-height:800px;"
    filterable
    :filter-method="filterMethod"
    filter-placeholder="请输入任务名称代码"
    v-model="favorites"
    :data="tasks"
     :titles="['所有任务', '我的收藏']"
    :button-texts="['取消收藏', '收藏']">
       <el-button class="transfer-footer" slot="right-footer" size="small">保存收藏</el-button>
  </el-transfer>
</template>
    </div>
</template>

<script>
export default {
  name: "basetable",
  data() {
    return {
      tasksUrl: "/static/tasks.json",
      tasks: [],
      favoriteUrl: "/static/favorites.json",
      favorites: [],
      username: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 获取 easy-mock 的模拟数据
    getData() {
      debugger;
      this.username = localStorage.getItem("ms_username");
      // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
      this.$axios.get(this.tasksUrl).then(res => {
        debugger;
        if (res.status == 200 || res.statusText == "OK") {
          //this.tasks = res.data;
          var that = this;
          res.data.forEach(task => {
            that.tasks.push({
              label: task.name,
              key: task.code
            });
          });
        }
      });
      this.$axios.get(this.favoriteUrl).then(res => {
        debugger;
        if (res.status == 200 || res.statusText == "OK")
          var favoritesList = res.data;
        var that = this;
        favoritesList.forEach(favorite => {
          if (favorite.username == that.username) {
            favorite.tasks.forEach(f => {
              that.favorites.push({
                label: f.name,
                key: f.code
              });
            });
          }
        });
      });
    },
    filterMethod(query, item) {
        return item.label.indexOf(query) > -1 || item.key.indexOf(query) > -1;
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
#favoritescontainer .el-transfer-panel{
  width: 400px;
  max-height: 600px;
}
</style>
