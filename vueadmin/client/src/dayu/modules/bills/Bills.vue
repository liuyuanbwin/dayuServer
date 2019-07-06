<template>
    <div class="staff">
        <div class="staff-top">
            <el-form :inline="true">
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
                            <span style="margin-left: 10px">{{ scope.row.plate }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="车主" align='center' width="80">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.owners }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="汽车型号" align='center' width="80">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.brand }}
                                -
                                {{ scope.row.model }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="被保险人" align='center' width="200">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.insurant }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="联系人" align='center' width="180">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.linkman }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="联系人电话" align='center'>
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.linkmanTel }}</span>
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
    export default {
        name: "list",
        data() {
            return {
                tableData: [], //数据
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
                dialong: {
                    show: false,
                    title: "",
                    option: "edit"
                },
                form: {}
            }
        },
        methods: {
            getInfoList() {
                this
                    .$axios
                    .get('/api/bills')
                    .then(res => {
                        if (res.data.status === 1) {
                            const data = res.data.results;
                            // this.tableData = data;
                            this.allTableData = data;
                            // console.log(this.tableData)
                            this.setPaginations()
                        }
                    })
            },
            setPaginations() {
                this.paginations.total = this.allTableData.length; //数据的数量
                this.paginations.page_index = 1; //默认显示第一页
                this.paginations.page_size = 5; //每页显示多少数据

                //显示数据
                this.tableData = this
                    .allTableData
                    .filter((item, index) => {
                        return index < this.paginations.page_size;
                    })
            },
            handleSizeChange(page_size) {
                this.paginations.page_index = 1; //第一页
                this.paginations.page_size = page_size; //每页先显示多少数据
                this.tableData = this
                    .allTableData
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
                    if (this.allTableData[i]) {
                        tablist.push(this.allTableData[i])
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
                    plate: row.plate,
                    brand: row.brand,
                    model: row.model,
                    owners: row.owners,
                    insurant: row.insurant,
                    linkman: row.linkman,
                    linkmanTel: row.linkmanTel,
                    registDate: row.registDate,
                    vehicleType: row.vehicleType,
                    agentUnit: row.agentUnit,
                    agent: row.agent,
                    latestUnit: row.latestUnit,
                    latestUnitTel: row.latestUnitTel,
                    toyearUnit: row.toyearUnit,
                    toyearUnitTel: row.toyearUnitTel,
                    CLIExpireDate: row.CLIExpireDate,
                    GAPExpireDate: row.GAPExpireDate,
                    GAPContent: row.GAPContent,
                    hotline: row.hotline
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
            this.getInfoList()
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
    }
</style>