<template>
    <div>
        <el-button type="primary" @click="queryMenu()">查询菜单</el-button>
  <el-button type="success">成功按钮</el-button>
  <el-button type="info">信息按钮</el-button>
    </div>
</template>

<script>
    export default{
        name:'menu',
        data(){
            return {
                menu:{}
            }
        },
        methods:{
            queryMenu(){
                this
                .$axios
                .get('/api/menu')
                .then(res => {
                    console.log('菜单' + JSON.stringify(res))
                })
            }
        }
    }
</script>

<style scoped="scoped">

</style>