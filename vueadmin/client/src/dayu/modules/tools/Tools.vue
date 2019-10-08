<template>
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="交强">
    <el-input v-model="form.orignPrice"></el-input>
  </el-form-item>
  
  <el-form-item label="点位">
    <el-input v-model="form.offerPoint"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">计算</el-button>
    <el-button>取消</el-button>
  </el-form-item>

  <el-dialog
      title="计算结果"
      :visible.sync="resultDisplay"
      width="30%"
      @close="handleClose">
      <span>{{`交强净费 ${form.offerPrice}`}}</span>
      <span slot="footer">
          <el-button @click="resultDisplay = false">取 消</el-button>
          <el-button type="primary" @click="resultDisplay = false">确 定</el-button>
      </span>
  </el-dialog>
  
</el-form>
</template>

<script>
export default {
    name:'tools',
    data(){
        return {
            resultDisplay:false,
            form:{
                orignPrice:0,
                offerPoint:0,
                offerPrice:0
            }
        }
    },
    methods:{
        onSubmit(){
            this.resultDisplay = true
            this.form.offerPrice = (this.form.orignPrice - (this.form.orignPrice / 1.06 * this.form.offerPoint /100)).toFixed(2)
        },
        handleClose(){

        }
    }
}
</script>

<style scoped="scoped">

</style>