<template>
  <div class="nofind">
    <el-dialog
      :title="dialong.title"
      type="primary"
      size="small"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :visible.sync="dialong.show"
    >
      <el-form :model="form" ref="formdoalog" :rules="formdialog" label-width="80px">
        <el-form-item label-width="160px" label="车牌号" prop="plate">
          <el-input v-model="form.plate"></el-input>
        </el-form-item>
        <el-form-item label-width="160px" label="汽车品牌" prop="brand">
          <el-input v-model="form.brand"></el-input>
        </el-form-item>
        <el-form-item label-width="160px" label="汽车型号" prop="model">
          <el-input v-model="form.model"></el-input>
        </el-form-item>
        <el-form-item label-width="160px" label="车主姓名" prop="owners">
          <el-input v-model="form.owners"></el-input>
        </el-form-item>
        <el-form-item label-width="160px" label="被保险人" prop="insurant">
          <el-input v-model="form.insurant"></el-input>
        </el-form-item>
        <el-form-item label-width="160px" label="联系人" prop="linkman">
          <el-input v-model="form.linkman"></el-input>
        </el-form-item>
        <el-form-item label-width="160px" label="联系人电话" prop="linkmanTel">
          <el-input v-model="form.linkmanTel"></el-input>
        </el-form-item>
        <el-form-item label-width="160px" label="首次登记日期" prop="registDate">
          <el-date-picker v-model="form.registDate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label-width="160px" label="车辆类型" prop="vehicleType">
          <el-input v-model="form.vehicleType"></el-input>
        </el-form-item>
        <el-form-item label-width="160px" label="出单单位" prop="agentUnit">
          <el-input v-model="form.agentUnit"></el-input>
        </el-form-item>
        <el-form-item label-width="160px" label="业务经理" prop="agent">
          <el-input v-model="form.agent"></el-input>
        </el-form-item>
        <el-form-item label-width="160px" label="最近一次投保公司" prop="latestUnit">
          <el-input v-model="form.latestUnit"></el-input>
        </el-form-item>
        <el-form-item label-width="160px" label="最近一次投保公司电话" prop="latestUnitTel">
          <el-input v-model="form.latestUnitTel"></el-input>
        </el-form-item>
        <el-form-item label-width="160px" label="今年投保公司" prop="toyearUnit">
          <el-input v-model="form.toyearUnit"></el-input>
        </el-form-item>
        <el-form-item label-width="160px" label="今年投保公司电话" prop="toyearUnitTel">
          <el-input v-model="form.toyearUnitTel"></el-input>
        </el-form-item>
        <el-form-item label-width="160px" label="交强险到期日期" prop="CLIExpireDate">
          <el-date-picker v-model="form.CLIExpireDate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label-width="160px" label="商业险到期日期" prop="GAPExpireDate">
          <el-date-picker v-model="form.GAPExpireDate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label-width="160px" label="商业险内容" prop="GAPContent">
          <el-input v-model="form.GAPContent"></el-input>
        </el-form-item>
        <el-form-item label-width="160px" label="咨询电话" prop="hotline">
          <el-input v-model="form.hotline"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialong.show = false">取 消</el-button>
        <el-button type="primary" @click="addHandle('formdoalog')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "BillInfoDialog",
  data() {
    return {
      formdialog: {
        plate: [{ required: true, message: "车牌号不能为空", trigger: "blur" }],
        registDate:[{ required: true, message: "请填写首次登记日期", trigger: "blur"}],
        linkmanTel: [{ required: true, message: "请填写联系电话", trigger: "blur"}]
      },
      roles:[
          {title:"一般客户",role:0},
          {title:"投保人", role:1},
          {title:"被保险人", role:2},
          {title:"联系人", role:3}
      ],
      role:"一般客户"
    };
  },
  props: {
    dialong: Object,
    form: Object
  },
  methods: {
    addHandle(formdoalog) {
      
      this.$refs[formdoalog].validate(valid => {
        if (valid) {
         // console.log(this.form)
          let url =
            this.dialong.option == "add" ? "add" : `/edit/${this.form.id}`;
          console.log(this.form)
          this.$axios.post(`/api/bills/${url}`, this.form).then(res => {
            this.$message({
              type: "success",
              message: "数据添加成功"
            }),
              (this.dialong.show = false);
            this.$emit("BillData");
            //清空内容
            this.form = "";
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
</style>
