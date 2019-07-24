<template>
    <div class="staff">
        <div class="staff-top">
            <el-form  :inline="true">
                <el-form-item class="btnRight">
                    <el-button type="primary" @click="addKeyword()" style="margin-right:10px">创建</el-button>
                </el-form-item>
            </el-form>
            
        </div>
       <div class="list">
           <el-table :data="keywords" stripe>
               <el-table-column
                   label="序号"
                   width="80">
               </el-table-column>
               <el-table-column
                   prop="keyword"
                   label="关键字"
                   >
               </el-table-column>
               <el-table-column
                   prop="reply"
                   label="回复"
                   >
               </el-table-column>
           </el-table>
       </div>
       <KeywordDialog :dialog="dialog" :form="form" @keywords = "getKeywordList"></KeywordDialog>  
    </div>
</template>

<script>
    import KeywordDialog from "./components/KeywordDialog"
export default {
    name:'list',
    data(){
        return {
            keywords:[],
            dialog:{
                show:false,
                title:"",
                option:"edit"
            },
            form:{}
        }
    },
    methods: {
        getKeywordList(){
            this
            .$axios
            .get('/api/keywordReply')
            .then(res => {

                console.log(' 关键字  ---->>>> ' + JSON.stringify(res))
                if(res.data.status === 1){
                    const data = res.data.results
                    this.keywords = data
                }
            })
        },
        addKeyword(){
        
            this.dialog = {
                title:"添加关键字自动回复",
                show:true,
                option: "add"   
            }
            this.form = {}
        }
    },
    created(){
        this.getKeywordList()
    },
    components:{
        KeywordDialog
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