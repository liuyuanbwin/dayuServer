<template>
    <div class="nofind">
        <el-dialog
  :title="dialog.title"
  :visible.sync="dialog.show"
  width="30%"
>
<el-form :model="currentForm" ref="keywordform" label-width="80px">
    <el-form-item label="关键字">
        <el-input v-model="currentForm.keyword"></el-input>
    </el-form-item>
     <el-form-item label="回复">
        <el-input v-model="currentForm.reply"></el-input>
    </el-form-item>
</el-form>

  <span slot="footer" class="dialog-footer">
    <el-button >取 消</el-button>
    <el-button type="primary" @click="addKeyword('keywordform')">确 定</el-button>
  </span>
</el-dialog>
        
    </div>
</template>

<script>
export default {
    name:"KeywordDialog",
    data(){
        return {
            currentForm:this.form
        }
    },
    props: {
        dialog: Object,
        form: Object
    },
    methods:{
        addKeyword(keywordform){
            this
                .$refs[keywordform]
                .validate(valid => {
                    if(valid){
                        let url = this.dialog.option == "add" ? "add" : "update"
                        this
                            .$axios
                            .post(`/api/keywordReply/${url}`,this.currentForm)
                            .then(res => {
                                console.log(' ---> ' + JSON.stringify(res))
                                this.$message({type:"success",message:"关键字添加成功"}),(this.dialog.show = false)
                                this.currentForm = {}
                                this.$emit("keywords")
                            })
                    }else{
                        console.log('error submit')
                        return false
                    }
                })
        }
    }
}
</script>

<style>

</style>
