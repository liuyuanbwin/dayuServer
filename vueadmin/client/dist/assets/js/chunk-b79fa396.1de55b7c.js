(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b79fa396"],{"0bfb":function(e,t,a){"use strict";var i=a("cb7c");e.exports=function(){var e=i(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},2087:function(e,t,a){"use strict";var i=a("c43f"),l=a.n(i);l.a},"214f":function(e,t,a){"use strict";var i=a("32e9"),l=a("2aba"),n=a("79e5"),o=a("be13"),r=a("2b4c");e.exports=function(e,t,a){var s=r(e),c=a(o,s,""[e]),u=c[0],f=c[1];n(function(){var t={};return t[s]=function(){return 7},7!=""[e](t)})&&(l(String.prototype,e,u),i(RegExp.prototype,s,2==t?function(e,t){return f.call(e,this,t)}:function(e){return f.call(e,this)}))}},3846:function(e,t,a){a("9e1e")&&"g"!=/./g.flags&&a("86cc").f(RegExp.prototype,"flags",{configurable:!0,get:a("0bfb")})},"3d3e":function(e,t,a){"use strict";var i=a("caea"),l=a.n(i);l.a},"6b54":function(e,t,a){"use strict";a("3846");var i=a("cb7c"),l=a("0bfb"),n=a("9e1e"),o="toString",r=/./[o],s=function(e){a("2aba")(RegExp.prototype,o,e,!0)};a("79e5")(function(){return"/a/b"!=r.call({source:"a",flags:"b"})})?s(function(){var e=i(this);return"/".concat(e.source,"/","flags"in e?e.flags:!n&&e instanceof RegExp?l.call(e):void 0)}):r.name!=o&&s(function(){return r.call(this)})},"9ef3":function(e,t,a){},a481:function(e,t,a){a("214f")("replace",2,function(e,t,a){return[function(i,l){"use strict";var n=e(this),o=void 0==i?void 0:i[t];return void 0!==o?o.call(i,n,l):a.call(String(n),i,l)},a]})},c37c:function(e,t,a){"use strict";var i=a("9ef3"),l=a.n(i);l.a},c43f:function(e,t,a){},c62b:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"staff"},[a("div",{staticClass:"staff-top"},[a("el-form",{attrs:{inline:!0}},[a("el-form-item",{staticClass:"btnRight"},[a("el-input",{staticStyle:{width:"240px","margin-right":"10px",float:"left"},attrs:{placeholder:""},on:{input:e.doFilter},model:{value:e.vehicleSearch,callback:function(t){e.vehicleSearch=t},expression:"vehicleSearch"}}),a("el-button",{staticStyle:{"margin-right":"10px"},attrs:{type:"primary",size:"middle",icon:"el-icon-time"},on:{click:function(t){e.checkcarexpire()}}},[e._v("交强险到期提醒")]),a("el-button",{staticStyle:{"margin-right":"10px"},attrs:{type:"primary",size:"middle",icon:"el-icon-news"},on:{click:function(t){e.insurancexpire()}}},[e._v("保险到期提醒")]),a("el-button",{staticStyle:{"margin-right":"10px"},attrs:{type:"primary",size:"middle",icon:"el-icon-edit-outline"},on:{click:function(t){e.addBill()}}},[e._v("添加")])],1)],1)],1),a("div",{staticClass:"list"},[a("div",{staticClass:"tab"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"border"}},[a("el-table-column",{attrs:{type:"index",label:"序号",align:"center",sortable:"sortable",width:"70"}}),a("el-table-column",{attrs:{label:"车牌号",align:"center",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.plate_num))])]}}])}),a("el-table-column",{attrs:{label:"被保险人",align:"center",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.insurant))])]}}])}),a("el-table-column",{attrs:{label:"商险到期日期",align:"center",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(e.timeRound(t.row.gap_expire_date))+"\n                        ")])]}}])}),a("el-table-column",{attrs:{label:"交强险",align:"center",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(e.timeRound(t.row.cli_expire_date)))])]}}])}),a("el-table-column",{attrs:{label:"客服电话",align:"center",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.customer_tel))])]}}])}),a("el-table-column",{attrs:{label:"报险电话",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.report_tel))])]}}])}),a("el-table-column",{attrs:{label:"操作",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){e.billEdit(t.$index,t.row)}}},[e._v("编辑")]),a("el-button",{attrs:{size:"mini"},on:{click:function(a){e.billDetail(t.$index,t.row)}}},[e._v("回访记录")]),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){e.billDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1)],1),a("div",{staticClass:"page"},[a("el-pagination",{attrs:{"current-page":e.paginations.page_index,"page-sizes":e.paginations.page_sizes,"page-size":e.paginations.page_size,layout:e.paginations.layout,total:e.paginations.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)]),a("BillDialog",{attrs:{dialong:e.dialong,form:e.form},on:{BillData:e.getInfoList}}),a("ReviewDialog",{attrs:{dialong:e.reviewdia,form:e.form}})],1)},l=[],n=(a("ac6a"),a("456d"),a("6b54"),a("a481"),a("cadf"),a("551c"),a("097d"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"nofind"},[a("el-dialog",{attrs:{title:e.dialong.title,type:"primary",size:"small","close-on-press-escape":!1,"modal-append-to-body":!1,"close-on-click-modal":!1,visible:e.dialong.show},on:{"update:visible":function(t){e.$set(e.dialong,"show",t)}}},[a("el-form",{ref:"formdoalog",attrs:{model:e.form,"label-width":"80px"}},[a("el-form-item",{attrs:{"label-width":"160px",label:"车牌号",prop:"plate_num"}},[a("el-input",{model:{value:e.form.plate_num,callback:function(t){e.$set(e.form,"plate_num",t)},expression:"form.plate_num"}})],1),a("el-form-item",{attrs:{"label-width":"160px",label:"被保险人",prop:"insurant"}},[a("el-input",{model:{value:e.form.insurant,callback:function(t){e.$set(e.form,"insurant",t)},expression:"form.insurant"}})],1),a("el-form-item",{attrs:{"label-width":"160px",label:"汽车类型",prop:"vehicle_type"}},[a("el-select",{attrs:{placeholder:"请选择汽车类型"},model:{value:e.form.vehicle_type,callback:function(t){e.$set(e.form,"vehicle_type",t)},expression:"form.vehicle_type"}},[a("el-option",{attrs:{value:"under5",label:"5人以下轿车"}}),a("el-option",{attrs:{value:"beyond5",label:"5人以上轿车"}}),a("el-option",{attrs:{value:"trunk",label:"货车"}}),a("el-option",{attrs:{value:"other",label:"其他"}})],1)],1),a("el-form-item",{attrs:{"label-width":"160px",label:"初次登记日期",prop:"regist_date"}},[a("el-date-picker",{attrs:{type:"date",editable:!0,"value-format":"yyyy-MM-dd",placeholder:"选择日期"},model:{value:e.form.regist_date,callback:function(t){e.$set(e.form,"regist_date",t)},expression:"form.regist_date"}})],1),a("el-form-item",{attrs:{"label-width":"160px",label:"投保公司",prop:"insure_is"}},[a("el-input",{model:{value:e.form.insured_is,callback:function(t){e.$set(e.form,"insured_is",t)},expression:"form.insured_is"}})],1),a("el-form-item",{attrs:{"label-width":"160px",label:"交强险到期日期",prop:"cli_expire_date"}},[a("el-date-picker",{attrs:{type:"date",editable:!0,"value-format":"yyyy-MM-dd",placeholder:"选择日期"},model:{value:e.form.cli_expire_date,callback:function(t){e.$set(e.form,"cli_expire_date",t)},expression:"form.cli_expire_date"}})],1),a("el-form-item",{attrs:{"label-width":"160px",label:"商业险到期日期",prop:"gap_expire_date"}},[a("el-date-picker",{attrs:{type:"date",editable:!0,"value-format":"yyyy-MM-dd",placeholder:"选择日期"},model:{value:e.form.gap_expire_date,callback:function(t){e.$set(e.form,"gap_expire_date",t)},expression:"form.gap_expire_date"}})],1),a("el-form-item",{attrs:{"label-width":"160px",label:"商业险内容",prop:"gap_content"}},[a("el-input",{model:{value:e.form.gap_content,callback:function(t){e.$set(e.form,"gap_content",t)},expression:"form.gap_content"}})],1),a("el-form-item",{attrs:{"label-width":"160px",label:"出险电话",prop:"report_tel"}},[a("el-input",{model:{value:e.form.report_tel,callback:function(t){e.$set(e.form,"report_tel",t)},expression:"form.report_tel"}})],1),a("el-form-item",{attrs:{"label-width":"160px",label:"验车日期",prop:"checkcar_date"}},[a("el-date-picker",{attrs:{type:"date",editable:!0,"value-format":"yyyy-MM-dd",placeholder:"选择日期"},model:{value:e.form.checkcar_date,callback:function(t){e.$set(e.form,"checkcar_date",t)},expression:"form.checkcar_date"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialong.show=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.addHandle("formdoalog")}}},[e._v("确 定")])],1),a("el-collapse",{attrs:{accordion:"accordion"}},[a("el-collapse-item",[a("template",{slot:"title"},[a("i",{staticClass:"header-icon el-icon-document"}),e._v("其他信息\n                ")]),a("el-form",{ref:"formdoalog",attrs:{model:e.form,"label-width":"80px"}},[a("el-form-item",{attrs:{"label-width":"160px",label:"车主",prop:"owner"}},[a("el-input",{model:{value:e.form.owner,callback:function(t){e.$set(e.form,"owner",t)},expression:"form.owner"}})],1),a("el-form-item",{attrs:{"label-width":"160px",label:"联系人",prop:"linkman"}},[a("el-input",{model:{value:e.form.linkman,callback:function(t){e.$set(e.form,"linkman",t)},expression:"form.linkman"}})],1),a("el-form-item",{attrs:{"label-width":"160px",label:"联系人电话1",prop:"linkman_tel1"}},[a("el-input",{model:{value:e.form.linkman_tel1,callback:function(t){e.$set(e.form,"linkman_tel1",t)},expression:"form.linkman_tel1"}})],1),a("el-form-item",{attrs:{"label-width":"160px",label:"联系人电话2",prop:"linkman_tel2"}},[a("el-input",{model:{value:e.form.linkman_tel2,callback:function(t){e.$set(e.form,"linkman_tel2",t)},expression:"form.linkman_tel2"}})],1),a("el-form-item",{attrs:{"label-width":"160px",label:"总部",prop:"headquarter"}},[a("el-input",{model:{value:e.form.headquarter,callback:function(t){e.$set(e.form,"headquarter",t)},expression:"form.headquarter"}})],1),a("el-form-item",{attrs:{"label-width":"160px",label:"业务部门",prop:"busi_depart"}},[a("el-input",{model:{value:e.form.busi_depart,callback:function(t){e.$set(e.form,"busi_depart",t)},expression:"form.busi_depart"}})],1),a("el-form-item",{attrs:{"label-width":"160px",label:"业务员",prop:"busi_man"}},[a("el-input",{model:{value:e.form.busi_man,callback:function(t){e.$set(e.form,"busi_man",t)},expression:"form.busi_man"}})],1),a("el-form-item",{attrs:{"label-width":"160px",label:"车辆型号",prop:"car_model"}},[a("el-input",{model:{value:e.form.car_model,callback:function(t){e.$set(e.form,"car_model",t)},expression:"form.car_model"}})],1),a("el-form-item",{attrs:{"label-width":"160px",label:"车架号",prop:"vin_no"}},[a("el-input",{model:{value:e.form.vin_no,callback:function(t){e.$set(e.form,"vin_no",t)},expression:"form.vin_no"}})],1),a("el-form-item",{attrs:{"label-width":"160px",label:"发动机号",prop:"engine_sn"}},[a("el-input",{model:{value:e.form.engine_sn,callback:function(t){e.$set(e.form,"engine_sn",t)},expression:"form.engine_sn"}})],1),a("el-form-item",{attrs:{"label-width":"160px",label:"客服电话",prop:"customer_tel"}},[a("el-input",{model:{value:e.form.customer_tel,callback:function(t){e.$set(e.form,"customer_tel",t)},expression:"form.customer_tel"}})],1),a("el-form-item",{attrs:{"label-width":"160px",label:"备注",prop:"remark"}},[a("el-input",{model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1)],1)],2)],1)],1)],1)}),o=[],r={name:"BillInfoDialog",data:function(){return{}},props:{dialong:Object,form:Object},methods:{addHandle:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;var a="add"==t.dialong.option?"add":"update";console.log(t.form),t.$axios.post("/api/vehicles/".concat(a),t.form).then(function(e){t.$message({type:"success",message:"数据添加成功"}),t.dialong.show=!1,t.form=""})})}}},s=r,c=(a("3d3e"),a("2877")),u=Object(c["a"])(s,n,o,!1,null,"0fcf2d42",null);u.options.__file="BillInfoDialog.vue";var f=u.exports,p=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"nofind"},[a("el-dialog",{attrs:{title:e.dialong.title,type:"primary",size:"small","close-on-press-escape":!1,"modal-append-to-body":!1,"close-on-click-modal":!1,visible:e.dialong.show},on:{"update:visible":function(t){e.$set(e.dialong,"show",t)}}},[a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialong.show=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.addHandle("formdoalog")}}},[e._v("确 定")])],1),e._l(e.reviews,function(t,i){return void 0!==e.reviews&&e.reviews.length>0?a("el-collapse",[a("el-collapse-item",{attrs:{title:e.timeRound(t.create_date)}},[a("div",[e._v(e._s(t.content))])])],1):e._e()}),a("el-card",{staticClass:"box-card",staticStyle:{marginTop:"10px"}},[a("el-form",{ref:"form",attrs:{rules:e.rules,model:e.form,"label-width":"80px"}},[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}}),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.onSubmit(this)}}},[e._v("关闭提醒")]),a("el-form-item",{attrs:{label:"回访时间",prop:"create_date"}},[a("el-col",{attrs:{span:11}},[a("el-date-picker",{attrs:{align:"right",type:"date",placeholder:"选择日期","picker-options":e.pickerOptions},model:{value:e.form.create_date,callback:function(t){e.$set(e.form,"create_date",t)},expression:"form.create_date"}})],1)],1),a("el-form-item",{attrs:{label:"回访内容",prop:"content"}},[a("el-input",{attrs:{type:"textarea"},model:{value:e.form.content,callback:function(t){e.$set(e.form,"content",t)},expression:"form.content"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.onSubmit(this)}}},[e._v("添加回访")])],1)],1)],1)],2)],1)},d=[],m=a("c1df"),g={name:"ReviewDialog",data:function(){return{reviews:[],form:{id:"",create_date:new Date,content:""},rules:{create_date:[{required:!0,message:"请选择回访日期",trigger:"blur"}],content:[{required:!0,message:"请填写回访内容",trigger:"blur"}]},pickerOptions:{disabledDate:function(e){return e.getTime()>Date.now()},shortcuts:[{text:"今天",onClick:function(e){e.$emit("pick",new Date)}},{text:"昨天",onClick:function(e){var t=new Date;t.setTime(t.getTime()-864e5),e.$emit("pick",t)}},{text:"一周前",onClick:function(e){var t=new Date;t.setTime(t.getTime()-6048e5),e.$emit("pick",t)}}]}}},props:{dialong:Object,form:Object},watch:{"dialong.show":{handler:function(e,t){console.log("dialong change !!!"+e),1==e&&this.getReviewList()}}},methods:{addHandle:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;var a="add"==t.dialong.option?"add":"update";console.log(t.form),t.$axios.post("/api/vehicles/".concat(a),t.form).then(function(e){t.$message({type:"success",message:"数据添加成功"}),t.dialong.show=!1,t.form=""})})},onSubmit:function(e){var t=this;this.$refs.form.validate(function(e){if(!e)return alert("请正确填写访问信息"),!1;t.$axios.post("/api/review/add",{create_date:t.form.create_date,content:t.form.content,vehicleId:t.form.id}).then(function(e){t.getReviewList(),t.form.create_date="",t.form.content=""})})},timeRound:function(e){return m(e).format("YYYY-MM-DD")},getReviewList:function(){var e=this;this.$axios.get("/api/review?id=".concat(this.form.id)).then(function(t){console.log("Get ".concat(JSON.stringify(t))),e.reviews=t.data.results})},refresh:function(){}},mounted:function(){}},h=g,_=(a("c37c"),Object(c["a"])(h,p,d,!1,null,"566c47c6",null));_.options.__file="ReviewDialog.vue";var b=_.exports,v=a("c1df"),x={name:"list",data:function(){return{vehicleSearch:"",tableData:[],paginations:{page_index:1,total:0,page_size:5,page_sizes:[5,10,15,20],layout:"total, sizes, prev, pager, next, jumper"},allTableData:[],filteData:[],dialong:{show:!1,title:"",option:"edit"},reviewdia:{show:!1,tilte:"",option:""},form:{}}},methods:{checkcarexpire:function(){var e=this;this.filteData=this.allTableData.filter(function(t){var a=t["cli_expire_date"];return!!a&&(e.judgeTime(a.replace(/-|T|:/g,""))>-30&&e.judgeTime(a.replace(/-|T|:/g,""))<0)}),this.setPaginations()},judgeTime:function(e){var t=e.toString(),a=t.substring(0,4),i=t.substring(4,6),l=t.substring(6,8),n=new Date(a+"/"+i+"/"+l),o=new Date,r=o.getFullYear(),s=o.getMonth()+1,c=o.getDate(),u=new Date(r+"/"+s+"/"+c),f=parseInt(u-n)/1e3/60/60/24;return f},doFilter:function(){var e=this.vehicleSearch;e?(this.filteData=this.allTableData.filter(function(t){return Object.keys(t).some(function(a){return String(t[a]).toLowerCase().indexOf(e)>-1})}),console.log(this.filteData.length+" --- "+this.allTableData.length),this.setPaginations()):(console.log("+++++  "+this.filteData.length+" --- "+this.allTableData.length),this.filteData=this.allTableData,this.setPaginations())},timeRound:function(e){return v(e).format("YYYY-MM-DD")},getInfoList:function(){var e=this;this.$axios.get("/api/vehicles").then(function(t){if(1===t.data.status){var a=t.data.results;e.allTableData=a,e.filteData=a,e.setPaginations()}})},setPaginations:function(){var e=this;this.paginations.total=this.filteData.length,this.paginations.page_index=1,this.paginations.page_size=10,this.tableData=this.filteData.filter(function(t,a){return a<e.paginations.page_size})},handleSizeChange:function(e){this.paginations.page_index=1,this.paginations.page_size=e,this.tableData=this.filteData.filter(function(t,a){return a<e})},handleCurrentChange:function(e){for(var t=this.paginations.page_size*(e-1),a=this.paginations.page_size*e,i=[],l=t;l<a;l++)this.filteData[l]&&i.push(this.filteData[l]),this.tableData=i},addBill:function(){this.dialong={title:"录入保单",show:!0,option:"add"},this.form={}},billDetail:function(e,t){this.reviewdia={title:"回访记录",show:!0,option:""},this.form={id:t._id}},billEdit:function(e,t){this.dialong={title:"编辑保单",show:!0,option:"edit"},this.form={id:t._id,plate_num:t.plate_num,insurant:t.insurant,vehicle_type:t.vehicle_type,regist_date:this.timeRound(t.regist_date),busi_depart:t.busi_depart,vin_no:t.vin_no,engine_sn:t.engine_sn,insured_is:t.insured_is,cli_expire_date:this.timeRound(t.cli_expire_date),gap_expire_date:this.timeRound(t.gap_expire_date),gap_content:t.gap_content,checkcar_date:this.timeRound(t.checkcar_date),customer_tel:t.customer_tel,report_tel:t.report_tel,remark:t.remark,owner:t.owner,linkman:t.linkman,linkman_tel1:t.linkman_tel1,linkman_tel2:t.linkman_tel2,busi_man:t.busi_man,busi_man_tel:t.busi_man_tel,headquarter:t.headquarter,car_model:t.car_model}},billDelete:function(e,t){var a=this;this.$confirm("此操作将永久删除该用户, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.$axios.delete("/api/bills/delete/".concat(t._id)).then(function(e){a.$message({type:"success",message:"删除成功!"})}),a.getInfoList()}).catch(function(){a.$message({type:"info",message:"已取消删除"})})}},created:function(){this.getInfoList()},components:{BillDialog:f,ReviewDialog:b}},k=x,w=(a("2087"),Object(c["a"])(k,i,l,!1,null,"7ca4362a",null));w.options.__file="Bills.vue";t["default"]=w.exports},caea:function(e,t,a){}}]);
//# sourceMappingURL=chunk-b79fa396.1de55b7c.js.map