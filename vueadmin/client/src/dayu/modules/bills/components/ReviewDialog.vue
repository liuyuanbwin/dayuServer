<template>
    <div class="nofind">
        <el-dialog
            :title="dialong.title"
            type="primary"
            size="small"
            :close-on-press-escape="false"
            :modal-append-to-body="false"
            :close-on-click-modal="false"
            :visible.sync="dialong.show">
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialong.show = false">取 消</el-button>
                <el-button type="primary" @click="addHandle('formdoalog')">确 定</el-button>
            </div>
            <el-collapse v-if="reviews !== undefined&&reviews.length > 0" v-for="(review, index) in reviews">
                <el-collapse-item :title="timeRound(review.create_date)">
                    <div>{{review.content}}</div>
                </el-collapse-item>
            </el-collapse>

<el-card class="box-card" style="marginTop:10px;">
  <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-switch
  v-model="value"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>
                    <el-button type="primary" @click="onSubmit(this)">关闭提醒</el-button>
                <el-form-item label="回访时间" prop="create_date">
                    <el-col :span="11">
                        <el-date-picker
                            v-model="form.create_date"
                            align="right"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="回访内容" prop="content">
                    <el-input type="textarea" v-model="form.content"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit(this)">添加回访</el-button>

                </el-form-item>
            </el-form>
</el-card>
            
        </el-dialog>
    </div>
</template>

<script>
    // @ is an alias to /src
    const moment = require('moment')
    export default {
        name: "ReviewDialog",
        data() {
            return {
                reviews:[],
                form: {
                    id:'',
                    create_date:new Date(),
                    content: ''
                },
                rules: {
                    create_date: [
                        {
                            required: true,
                            message: '请选择回访日期',
                            trigger: 'blur'
                        }
                    ],
                    content: [
                        {
                            required: true,
                            message: '请填写回访内容',
                            trigger: 'blur'
                        }
                    ]
                },
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [
                        {
                            text: '今天',
                            onClick(picker) {
                                picker.$emit('pick', new Date());
                            }
                        }, {
                            text: '昨天',
                            onClick(picker) {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24);
                                picker.$emit('pick', date);
                            }
                        }, {
                            text: '一周前',
                            onClick(picker) {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit('pick', date);
                            }
                        }
                    ]
                }
            };
        },
        props: {
            dialong: Object,
            form: Object
        },
        watch:{
            'dialong.show':{
                handler(newName, oldName){
                    console.log('dialong change !!!' + newName)
                    if(newName == true){
                        this.getReviewList()
                    }
                }
            }
        },
        methods: {
            addHandle(formdoalog) {

                this
                    .$refs[formdoalog]
                    .validate(valid => {
                        if (valid) {
                            // console.log(this.form)
                            let url = this.dialong.option == "add"
                                ? "add"
                                : "update";
                            console.log(this.form)
                            this
                                .$axios
                                .post(`/api/vehicles/${url}`, this.form)
                                .then(res => {
                                    this.$message({type: "success", message: "数据添加成功"}),
                                    (this.dialong.show = false);
                                    //this.$emit("BillData"); 清空内容
                                    this.form = "";
                                });
                        } else {
                            console.log("error submit!!");
                            return false;
                        }
                    });
            },
            onSubmit(formdoalog) {
                this
                .$refs.form
                .validate(valid => {
                    if(valid){
                        //alert(`提交的是 ${JSON.stringify(this.form)}`)
                        this
                        .$axios
                        .post('/api/review/add', {
                    create_date:this.form.create_date,
                    content:this.form.content,
                    vehicleId:this.form.id
                })
                        .then(res => {
                            this.getReviewList()
                            this.form.create_date = ''
                            this.form.content = ''
                        })
                    }else{
                        alert(`请正确填写访问信息`)
                        return false
                    }
                })
            },
            timeRound(date) {
                return moment(date).format('YYYY-MM-DD')
            },
            getReviewList() {

                
                this
                .$axios
                .get(`/api/review?id=${this.form.id}`)                         
                .then(res => {
                    console.log(`Get ${JSON.stringify(res)}`)
                    this.reviews = res.data.results
                })
            },
            refresh(){
                
            }
        },
        mounted() {
            //this.getReviewList()
        }
        
    };
</script>
<style scoped="scoped"></style>