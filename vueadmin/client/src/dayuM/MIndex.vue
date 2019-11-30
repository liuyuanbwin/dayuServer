<template>
    <div :style="{height: deviceHieght - 26 + 'px'}">
        <div :style="{height: deviceHieght - 26 + 'px'}">
            <div class="page-tab-container">
                <mt-tab-container
                    class="page-tabbar-tab-container"
                    v-model="selected"
                    swipeable="swipeable"
                    :style="{height: deviceHieght - 26 + 'px'}">
                    <mt-tab-container-item id="offer">
                        <mt-header fixed="fixed" title="待办事项"></mt-header>
                        <div id="waittodo" :style="{height: wrapperHeight + 'px',background:'gray'}">
                            <!-- <mt-button type="primary" @click="loadMore">加载</mt-button> -->
                            <mt-navbar v-model="waitTodo">
                                <mt-tab-item id="cli">交强险</mt-tab-item>
                                <mt-tab-item id="gap">商业险</mt-tab-item>
                                <mt-tab-item id="checkcar">验车</mt-tab-item>
                            </mt-navbar>
                            <!-- <mt-radio
                            title="到期类型"
                            v-model="expiretype"
                            :options="['交强险','商业险','验车']"
                            ></mt-radio> -->
                            <div
                                class="page-loadmore"
                                :style="{height: deviceHieght + 'px',background:'lightgray'}">
                                <div
                                    class="page-loadmore-wrapper"
                                    ref="wrapper"
                                    :style="{ height: wrapperHeight + 'px' }">
                                    <mt-loadmore
                                        :top-method="loadTop"
                                        @translate-change="translateChange"
                                        @top-status-change="handleTopChange"
                                        :bottom-method="loadBottom"
                                        @bottom-status-change="handleBottomChange"
                                        :bottom-all-loaded="allLoaded"
                                        ref="loadmore">
                                        <ul class="page-loadmore-list">
                                          <div class="billcell" v-for="item in billlist" @click="loadDetail(item)">
                                              <div class="billplate">
                                                  {{item.plate_num}}
                                              </div>
                                              <div class="billinsurant">{{item.insurant}}</div>
                                              <div class="billremark">{{item.customer_tel}}</div>
                                              <div class="billremark">{{item.remark}}</div>
                                          </div>
                                        </ul>
                                        <div slot="top" class="mint-loadmore-top">
                                            <span
                                                v-show="topStatus !== 'loading'"
                                                :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
                                            <span v-show="topStatus === 'loading'">
                                                <mt-spinner type="snake"></mt-spinner>
                                            </span>
                                        </div>
                                        <div slot="bottom" class="mint-loadmore-bottom">
                                            <span
                                                v-show="bottomStatus !== 'loading'"
                                                :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
                                            <span v-show="bottomStatus === 'loading'">
                                                <mt-spinner type="snake"></mt-spinner>
                                            </span>
                                        </div>
                                    </mt-loadmore>
                                </div>
                            </div>
                        </div>
                    </mt-tab-container-item>

                    <mt-tab-container-item id="bill">
                        <mt-header fixed="fixed" title="订单"></mt-header>
                        <div id="searchdiv">
                            <i id="searchIcon" class="mint-toast-icon mintui mintui-search"></i>
                            <mt-field
                                v-model="searchValue"
                                id="searchbar"
                                label="label"
                                placeholder="输入车牌号/姓名/手机号码查询投保信息"></mt-field>
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
        Loadmore,
        Radio
    } from "mint-ui";

    export default {
        name: "mindex",
        components: {
            Loadmore
        },
        data() {
            return {
                waitTodo: "cli",
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
                deviceHieght: 0,
                pageInfo: {
                    page:1,
                    total:0,
                    size:15
                }
            };
        },
        created() {
           // this.getProjectInfo('newLoad','created')
        },
        mounted() {
            //this.getProjectInfo()
            this.wrapperHeight = document.documentElement.clientHeight - this
                .$refs
                .wrapper
                .getBoundingClientRect()
                .top;
            this.deviceHieght = document.documentElement.clientHeight
        },
        watch: {
            waitTodo: function (val, oldVal) {
                console.log(`val => ${val} oldVal => ${oldVal}`);
                this.busy = true;
                this.isMoreLoading = true;
                this.pageInfo.page = 1;
                this.pageInfo.totalPage = 1;
                this.list = [];
                this.noMore = false;
                this.getProjectInfo('newLoad','watch');
            },
            selected:function (val, oldVal){
                console.log(`当前页面 -> ${val} 上个页面是 ->${oldVal}}`)
            }
        },
        methods: {
            searchbill: function () {
                console.log("search ~~~" + this.searchValue);
                this
                    .$axios
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
            loadDetail: function (item) {
                console.log(`loadDetail ---> ${JSON.stringify(item)}`)
                this
                    .$router
                    .push({
                        path: "/m_billdetail",
                        query: {
                            detail: item
                        }
                    });
            },

            handleBottomChange(status) {
                this.bottomStatus = status;
            },
            loadBottom() {
                console.log("ssss");
                this.getProjectInfo('loadMore','loadBottom')
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
                this.pageInfo.page = 1
                this.getProjectInfo('newLoad','loadTop')
            },
            getProjectInfo(type, path) {
                
                let _this = this;
                this.isLoading = true;
                let identity = localStorage.getItem("identity");
                this.busy = true;
                var options = {
                    querytype: this.waitTodo,
                    days: 5,
                    id: localStorage.getItem("id"),
                    page: this.pageInfo.page,
                    identity: identity,
                };

                console.log(`path ${path} options ${JSON.stringify(options)}`)

                if (identity == "manager") {
                    options["managerid"] = localStorage.getItem("id");
                } else {
                    options["employeeid"] = localStorage.getItem("id");
                }
                this
                    .$axios
                    .post(`api/vehicles/getVehicles`, options)
                    .then(res => {
                        this
                            .$refs
                            .loadmore
                            .onBottomLoaded();
                        let datas = res.data;
                        if (datas.code === 0) {
                            this.pageInfo.page = this.pageInfo.page + 1
                            if (type === "loadMore") {
                                this.billlist = this
                                    .billlist
                                    .concat(datas.data.list);
                            } else {
                                this.billlist = datas.data.list;
                            }
                            this.pageInfo.total = datas.data.pagination.total;
                            this.pageInfo.totalPage = Math.ceil(
                                this.pageInfo.total / this.pageInfo.page_size
                            );
                            console.log(`billist.length ${this.billlist.length} <----> total ${this.pageInfo.total}`)
                            if (this.billlist.length == this.pageInfo.total) {
                                
                                this.allLoaded = true
                            }else{
                                this.allLoaded = false
                            }
                            console.log("总页数", Math.ceil(this.pageInfo.total / this.pageInfo.page_size));
                            //console.log(`res >>>>> ${JSON.stringify(this.billlist)}`);
                        } else {
                            Toast(`出错了 --->>> ${res.error}}`)
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
        padding-top: 0;
        padding-right: 0;
        padding-left: 0;
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
        height: 150px;
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