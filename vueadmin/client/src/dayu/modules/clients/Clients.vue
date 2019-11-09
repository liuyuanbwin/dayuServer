<template>
  <div class="staff">
    <div class="list">
      <el-table :data="tableClients" stripe="stripe">
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-avatar :src="scope.row.name"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="昵称">
          <img src alt />
        </el-table-column>
        <el-table-column prop="sex" label="性别" :formatter="formatterSex"></el-table-column>
        <el-table-column prop="city" label="城市"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <!-- <el-button @click="handleClick(scope.row)" size="mini"
            type="success">查看</el-button> <el-button size="mini">编辑</el-button>-->
            <el-dropdown margin-right:10px>
              <el-button type="primary" size="mini" icon="el-icon-magic-stick">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item>双皮奶</el-dropdown-item>
                <el-dropdown-item>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- <el-button size="mini" type="primary" icon="el-icon-magic-stick"></el-button> -->
            <el-button size="mini" type="primary" icon="el-icon-share"></el-button>
            <el-button size="mini" type="primary" icon="el-icon-delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="paginations.page_index"
        :page-sizes="paginations.page_sizes"
        :page-size="paginations.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paginations.total"
        background="background"
      ></el-pagination>
    </div>
  </div>
</template>

    <script>
export default {
  name: "list",
  data() {
    return {
      clients: [],
      tableClients: [],
      paginations: {
        page_index: 1,
        total: 0,
        page_size: 5,
        page_sizes: [5, 10, 15, 20]
      }
    };
  },
  methods: {
    sizeChange(page_size) {
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.tableClients = this.clients.filter((item, index) => {
        return index < page_size;
      });
    },
    currentChange(page) {
      let index = this.paginations.page_size * (page - 1);
      let allClient = this.paginations.page_size * page;
      let tablist = [];
      for (let i = index; i < allClient; i++) {
        if (this.clients[i]) {
          tablist.push(this.clients[i]);
        }
      }
      this.tableClients = tablist;
    },
    setPaginations() {
      this.paginations.total = this.clients.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 10;
      this.tableClients = this.clients.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    getClients() {
      this.$axios.get("api/clients").then(res => {
        console.log("sksh   " + JSON.stringify(res));
        if (res.data.code == 0) {
          const data = res.data.results;
          this.clients = data;
          console.log(`client ---- ${JSON.stringify(this.clients)}`)
          this.setPaginations();
        }
      });
    },
    formatterSex: function(row, column) {
      return row.sex === 1 ? "男" : row.sex === 2 ? "女" : "未知";
    }
  },
  mounted() {
    this.getClients();
  }
};
</script>

    <style scoped="scoped">
.staff {
  margin: 10px;
  background: orange;
}
.btnRight {
  float: right;
}
.list {
  margin: 120px;
}
.page {
  float: right;
  margin-top: 20px;
  margin-bottom: 80px;
}
</style>