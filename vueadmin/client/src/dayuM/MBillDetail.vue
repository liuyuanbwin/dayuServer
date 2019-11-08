<template>
  <div>
    <mt-header title="保单详情">
      <router-link to slot="left">
        <mt-button icon="back" @click.native="$router.back(-1)">返回</mt-button>
      </router-link>

      <!-- <router-link to="/login" slot="right">
      <mt-button>登录</mt-button>
      </router-link>-->
    </mt-header>

    <div v-model="detail">
      <mt-cell title="车牌号" :value="detail.plate_num"></mt-cell>
      <mt-cell title="被保险人" :value="detail.insurant"></mt-cell>
      <mt-cell title="车辆类型" :value="detail.vehicle_type | formatModel"></mt-cell>
      <mt-cell title="注册日期" :value="detail.regist_date | formatDate"></mt-cell>
      <mt-cell title="所属部门" :value="detail.busi_depart"></mt-cell>
      <mt-cell title="投保的是" :value="detail.insured_is"></mt-cell>
      <mt-cell title="交强到期日期" :value="detail.cli_expire_date | formatDate"></mt-cell>
      <mt-cell title="商业到期日期" :value="detail.gap_expire_date | formatDate"></mt-cell>
      <mt-cell title="商业险内容" :value="detail.gap_content"></mt-cell>
      <mt-cell title="验车日期" :value="detail.checkcar_date | formatDate"></mt-cell>
      <mt-cell title="客服电话" :value="detail.customer_tel"></mt-cell>
      <mt-cell title="出险电话" :value="detail.report_tel"></mt-cell>
      <mt-cell title="备注" :value="detail.remark"></mt-cell>
    </div>
  </div>
</template>

<script>
import { Cell, Header } from "mint-ui";
export default {
  data() {
    return {
      detail: {}
    };
  },
  filters: {
    formatDate: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;

      if (y == 1970) {
        return "无";
      }
      return y + "-" + MM + "-" + d; //+ ' ' + h + ':' + m + ':' + s;
    },
    formatModel: function(value) {
      if (value == "under5") return "5人以下轿车";
      if (value == "beyond5") return "5人以上轿车";
      if (value == "trunk") return "货车";
      if (value == "other") return "其他";
    }
  },
  mounted() {
    console.log(`----- ${JSON.stringify(this.$route.query.detail)}`);
    this.detail = this.$route.query.detail;
  }
};
</script>

<style scoped="scoped">
</style>