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
                <mt-tab-item id="3month">option A</mt-tab-item>
                <mt-tab-item id="1month">option B</mt-tab-item>
                <mt-tab-item id="7day">option C</mt-tab-item>
              </mt-navbar>
              <mt-tab-container v-model="waitTodo">
                <mt-tab-container-item id="3month">
                  <!-- <div id="billscroll">
                    <ul
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="loading"
                    infinite-scroll-distance="10"
                  >
                    <li v-for="item in list">{{ item }}</li>
                  </ul>
                  </div> -->
                  <div id="billscroll" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <div v-for="item in data" :key="item.index">{{item.name}}</div>
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
              <mt-cell :title="item.plate_num" :label="item.remark" :value="item.insured_is">

              </mt-cell>
            </div>


          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="offer">

        待办事项
      </mt-tab-item>
      <mt-tab-item id="bill">

        订单
      </mt-tab-item>
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
  InfiniteScroll
} from "mint-ui";
//import infiniteScroll from 'vue-infinite-scroll'
export default {
  name: "mindex",
  data() {
    return {
      waitTodo: "3month",
      loading: false,
      selected: "offer",
      searchValue: "",
      billlist: [],
     count: 0,
      data: [],
      busy: false,
      page:1
    };
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
    loadMore: function() {

      let identity = localStorage.getItem('identity')
      var options = {id:localStorage.getItem('id'),
        page:this.page,identity:identity}
      if(identity == 'manager'){
        options['managerid'] = localStorage.getItem('id')
      }else{
        options['employeeid'] = localStorage.getItem('id')
      }

      this
      .$axios
      .post(`api/vehicles/getVehicles`,options)
      .then(res => {
        console.log(`名下车辆 - ${JSON.stringify(res.data)}`)
      })
    }
  }
};
</script>

<style scoped="scoped">
#billscroll{
  margin-top: 40px;
  height: 500px;
  overflow-y: auto;
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
</style>