<template>
  <div>
    <div>
      <div class="page-tab-container">
        <mt-tab-container class="page-tabbar-tab-container" v-model="selected" swipeable>
          <mt-tab-container-item id="offer">
            <mt-header fixed title="待办事项"></mt-header>
            <div id="waittodo">
              <mt-button type="primary" @click="loadMore">加载</mt-button>
              <mt-navbar v-model="waitTodo">
                <mt-tab-item id="3month">近三月提醒</mt-tab-item>
                <mt-tab-item id="1month">近一月提醒</mt-tab-item>
                <mt-tab-item id="7day">近一周提醒</mt-tab-item>
              </mt-navbar>
              <mt-tab-container v-model="waitTodo">
                <mt-tab-container-item id="3month">
                  <div id="billscroll">
                    <mt-loadmore
                      :top-method="loadTop"
                      :bottom-method="loadBottom"
                      :bottom-all-loaded="isAllLoaded"
                      ref="loadmore"
                    >
                      <ul>
                        <li v-for="item in test">{{ item }}</li>
                      </ul>
                    </mt-loadmore>

                    <!--显示加载中转菊花-->
                    <div class="loading-box tc" v-if="isLoading">
                      <mt-spinner type="snake" class="loading-more"></mt-spinner>
                      <span class="loading-more-txt">加载中...</span>
                    </div>

                    <div class="no-more" v-if="noMore">没有更多了~</div>
                  </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="1month">
                  <mt-cell v-for="n in 4" :title="'content ' + n" />
                </mt-tab-container-item>
                <mt-tab-container-item id="7day">
                  <mt-cell v-for="n in 6" :title="'content ' + n" />
                </mt-tab-container-item>
              </mt-tab-container>
            </div>
          </mt-tab-container-item>

          <mt-tab-container-item id="bill">
            <mt-header fixed title="订单"></mt-header>
            <div id="searchdiv">
              <i id="searchIcon" class="mint-toast-icon mintui mintui-search"></i>
              <mt-field
                v-model="searchValue"
                id="searchbar"
                label
                placeholder="输入车牌号/姓名/手机号码查询投保信息"
              ></mt-field>
              <mt-button type="primary" id="searchButton" v-on:click="searchbill()">搜索</mt-button>
            </div>
            <div id="billlist" v-for="(item, i) in billlist" @click="toDetail(item)">
              <mt-cell :title="item.plate_num" :label="item.remark" :value="item.insured_is"></mt-cell>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="offer">待办事项</mt-tab-item>
      <mt-tab-item id="bill">订单</mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import {
  Tabbar,
  TabItem,
  Search,
  TabContainer,
  TabContainerItem,
  Cell,
  Header,
  Field,
  Button,
  InfiniteScroll,
  Spinner,
  Toast,
  Loadmore
} from "mint-ui";
//import infiniteScroll from 'vue-infinite-scroll'
//Vue.use(InfiniteScroll);

export default {
  name: "mindex",
  components: {
    Loadmore
  },
  data() {
    return {
      waitTodo: "3month",
      loading: false,
      selected: "offer",
      searchValue: "",
      billlist: [],
      count: 0,
      data: [],
      busy: true,
      page: 1,
      isAllLoaded: false,
      list: [],
      isLoading: false, // 加载中转菊花
      isMoreLoading: true, // 加载更多中
      noMore: false, // 是否还有更多
      test: 10,
      pageInfo: {
        // 分页信息
        page: 1,
        page_size: 2,
        total: 0, // 总条数
        totalPage: 1 // 总分页数
      }
    };
  },
  mounted() {
    //this.getProjectInfo()
  },
  watch: {
    waitTodo: function(val, oldVal) {
      console.log(`val => ${val} oldVal => ${oldVal}`);
      // this.busy = true
      // this.loadMore()

      this.isMoreLoading = true;
      this.selectIndex = index;
      this.pageInfo.page = 1; // 初始化
      this.pageInfo.totalPage = 1;
      this.list = [];
      this.noMore = false;
      this.getProjectInfo();
    }
  },
  methods: {
    searchbill: function() {
      console.log("search ~~~" + this.searchValue);
      this.$axios
        .get(`/api/vehicles`, {
          params: {
            plate_num: this.searchValue
          }
        })
        .then(res => {
          console.log(`${JSON.stringify(res.data.result)}`);
          this.billlist = res.data.result;
        });
    },
    toDetail: function(item) {
      this.$router.push({ path: "/m_billdetail", query: { detail: item } });
    },
    getProjectInfo(type) {
      // 获取项目列表
      let _this = this;
      this.isLoading = true;

      let identity = localStorage.getItem("identity");
      // this.busy = true
      var options = {
        id: localStorage.getItem("id"),
        page: this.page,
        identity: identity
      };
      if (identity == "manager") {
        options["managerid"] = localStorage.getItem("id");
      } else {
        options["employeeid"] = localStorage.getItem("id");
      }

      this.$axios
        .post(`api/vehicles/getVehicles`, options)
        // this.$http.get('/api/steward/projects', {
        //     params: {
        //         status: _this.selectIndex,
        //         current_page: _this.pageInfo.page,
        //         per_page: _this.pageInfo.page_size
        //     }
        // })
        .then(res => {
          console.log(`名下车辆 - ${JSON.stringify(res.data)}`);
          let datas = res.data;
          if (datas.code === 0) {
            if (type === "loadMore") {
              this.billlist = this.billlist.concat(datas.data.list);
            } else {
              this.billlist = datas.data.list;
            }
            // 设置分页
            this.pageInfo.total = 100; //datas.data.list.length
            console.log(`total = ${datas.data.list.length}`);
            this.pageInfo.totalPage = Math.ceil(
              this.pageInfo.total / this.pageInfo.page_size
            );
            console.log(
              "总页数",
              Math.ceil(this.pageInfo.total / this.pageInfo.page_size)
            );
          } else {
            Toast({
              message: datas.msg,
              duration: 2000
            });
          }
          this.isLoading = false;
          this.isMoreLoading = false;
        });
    },
    loadMore() {
      // 加载更多
      this.pageInfo.page += 1; // 增加分页
      this.isMoreLoading = true; // 设置加载更多中
      this.isLoading = true; // 加载中
      console.log(`----> ${this.pageInfo.page}, ${this.pageInfo.totalPage}`);
      if (this.pageInfo.page > this.pageInfo.totalPage) {
        // 超过了分页
        this.noMore = true; // 显示没有更多了
        this.isLoading = false; // 关闭加载中
        return false;
      }
      // 做个缓冲
      setTimeout(() => {
        this.getProjectInfo("loadMore");
      }, 100);
    },
    loadTop() {
      console.log("---- loadTop ----");
      this.getProjectInfo("loadMore");
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {
      console.log("---- loadBottom ----");
      this.getProjectInfo("loadMore");
      //this.isAllLoaded = true;
      this.test = this.test + 10;
      this.$refs.loadmore.onBottomLoaded();
    }
    //<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="isAllLoaded" ref="loadmore">
  }
};
</script>

<style scoped="scoped">
#billscroll {
  margin-top: 10px;
  height: calc(100vh - 176px);

  overflow: scroll;
}
#waittodo {
  margin-top: 40px;
  margin-bottom: 140px;
  padding: 10px;
}
#searchdiv {
  margin-top: 40px;
}
#searchbar {
  display: inline;
  float: left;
  border: 1px solid red;
  width: 75%;
  margin: 10px;
  height: 10px;
  min-height: 35px;
}
#searchIcon {
  display: inline;
  float: left;
  padding-left: 10px;
  padding-top: 20px;
}
#searchButton {
  display: inline;
  float: left;
  margin-top: 10px;
  padding-top: 0px;
  padding-right: 0px;
  padding-left: 0px;
  height: 35px;
}
#billlist {
  display: block;
  clear: both;
}
.mint-cell {
  border-bottom: 1px solid darkgray;
}
.projectUi {
  padding: 0 0 0 4px;
  height: 100px;
}
.projectLi {
  height: 500px;
}
</style>