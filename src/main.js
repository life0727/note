// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import Vue from 'vue'
import App from './App'
//import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-chalk/index.css'
import router from './router.config.js'
//import Promise from 'promise-polyfill'
//import Vuex from 'vuex'
// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   loading: 'static/svg/img_loading.svg',
//   attempt: 1
// })
//Vue.use(ElementUI)
//Vue.use(Vuex)
// To add to window 
/*if (!window.Promise) {  
  window.Promise = Promise;  
}*/

    try {
      if (!window.Promise) {
         window.Promise = Promise;
      } 
    }catch(err){
        console.log(err)
      }


const vuex_store=new Vuex.Store({
	state:{
        test:0,
        list_Data:'',//文章管理模块数据
    		data:[],//事件模块数据
        ev_duibidata:[],//事件的对比数据
    		//start_data:'',//事件模块原始数据
        btn_daochu:false,//事件导出按钮状态
        duibiButton:false,//展现事件表格的按钮隐藏或者显示状态
        btn_org:false,
        btn_media:false,
        org_Data:'',//组织数据
        org_duibiData:'',//组织的对比数据
        media_Data:'',
        media_duibiData:'',//媒体的对比数据
        router:'',//声誉分析切换跳转保存路由地址
        keyword_tab:'_keywordTab',//keyword模块tab切换添加竞品时默认为竞品tab
        selectERAIdArr:[],//ERA模块总部选中的文章
        /*refer_articleType:'',//提及率的文章类型
        refer_queryType:'',//提及率的检索方式
        refer_time:'',//提及率的搜索时间
        refer_industry:'',//提及率的行业核心数据
        refer_enterpriseData:'',//提及率的企业数据
        refer_data:'',//提及率图表数据
        refer_reputation:'',//提及率图表数据
        refer_mention:''//提及率图表数据*/
	},
	mutations:{
        showUser(state){
          
        }
    }
})

Vue.prototype.auitor = 'fqm';
Date.prototype.Format = function(fmt) {
  var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "h+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

var vm=new Vue({
  el: '#app',
  router,
  store:vuex_store,
  ...App
})
