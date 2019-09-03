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
            <el-collapse>
                <el-collapse-item title="访谈记录">
                    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                </el-collapse-item>
                <el-collapse-item title="访谈记录">
                    <div>简化流程：设计简洁直观的操作流程；</div>
                    <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                    <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                </el-collapse-item>
                <el-collapse-item title="访谈记录">
                    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                </el-collapse-item>
            </el-collapse>
            <el-form ref="form" :rules="rules" :model="form" label-width="80px">
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
                    <el-button type="primary" @click="onSubmit(this)">立即创建</el-button>
                    <el-button>取消</el-button>
                    <el-button @click="refresh()">刷新</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    // @ is an alias to /src
    export default {
        name: "ReviewDialog",
        data() {
            return {
                form: {
                    id:'',
                    create_date:'',
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
                            alert(`添加访问返回 ${JSON.stringify(res)}`)
                        })
                    }else{
                        alert(`请正确填写访问信息`)
                        return false
                    }
                })
            },
            getReviewList() {

                alert(`form ${JSON.stringify(this.form)} + ${this.form.id}`)
                this
                .$axios
                .get(`/api/review?id=${this.form.id}`)                         
                .then(res => {
                    console.log(`Get ${JSON.stringify(res)}`)
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