<template>
  <div :style="{height: deviceHieght - 26 + 'px'}">
    <div :style="{height: deviceHieght - 26 + 'px'}">
      <div class="page-tab-container" >
        <mt-tab-container class="page-tabbar-tab-container" v-model="selected" swipeable :style="{height: deviceHieght - 26 + 'px'}">
          <mt-tab-container-item id="offer">
            <mt-header fixed title="待办事项"></mt-header>
            <div id="waittodo" :style="{height: wrapperHeight - 80 + 'px',background:'red'}">
              <!-- <mt-button type="primary" @click="loadMore">加载</mt-button> -->
              <mt-navbar v-model="waitTodo">
                <mt-tab-item id="3month">近三月提醒</mt-tab-item>
                <mt-tab-item id="1month">近一月提醒</mt-tab-item>
                <mt-tab-item id="7day">近一周提醒</mt-tab-item>
              </mt-navbar>
              <mt-tab-container v-model="waitTodo">
                <mt-tab-container-item id="3month">
                  <div class="page-loadmore" :style="{height: deviceHieght - 80 - 52 + 'px',background:'red'}">
                    <h1 class="page-title">Pull up</h1>
                    <p class="page-loadmore-desc">在列表底部, 按住 - 上拉 - 释放可以获取更多数据</p>
                    <p class="page-loadmore-desc">translate : {{ translate }}</p>
                    <div
                      class="loading-background"
                      :style="{ transform: 'scale3d(' + moveTranslate + ',' + moveTranslate + ',1)' }"
                    >translateScale : {{ moveTranslate }}</div>
                    <div
                      class="page-loadmore-wrapper"
                      ref="wrapper"
                      :style="{ height: wrapperHeight + 'px' }"
                    >
                      <mt-loadmore
                        :top-method="loadTop"
                        @translate-change="translateChange"
                        @top-status-change="handleTopChange"
                        :bottom-method="loadBottom"
                        @bottom-status-change="handleBottomChange"
                        :bottom-all-loaded="allLoaded"
                        ref="loadmore"
                      >
                        <ul class="page-loadmore-list">
                          <li v-for="item in billlist" class="page-loadmore-listitem" @click="loadDetail(item)">{{ item.plate_num }}</li>
                        </ul>
                        <div slot="top" class="mint-loadmore-top">
                          <span
                            v-show="topStatus !== 'loading'"
                            :class="{ 'is-rotate': topStatus === 'drop' }"
                          >↓</span>
                          <span v-show="topStatus === 'loading'">
                            <mt-spinner type="snake"></mt-spinner>
                          </span>
                        </div>
                        <div slot="bottom" class="mint-loadmore-bottom">
                          <span
                            v-show="bottomStatus !== 'loading'"
                            :class="{ 'is-rotate': bottomStatus === 'drop' }"
                          >↑</span>
                          <span v-show="bottomStatus === 'loading'">
                            <mt-spinner type="snake"></mt-spinner>
                          </span>
                        </div>
                      </mt-loadmore>
                    </div>
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
            <div id="billlist" v-for="(item, i) in billlist" @click="loadDetail(item)">
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
  Spinner,
  Toast,
  Loadmore
} from "mint-ui";

export default {
  name: "mindex",
  components: {
    Loadmore
  },
  data() {
    return {
      waitTodo: "3month",

      selected: "offer",
      searchValue: "",
      billlist: [],

      list: [],
      allLoaded: false,
      bottomStatus: "",
      wrapperHeight: 0,
      topStatus: "",
      wrapperHeight: 0,
      translate: 0,
      moveTranslate: 0,
      deviceHieght:0
    };
  },
  created() {
    // for (let i = 1; i <= 1; i++) {
    //   this.list.push(i);
    // }
    this.getProjectInfo('loadMore')
  },
  mounted() {
//<<<<<<< HEAD
    this.getProjectInfo()
//======
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top;

    this.deviceHieght = document.documentElement.clientHeight
//>>>>>>> 559ca10d6b1d8011e06d4942c150475bb265248e
  },
  watch: {
    waitTodo: function(val, oldVal) {
      console.log(`val => ${val} oldVal => ${oldVal}`);
      this.busy = true;

      this.isMoreLoading = true;
      this.selectIndex = index;
      this.pageInfo.page = 1;

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
    loadDetail: function(item) {
      console.log(`loadDetail ---> ${JSON.stringify(item)}`)
      this.$router.push({ path: "/m_billdetail", query: { detail: item } });
    },

    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    loadBottom() {
      console.log("ssss");
      this.getProjectInfo('loadMore')
      // setTimeout(() => {
      //   let lastValue = this.list[this.list.length - 1];
      //   if (lastValue < 40) {
      //     for (let i = 1; i <= 10; i++) {
      //       this.list.push(lastValue + i);
      //     }
      //   } else {
      //     this.allLoaded = true;
      //   }
      //   this.$refs.loadmore.onBottomLoaded();
      // }, 1500);
    },
    handleTopChange(status) {
      this.moveTranslate = 1;
      this.topStatus = status;
    },
    translateChange(translate) {
      const translateNum = +translate;
      this.translate = translateNum.toFixed(2);
      this.moveTranslate = (1 + translateNum / 70).toFixed(2);
    },
    loadTop() {
      setTimeout(() => {
        let firstValue = this.list[0];
        for (let i = 1; i <= 10; i++) {
          this.list.unshift(firstValue - i);
        }
        this.$refs.loadmore.onTopLoaded();
      }, 1500);
    },
    getProjectInfo(type) {
      let _this = this;
      this.isLoading = true;

      console.log('getprojectinfo   .....')

      let identity = localStorage.getItem("identity");
      this.busy = true;
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

      this.$axios.post(`api/vehicles/getVehicles`, options)
      // this.$$axios
      //   .get("/api/steward/projects", {
      //     params: {
      //       status: _this.selectIndex,
      //       current_page: _this.pageInfo.page,
      //       per_page: _this.pageInfo.page_size
      //     }
      //   })
        .then(res => {
          console.log(`名下车辆 - ${JSON.stringify(res.data)}`);
          this.$refs.loadmore.onBottomLoaded();
          let datas = res.data;
          if (datas.code === 0) {
            if (type === "loadMore") {
              this.billlist = this.billlist.concat(datas.data.list);
            } else {
              this.billlist = datas.data.list;
            }
            this.pageInfo.total = 100;
            datas.data.list.length;
            console.log(`total = ${datas.data.list.length}`);
            this.pageInfo.totalPage = Math.ceil(
              this.pageInfo.total / this.pageInfo.page_size
            );
            console.log(
              "总页数",
              Math.ceil(this.pageInfo.total / this.pageInfo.page_size)
            );
            console.log(`res >>>>> ${JSON.stringify(this.billlist)}`);
          } else {
            Toast({
              message: datas.msg,
              duration: 2000
            });
          }
          this.isLoading = false;
          this.isMoreLoading = false;
        });
    }
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
.loading-background,
.mint-loadmore-top span {
  -webkit-transition: 0.2s linear;
  transition: 0.2s linear;
}
.mint-loadmore-top span {
  display: inline-block;
  vertical-align: middle;
}
.mint-loadmore-top span.is-rotate {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}
.page-loadmore .mint-spinner {
  display: inline-block;
  vertical-align: middle;
}
.page-loadmore-desc {
  text-align: center;
  color: #666;
  padding-bottom: 5px;
}
.page-loadmore-desc:last-of-type,
.page-loadmore-listitem {
  border-bottom: 1px solid #eee;
}
.page-loadmore-listitem {
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.page-loadmore-listitem:first-child {
  border-top: 1px solid #eee;
}
.page-loadmore-wrapper {
  overflow: scroll;
}
.mint-loadmore-bottom span {
  display: inline-block;
  -webkit-transition: 0.2s linear;
  transition: 0.2s linear;
  vertical-align: middle;
}
.mint-loadmore-bottom span.is-rotate {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}
</style>