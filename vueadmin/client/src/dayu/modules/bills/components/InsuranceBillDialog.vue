<template>
  <div class="nofind">
    <el-dialog :title="保单列表" type="primary" size="small" :close-on-press-escape="false" :modal-append-to-body="false"
      :close-on-click-modal="false" :visible.sync="dialong.show">
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
          <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          <el-button type="primary" @click="onSubmit(this)">关闭提醒</el-button>
          <el-form-item label="创建时间" prop="create_date">
            <el-col :span="11">
              <el-date-picker v-model="form.create_date" align="right" type="date" placeholder="选择日期"
                :picker-options="pickerOptions"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="保单内容" prop="content">
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
  const moment = require('moment')
  export default {
    name: "InsuranceBillDialog",
    data() {
      return {
        insuranceBills: [],
        form: {
          id: '',
          create_date
        }
      }
    }
  }
</script>

<style></style>