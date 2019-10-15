<template>
  <mt-tabbar v-model="selected">
  <mt-tab-item id="offer">
    <img slot="icon" src="../assets/100x100.png">
    报价
  </mt-tab-item>
  <mt-tab-item id="订单">
    <img slot="icon" src="../assets/100x100.png">
    
  </mt-tab-item>
</mt-tabbar>
</template>

<script>
import { Tabbar, TabItem } from 'mint-ui'

export default {

}
</script>

<style>

</style>