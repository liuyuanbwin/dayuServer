<template>
    <div class="staff">
        <div class="staff-top">
            <el-form :inline="true">
                <!-- <el-input v-model="vehicleSearch" placeholder="请输入"/> -->
                <el-input v-model="vehicleSearch" placeholder="" style="width:240px" v-on:input="doFilter"></el-input>
                
                <el-form-item class="btnRight">
                    <el-button
                        type="primary"
                        size="small"
                        icon="el-icon-edit-outline"
                        @click='addBill()'>添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="list">
            <div class="tab">
                <el-table :data="tableData" border="border" style="width: 100%">
                    <el-table-column
                        type="index"
                        label="序号"
                        align='center'
                        sortable="sortable"
                        width="70"></el-table-column>
                    <el-table-column label="车牌号" align='center' width="120">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.plate_num }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="被保险人" align='center' width="80">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.insurant }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="商险到期日期" align='center' width="200">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ timeRound(scope.row.gap_expire_date) }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="交强险" align='center' width="200">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ timeRound(scope.row.cli_expire_date) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="客服电话" align='center' width="180">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.customer_tel }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="报险电话" align='center'>
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.report_tel }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" fixed="right">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="billEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="billDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="page">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="paginations.page_index"
                    :page-sizes="paginations.page_sizes"
                    :page-size="paginations.page_size"
                    :layout="paginations.layout"
                    :total="paginations.total"></el-pagination>
            </div>
        </div>
        <BillDialog :dialong="dialong" :form="form" @BillData="getInfoList"></BillDialog>
    </div>
</template>
<script>
    import BillDialog from "./components/BillInfoDialog"
    const moment = require('moment')
    export default {
        name: "list",
        data() {
            return {
                vehicleSearch: "", tableData: [], //数据
                paginations: {
                    page_index: 1, //当前页
                    total: 0, //总数
                    page_size: 5, //一页显示多少
                    page_sizes: [
                        5, 10, 15, 20
                    ], //每页显示多少条
                    layout: 'total, sizes, prev, pager, next, jumper'
                },
                allTableData: [],
                filteData:[],
                dialong: {
                    show: false,
                    title: "",
                    option: "edit"
                },
                form: {}
            }
        },
        methods: {
            doFilter() {
                // if (this.vehicleSearch == "") {
                //     this
                //         .$message
                //         .warning("查询条件不能为空！");
                //     return;
                // }
                const vehicleSearch = this.vehicleSearch
                if (vehicleSearch) {
                    this.filteData = this
                        .allTableData
                        .filter(data => {
                            return Object
                                .keys(data)
                                .some(key => {
                                    return String(data[key])
                                        .toLowerCase()
                                        .indexOf(vehicleSearch) > -1
        
                                })
                        })
                    console.log(this.filteData.length + ' --- ' + this.allTableData.length)
                    this.setPaginations()
                }else{
                    console.log('+++++  ' + this.filteData.length + ' --- ' + this.allTableData.length)
                this.filteData= this.allTableData
                this.setPaginations()
                }
            },
            timeRound(date) {
                return moment(date).format('YYYY-MM-DD')
            },
            getInfoList() {
                this
                    .$axios
                    .get('/api/vehicles')
                    .then(res => {
                        if (res.data.status === 1) {
                            const data = res.data.results;
                            this.allTableData = data;
                            this.filteData = data
                            this.setPaginations()
                        }
                    })
            },
            setPaginations() {
                this.paginations.total = this.filteData.length; //数据的数量
                this.paginations.page_index = 1; //默认显示第一页
                this.paginations.page_size = 10; //每页显示多少数据

                //显示数据
                this.tableData = this
                    .filteData
                    .filter((item, index) => {
                        return index < this.paginations.page_size;
                    })
            },
            handleSizeChange(page_size) {
                this.paginations.page_index = 1; //第一页
                this.paginations.page_size = page_size; //每页先显示多少数据
                this.tableData = this
                    .filteData
                    .filter((item, index) => {
                        return index < page_size
                    })
            },
            handleCurrentChange(page) {
                // 跳转页数 获取当前页
                let index = this.paginations.page_size * (page - 1);
                //获取总数
                let allData = this.paginations.page_size * page;

                let tablist = [];
                for (let i = index; i < allData; i++) {
                    if (this.filteData[i]) {
                        tablist.push(this.filteData[i])
                    }
                    this.tableData = tablist
                }
            },
            addBill() {
                //添加内容
                this.dialong = {
                    title: "录入保单",
                    show: true,
                    option: "add"
                }
                this.form = {}
            },
            billEdit(index, row) {
                this.dialong = {
                    title: "编辑保单",
                    show: true,
                    option: "edit"
                }
                this.form = {
                    plate_num: row.plate_num,
                    insurant: row.insurant,
                    vehicle_type: row.vehicle_type,
                    regist_date: row.regist_date,
                    busi_depart: row.busi_depart,
                    vin_no: row.vin_no,
                    engine_sn: row.engine_sn,
                    insured_is: row.insured_is,
                    cli_expire_date: row.cli_expire_date,
                    gap_expire_date: row.gap_expire_date,
                    gap_content: row.gap_content,
                    checkcar_date: row.checkcar_date,
                    customer_tel: row.customer_tel,
                    report_tel: row.report_tel,
                    lastyear_info: row.lastyear_info
                }
            },
            billDelete(index, row) {
                //删除数据
                this
                    .$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    })
                    .then(() => {
                        this
                            .$axios
                            .delete(`/api/bills/delete/${row._id}`)
                            .then(res => {
                                this.$message({type: "success", message: "删除成功!"});
                            });
                        this.getInfoList();
                    })
                    .catch(() => {
                        this.$message({type: "info", message: "已取消删除"});
                    });
            }
        },
        created() {
            this.getInfoList();
        },
        components: {
            BillDialog
        }
    }
</script>

<style scoped="scoped">
    .staff {
        margin: 10px;
    }
    .btnRight {
        float: right;
    }
    .list {
        margin: 20px;
    }
    .page {
        float: right;
        margin-top: 20px;
        margin-bottom: 80px;
    }
</style>