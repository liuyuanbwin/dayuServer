<template>
  <div class="staff">
    <div class="staff-top">
        <el-form :inline="true">
            <el-form-item class="btnRight">
                <el-button type="primary" size ="small" icon="el-icon-edit-outline" @click='addUser()'>添加</el-button>
            </el-form-item>
        </el-form>
    </div>
      <div class="tables">
           <el-table
            :data="userData"
            border
            style="width: 100%">
            <el-table-column
					type="index"
					label="序号"
					align='center'
					sortable
					width="70">
				</el-table-column>
            <el-table-column
                label="客户姓名"
                align="center"
                width="120">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="联系电话"
                align="center"
                width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.tel }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="客户身份"
                align="center"
                width="120">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ roleStr(scope.row.role) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="性别"
                align="center"
                width="80">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.sex }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="联系地址"
                align="center"
                width="320">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.address }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
      </div>
      <UserDialong :dialong="dialong" :form="form" @UserData="userInfo"></UserDialong>
  </div>
</template>

<script>
// @ is an alias to /src
import UserDialong from "./components/UserInfoDialog";
export default {
  name: "Staff",
  data() {
    return {
      userData: [], //数据存储
      dialong: {
        //弹出框
        show: false,
        title: "",
        option: "edit"
      },
      form: {   //添加和删除需要传递的字段名
        name: "",
        sex: "",
        tel: "",
        address: "",
        role:0
      }
    };
  },
  methods: {
    roleStr(role){
      let roleStrs = [
          {title:"一般客户",role:0},
          {title:"投保人", role:1},
          {title:"被保险人", role:2},
          {title:"联系人", role:3}
      ]
      return roleStrs[parseInt(role)].title;
    },
    userInfo() {
      console.log('获取用户列表')
      this.$axios
        .get("/api/users").then(res => {
					 console.log(res)
          this.userData = res.data.results;
        }).catch(err => {
          console.log(err)
          });
    },
    handleEdit(index, row) {
			console.log(row)
      //编辑
      this.dialong = {
        title: "编辑信息",
        show: true,
        option:"edit"
      }
      this.form = {
          name: row.name,
          sex: row.sex,
          state: row.tel,
          address: row.address,
          id:row._id,
          role:row.role
      }
    },
    handleDelete(index, row) {
      //删除数据
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.delete(`/api/users/delete/${row._id}`).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
          this.userInfo();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addUser() {
      //添加内容
      this.dialong = {
        title: "添加信息",
        show: true,
        option:"add"
      }
      this.form = {
        name: "",
        sex: "",
        birthday: "",
        address: "",
        role:0,
        tel:""
      }
    }
  },
  created() {
    this.userInfo();
  },
  components: {
    UserDialong
  }
};
</script>
<style scoped>
.staff {
  margin: 10px;
}
.btnRight {
  float: right;
}
</style>
