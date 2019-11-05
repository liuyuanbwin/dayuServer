<template>
  <div>
    <div>
      <div class="page-tab-container">
        <mt-tab-container class="page-tabbar-tab-container" v-model="selected" swipeable>
          <mt-tab-container-item id="offer">
            <!-- 报价 -->
            <mt-header fixed title="报价"></mt-header>
            <mt-cell v-for="n in 10" title="报价"></mt-cell>
          </mt-tab-container-item>

          <!-- --------------------------------------------------------- -->

          <mt-tab-container-item id="bill">
            <!-- 订单 -->
            <mt-header fixed title="订单"></mt-header>
            <div id="searchdiv">
              <i id="searchIcon" class="mint-toast-icon mintui mintui-search" ></i>
              <mt-field v-model="searchValue" id="searchbar" label="" placeholder="输入车牌号/姓名/手机号码查询投保信息" ></mt-field>
              <mt-button type="primary" id="searchButton" v-on:click="searchbill()">搜索</mt-button>
            </div>

            <!-- <mt-cell v-for="n in 5" title="订单"></mt-cell> -->
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="offer">
        <!-- <img slot="icon" src="../assets/100x100.png"> -->
        报价
      </mt-tab-item>
      <mt-tab-item id="bill">
        <!-- <img slot="icon" src="../assets/100x100.png"> -->
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
  Button
} from "mint-ui";

export default {
  name: "mindex",
  data() {
    return {
      selected: "offer",
      searchValue: ""
    };
  },
  methods: {
     searchbill: function() {
    console.log("search ~~~" + this.searchValue);
    this
    .$axios
    .get(`/api/vehicles?plate_num=${this.searchValue}`)
    .then(res => {
      console.log(`${JSON.stringify(res)}`)
    })
  }
  },

 
};
</script>

<style scoped="scoped">
#searchdiv{
  margin-top: 40px;
}
#searchbar{
  display:inline;
  float:left;
  border: 1px solid red;
  width: 75%;
  margin: 10px;
  height: 10px;
  min-height:35px;
}
#searchIcon{
  display:inline;
  float:left;
  padding-left:10px;
  padding-top: 20px;
}
#searchButton{
  display:inline;
  float:left;
  margin-top: 10px;
  padding-top:0px;
 padding-right: 0px;
 padding-left: 0px;
 height: 35px;
}
</style>