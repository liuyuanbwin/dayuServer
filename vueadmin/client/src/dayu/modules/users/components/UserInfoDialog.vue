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
        <el-form-item label="客户姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input v-model="form.tel"></el-input>
        </el-form-item>
        <el-form-item label="用户身份" prop="role">
            <el-select v-model="role" placeholder='请选择考试'>
              <el-option v-for='(item,index) in roles' :key='index' :label='item.title'
                :value='item.role'
              ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="form.sex"></el-input>
        </el-form-item>
        <el-form-item label="联系地址" prop="address">
          <el-input v-model="form.address"></el-input>
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
  name: "UserInfoDialog",
  data() {
    return {
      formdialog: {
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        tel:[{required:true, message:"请填写用户电话号码",trigger:"blur"}]
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
      if(this.role === "一般客户"){
          this.role = 0
      }
      this.form.role = this.role
      this.$refs[formdoalog].validate(valid => {
        if (valid) {
          // console.log(this.form)
          let url =
            this.dialong.option == "add" ? "add" : `/edit/${this.form.id}`;

          this.$axios.post(`http://localhost:3000/api/users/${url}`, this.form).then(res => {
            this.$message({
              type: "success",
              message: "数据添加成功"
            }),
              (this.dialong.show = false);
            this.$emit("UserData");
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
