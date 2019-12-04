<template>
    <div id="toolView">
        <mt-header fixed="fixed" title="车险计算器">
            <mt-button icon="back" slot="left" @click="back"></mt-button>
            <mt-button slot="right" @click="clearContent">清空</mt-button>
        </mt-header>
        <div style="height:40px"></div>

        <h1 class="boxheader">原价</h1>
        <mt-field v-lfcous onfocus="onInput(this)" type="number" label="交强险" v-model="cliOrigin"></mt-field>
        <mt-field v-lfcous onfocus="onInput(this)" type="number" label="商业险" v-model="gapOrigin"></mt-field>
        <mt-field v-lfcous onfocus="onInput(this)" type="number" label="车船税" v-model="taxOrigin"></mt-field>

        <h1 class="boxheader">返点</h1>
        <mt-field v-lfcous onfocus="onInput(this)" type="number" label="交强险" v-model="cliPayback"></mt-field>
        <mt-field v-lfcous onfocus="onInput(this)" type="number" label="商业险" v-model="gapPayback"></mt-field>
        <mt-field v-lfcous onfocus="onInput(this)" type="number" label="车船税" v-model="taxPayback"></mt-field>
        <mt-switch v-model="taxSeparate" style="border-top:1px solid lightgray;padding:10px;">价税分离</mt-switch>
        
        <h1 class="boxheader">总计</h1>
        <mt-field v-lfcous onfocus="onInput(this)" type="number" label="原价总计:" v-model="originTotal"></mt-field>
        <mt-field v-lfcous onfocus="onInput(this)" type="number" label="实收总计:" v-model="acturalTotal"></mt-field>
        <mt-field v-lfcous onfocus="onInput(this)" type="number" label="总计为您节省:" v-model="saveTotal"></mt-field>

        <mt-button type="primary" size="normal" @click="confirm" id="confirm">开始计算</mt-button>

    </div>
</template>

<script>

    import {Header, Field, Switch, Button} from "mint-ui"
    export default {
        name: "mtools",
        data() {
            return {
              cliOrigin:0,
              gapOrigin:0,
              taxOrigin:0,

              cliPayback:0,
              gapPayback:0,
              taxPayback:0,

              taxSeparate:false,

              originTotal:0,
              acturalTotal:0,
              saveTotal:0
            }
        },
        methods: {
            back: function () {
                console.log(`back to last`)
                this
                    .$router
                    .go(-1)
            },
            clearContent: function () {
                console.log(`清空`)
            },
            confirm:function (){
              console.log(`开始计算`)
              this.originTotal = parseInt(this.cliOrigin) + parseInt(this.gapOrigin) + parseInt(this.taxOrigin)
              this.saveTotal = parseInt(this.cliPayback) + parseInt(this.gapPayback) + parseInt(this.taxPayback)
            },
            onInput:function(x) {
              console.log('onfocus !!!')
              x.style.background= 'yellow'
            },
            
        },
        directives:{
          lfcous:{
              inserted: function (el){
                let oInput = el.querySelector('input')
                oInput.onfocus = function(){
                  oInput.style.background = 'yellow'
                  if (oInput.value == 0) {
                      oInput.value = ''
                  }
                  //console.log(`---->>>> ${JSON.stringify(oInput.value)}`)
                };

                oInput.onblur = function(){
                  oInput.style.background = 'red'
                }
              }
            }
        }
    }
</script>

<style>
#toolView{
  width: 100%;
  height: 100%;
  overflow: scroll;
}
    .boxheader {

        font-size: 18px;
        border-top: 1px solid lightgray;
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: center;
    }

    #confirm {
      display: block;
    width: 80%;
    margin: 10px auto;
    }


</style>