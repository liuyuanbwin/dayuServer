<template>
    <div class="staff">
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
    </div>
</template>

<script>
export default {
    name:'list',
    data(){
        return {
            keywords:[{
                keyword:'平安保险',
                reply:'4001008888'
            },
            {
                keyword:'平安保险',
                reply:'4001008888'
            },
            {
                keyword:'平安保险',
                reply:'4001008888'
            },
            {
                keyword:'平安保险',
                reply:'4001008888'
            }]
        }
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