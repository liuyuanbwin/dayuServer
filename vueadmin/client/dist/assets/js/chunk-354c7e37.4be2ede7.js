(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-354c7e37"],{"3d96":function(e,t,a){},"727e":function(e,t,a){"use strict";var i=a("924b"),l=a.n(i);l.a},"7ba6":function(e,t,a){"use strict";var i=a("3d96"),l=a.n(i);l.a},"924b":function(e,t,a){},c62b:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"staff"},[a("div",{staticClass:"staff-top"},[a("el-form",{attrs:{inline:!0}},[a("el-input",{staticStyle:{width:"240px"},attrs:{placeholder:""},on:{input:e.doFilter},model:{value:e.vehicleSearch,callback:function(t){e.vehicleSearch=t},expression:"vehicleSearch"}}),a("el-form-item",{staticClass:"btnRight"},[a("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-edit-outline"},on:{click:function(t){e.addBill()}}},[e._v("添加")])],1)],1)],1),a("div",{staticClass:"list"},[a("div",{staticClass:"tab"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"border"}},[a("el-table-column",{attrs:{type:"index",label:"序号",align:"center",sortable:"sortable",width:"70"}}),a("el-table-column",{attrs:{label:"车牌号",align:"center",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.plate_num))])]}}])}),a("el-table-column",{attrs:{label:"被保险人",align:"center",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.insurant))])]}}])}),a("el-table-column",{attrs:{label:"商险到期日期",align:"center",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(e.timeRound(t.row.gap_expire_date))+"\n                        ")])]}}])}),a("el-table-column",{attrs:{label:"交强险",align:"center",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(e.timeRound(t.row.cli_expire_date)))])]}}])}),a("el-table-column",{attrs:{label:"客服电话",align:"center",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.customer_tel))])]}}])}),a("el-table-column",{attrs:{label:"报险电话",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.report_tel))])]}}])}),a("el-table-column",{attrs:{label:"操作",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){e.billEdit(t.$index,t.row)}}},[e._v("编辑")]),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){e.billDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1)],1),a("div",{staticClass:"page"},[a("el-pagination",{attrs:{"current-page":e.paginations.page_index,"page-sizes":e.paginations.page_sizes,"page-size":e.paginations.page_size,layout:e.paginations.layout,total:e.paginations.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)]),a("BillDialog",{attrs:{dialong:e.dialong,form:e.form},on:{BillData:e.getInfoList}})],1)},l=[],n=(a("ac6a"),a("456d"),a("cadf"),a("551c"),a("097d"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"nofind"},[a("el-dialog",{attrs:{title:e.dialong.title,type:"primary",size:"small","close-on-press-escape":!1,"modal-append-to-body":!1,"close-on-click-modal":!1,visible:e.dialong.show},on:{"update:visible":function(t){e.$set(e.dialong,"show",t)}}},[a("el-form",{ref:"formdoalog",attrs:{model:e.form,"label-width":"80px"}},[a("el-form-item",{attrs:{"label-width":"160px",label:"车牌号",prop:"plate_num"}},[a("el-input",{model:{value:e.form.plate_num,callback:function(t){e.$set(e.form,"plate_num",t)},expression:"form.plate_num"}})],1),a("el-form-item",{attrs:{"label-width":"160px",label:"被保险人",prop:"insurant"}},[a("el-input",{model:{value:e.form.insurant,callback:function(t){e.$set(e.form,"insurant",t)},expression:"form.insurant"}})],1),a("el-form-item",{attrs:{"label-width":"160px",label:"汽车型号",prop:"vehicle_type"}},[a("el-input",{model:{value:e.form.vehicle_type,callback:function(t){e.$set(e.form,"vehicle_type",t)},expression:"form.vehicle_type"}})],1),a("el-form-item",{attrs:{"label-width":"160px",label:"首次登记日期",prop:"regist_date"}},[a("el-date-picker",{attrs:{type:"date",editable:!0,"value-format":"yyyy-MM-dd",placeholder:"选择日期"},model:{value:e.form.regist_date,callback:function(t){e.$set(e.form,"regist_date",t)},expression:"form.regist_date"}})],1),a("el-form-item",{attrs:{"label-width":"160px",label:"业务部门",prop:"busi_depart"}},[a("el-input",{model:{value:e.form.busi_depart,callback:function(t){e.$set(e.form,"busi_depart",t)},expression:"form.busi_depart"}})],1),a("el-form-item",{attrs:{"label-width":"160px",label:"车架号",prop:"vin_no"}},[a("el-input",{model:{value:e.form.vin_no,callback:function(t){e.$set(e.form,"vin_no",t)},expression:"form.vin_no"}})],1),a("el-form-item",{attrs:{"label-width":"160px",label:"发动机号",prop:"engine_sn"}},[a("el-input",{model:{value:e.form.engine_sn,callback:function(t){e.$set(e.form,"engine_sn",t)},expression:"form.engine_sn"}})],1),a("el-form-item",{attrs:{"label-width":"160px",label:"投保的是",prop:"insure_is"}},[a("el-input",{model:{value:e.form.insured_is,callback:function(t){e.$set(e.form,"insured_is",t)},expression:"form.insured_is"}})],1),a("el-form-item",{attrs:{"label-width":"160px",label:"交强险到期日期",prop:"cli_expire_date"}},[a("el-date-picker",{attrs:{type:"date",editable:!0,"value-format":"yyyy-MM-dd",placeholder:"选择日期"},model:{value:e.form.cli_expire_date,callback:function(t){e.$set(e.form,"cli_expire_date",t)},expression:"form.cli_expire_date"}})],1),a("el-form-item",{attrs:{"label-width":"160px",label:"商业险到期日期",prop:"gap_expire_date"}},[a("el-date-picker",{attrs:{type:"date",editable:!0,"value-format":"yyyy-MM-dd",placeholder:"选择日期"},model:{value:e.form.gap_expire_date,callback:function(t){e.$set(e.form,"gap_expire_date",t)},expression:"form.gap_expire_date"}})],1),a("el-form-item",{attrs:{"label-width":"160px",label:"商业险内容",prop:"gap_content"}},[a("el-input",{model:{value:e.form.gap_content,callback:function(t){e.$set(e.form,"gap_content",t)},expression:"form.gap_content"}})],1),a("el-form-item",{attrs:{"label-width":"160px",label:"验车日期",prop:"checkcar_date"}},[a("el-date-picker",{attrs:{type:"date",editable:!0,"value-format":"yyyy-MM-dd",placeholder:"选择日期"},model:{value:e.form.checkcar_date,callback:function(t){e.$set(e.form,"checkcar_date",t)},expression:"form.checkcar_date"}})],1),a("el-form-item",{attrs:{"label-width":"160px",label:"客服电话",prop:"customer_tel"}},[a("el-input",{model:{value:e.form.customer_tel,callback:function(t){e.$set(e.form,"customer_tel",t)},expression:"form.customer_tel"}})],1),a("el-form-item",{attrs:{"label-width":"160px",label:"出险电话",prop:"report_tel"}},[a("el-input",{model:{value:e.form.report_tel,callback:function(t){e.$set(e.form,"report_tel",t)},expression:"form.report_tel"}})],1),a("el-form-item",{attrs:{"label-width":"160px",label:"去年投保情况",prop:"lastyear_info"}},[a("el-input",{model:{value:e.form.lastyear_info,callback:function(t){e.$set(e.form,"lastyear_info",t)},expression:"form.lastyear_info"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialong.show=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.addHandle("formdoalog")}}},[e._v("确 定")])],1)],1)],1)}),o=[],s={name:"BillInfoDialog",data:function(){return{}},props:{dialong:Object,form:Object},methods:{addHandle:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;var a="add"==t.dialong.option?"add":"/edit/".concat(t.form.id);console.log(t.form),t.$axios.post("/api/vehicles/".concat(a),t.form).then(function(e){t.$message({type:"success",message:"数据添加成功"}),t.dialong.show=!1,t.$emit("BillData"),t.form=""})})}}},r=s,c=(a("7ba6"),a("2877")),p=Object(c["a"])(r,n,o,!1,null,"b5a2b4fc",null);p.options.__file="BillInfoDialog.vue";var d=p.exports,f=a("c1df"),u={name:"list",data:function(){return{vehicleSearch:"",tableData:[],paginations:{page_index:1,total:0,page_size:5,page_sizes:[5,10,15,20],layout:"total, sizes, prev, pager, next, jumper"},allTableData:[],filteData:[],dialong:{show:!1,title:"",option:"edit"},form:{}}},methods:{doFilter:function(){var e=this.vehicleSearch;e?(this.filteData=this.allTableData.filter(function(t){return Object.keys(t).some(function(a){return String(t[a]).toLowerCase().indexOf(e)>-1})}),console.log(this.filteData.length+" --- "+this.allTableData.length),this.setPaginations()):(console.log("+++++  "+this.filteData.length+" --- "+this.allTableData.length),this.filteData=this.allTableData,this.setPaginations())},timeRound:function(e){return f(e).format("YYYY-MM-DD")},getInfoList:function(){var e=this;this.$axios.get("/api/vehicles").then(function(t){if(1===t.data.status){var a=t.data.results;e.allTableData=a,e.filteData=a,e.setPaginations()}})},setPaginations:function(){var e=this;this.paginations.total=this.filteData.length,this.paginations.page_index=1,this.paginations.page_size=10,this.tableData=this.filteData.filter(function(t,a){return a<e.paginations.page_size})},handleSizeChange:function(e){this.paginations.page_index=1,this.paginations.page_size=e,this.tableData=this.filteData.filter(function(t,a){return a<e})},handleCurrentChange:function(e){for(var t=this.paginations.page_size*(e-1),a=this.paginations.page_size*e,i=[],l=t;l<a;l++)this.filteData[l]&&i.push(this.filteData[l]),this.tableData=i},addBill:function(){this.dialong={title:"录入保单",show:!0,option:"add"},this.form={}},billEdit:function(e,t){this.dialong={title:"编辑保单",show:!0,option:"edit"},this.form={plate_num:t.plate_num,insurant:t.insurant,vehicle_type:t.vehicle_type,regist_date:t.regist_date,busi_depart:t.busi_depart,vin_no:t.vin_no,engine_sn:t.engine_sn,insured_is:t.insured_is,cli_expire_date:t.cli_expire_date,gap_expire_date:t.gap_expire_date,gap_content:t.gap_content,checkcar_date:t.checkcar_date,customer_tel:t.customer_tel,report_tel:t.report_tel,lastyear_info:t.lastyear_info}},billDelete:function(e,t){var a=this;this.$confirm("此操作将永久删除该用户, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.$axios.delete("/api/bills/delete/".concat(t._id)).then(function(e){a.$message({type:"success",message:"删除成功!"})}),a.getInfoList()}).catch(function(){a.$message({type:"info",message:"已取消删除"})})}},created:function(){this.getInfoList()},components:{BillDialog:d}},m=u,_=(a("727e"),Object(c["a"])(m,i,l,!1,null,"966e1da4",null));_.options.__file="Bills.vue";t["default"]=_.exports}}]);
//# sourceMappingURL=chunk-354c7e37.4be2ede7.js.map