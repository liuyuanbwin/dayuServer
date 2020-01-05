<template>
  <div class="nofind">
    <el-dialog :title="dialong.title" type="primary" size="small" :close-on-press-escape="false"
      :modal-append-to-body="false" :close-on-click-modal="false" :visible.sync="dialong.show">
      <el-form :model="form" ref="formdoalog" label-width="80px">
        <el-form-item label-width="160px" label="车牌号" prop="plate_num">
          <el-input v-model="form.plate_num"></el-input>
        </el-form-item>
        <el-form-item label-width="160px" label="被保险人" prop="insurant">
          <el-input v-model="form.insurant"></el-input>
        </el-form-item>
        <!-- <el-form-item label-width="160px" label="汽车型号" prop="vehicle_type">
                <el-input v-model="form.vehicle_type"></el-input> </el-form-item> -->
        <el-form-item label-width="160px" label="汽车类型" prop="vehicle_type">
          <el-select v-model="form.vehicle_type" placeholder="请选择汽车类型">
            <el-option value="under5" label="5人以下轿车"></el-option>
            <el-option value="beyond5" label="5人以上轿车"></el-option>
            <el-option value="trunk" label="货车"></el-option>
            <el-option value="other" label="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="160px" label="初次登记日期" prop="regist_date">
          <el-date-picker v-model="form.regist_date" type="date" :editable="true" value-format="yyyy-MM-dd"
            placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label-width="160px" label="投保公司" prop="insure_is">
          <el-input v-model="form.insured_is"></el-input>
        </el-form-item>
        <el-form-item label-width="160px" label="交强险到期日期" prop="cli_expire_date">
          <el-date-picker v-model="form.cli_expire_date" type="date" :editable="true" value-format="yyyy-MM-dd"
            placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label-width="160px" label="商业险到期日期" prop="gap_expire_date">
          <el-date-picker v-model="form.gap_expire_date" type="date" :editable="true" value-format="yyyy-MM-dd"
            placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label-width="160px" label="商业险内容" prop="gap_content">
          <el-input v-model="form.gap_content"></el-input>
        </el-form-item>
        <el-form-item label-width="160px" label="出险电话" prop="report_tel">
          <el-input v-model="form.report_tel"></el-input>
        </el-form-item>
        <el-form-item label-width="160px" label="验车日期" prop="checkcar_date">
          <el-date-picker v-model="form.checkcar_date" type="date" :editable="true" value-format="yyyy-MM-dd"
            placeholder="选择日期"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialong.show = false">取 消</el-button>
        <el-button type="primary" @click="addHandle('formdoalog')">确 定</el-button>
      </div>
      <el-collapse accordion="accordion">
        <el-collapse-item>
          <template slot="title">
            <i class="header-icon el-icon-document"></i>其他信息
          </template>
          <el-form :model="form" ref="formdoalog" label-width="80px">

            <el-form-item label-width="160px" label="车主" prop="owner">
              <el-input v-model="form.owner"></el-input>
            </el-form-item>

            <el-form-item label-width="160px" label="联系人" prop="linkman">
              <el-input v-model="form.linkman"></el-input>
            </el-form-item>

            <el-form-item label-width="160px" label="联系人电话1" prop="linkman_tel1">
              <el-input v-model="form.linkman_tel1"></el-input>
            </el-form-item>

            <el-form-item label-width="160px" label="联系人电话2" prop="linkman_tel2">
              <el-input v-model="form.linkman_tel2"></el-input>
            </el-form-item>

            <el-form-item label-width="160px" label="总部" prop="headquarter">
              <el-input v-model="form.headquarter"></el-input>
            </el-form-item>

            <el-form-item label-width="160px" label="业务部门" prop="busi_depart">
              <el-input v-model="form.busi_depart"></el-input>
            </el-form-item>

            <el-form-item label-width="160px" label="业务员" prop="busi_man">
              <el-input v-model="form.busi_man"></el-input>
            </el-form-item>

            <el-form-item label-width="160px" label="车辆型号" prop="car_model">
              <el-input v-model="form.car_model"></el-input>
            </el-form-item>

            <el-form-item label-width="160px" label="车架号" prop="vin_no">
              <el-input v-model="form.vin_no"></el-input>
            </el-form-item>
            <el-form-item label-width="160px" label="发动机号" prop="engine_sn">
              <el-input v-model="form.engine_sn"></el-input>
            </el-form-item>

            <el-form-item label-width="160px" label="客服电话" prop="customer_tel">
              <el-input v-model="form.customer_tel"></el-input>
            </el-form-item>

            <el-form-item label-width="160px" label="备注" prop="remark">
              <el-input v-model="form.remark"></el-input>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "RenewDialog",
    data() {
      return {

      }
    },
    props: {
      dialong: Object,
      form: Object
    },
    methods: {

    }
  }
</script>

<style>

</style>