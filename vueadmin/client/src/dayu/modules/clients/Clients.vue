<template>
    <div class="staff">
       <div class="list">
           <el-table :data="clients" stripe>
               <el-table-column label="操作">
      <template slot-scope="scope">
        <!-- <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          <label >{{scope.row.nickname}}</label>
          <img :src="scope.row.headimgurl" alt="" style="width:30px;height:30px;">
      </template>
    </el-table-column>
               <!-- <el-table-column
                   label="用户">
                   <template slot-scope="scope">
                       <label for="{{scope.row.nickname}}"></label>
                       <img src="{{scope.row.headimgurl}}" alt="">
                       
                   </template>
               </el-table-column> -->
               <el-table-column
                   prop="nickname"
                   label="昵称"
                   >
                   <img src="" alt="">
               </el-table-column>
               <el-table-column
                   prop="sex"
                   label="性别"
                   :formatter="formatterSex"
                   >
               </el-table-column>
               <el-table-column
                   prop="city"
                   label="城市"
                   >
               </el-table-column>
             <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
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
            clients:[]
        }
    },
    methods: {
        getClients(){
            this
            .$axios
            .get('api/clients')
            .then(res => {
                console.log('sksh   ' + JSON.stringify(res))
                if(res.data.status === 1){
                    const data = res.data.results
                    this.clients = data
                }
            })
        },
        formatterSex:function(row, column){
            return row.sex === 1 ? '男' : row.sex === 2 ? '女' : '未知'
        }
    },
    created(){
        this.getClients()
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