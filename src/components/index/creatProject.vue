<template>  
  <div class="createProject" style="background-color: #fff;">
    <p style="font-weight: 700;font-size: 28px;color: #999999;margin: 20px 0px 0px 275px;display: inline-block">请先创建新项目</p>
    <div class="keyword">
        <el-form label-position="right" style="margin-top: 10%; width:70%;margin-left: 120px;">
          <form class="form-horizontal" style="margin-top:40px;margin-bottom: 30px;">
            <div class="form-group">
              <label for="name" class="control-label">项目名称</label>    
              <input type="text" class="form-control" id="name"  v-model="name"  style="height: 38px;font-size: 16px;">    
            </div>  
          </form>

          <form class="form-horizontal" style="margin-bottom: 30px;">
            <div class="form-group">
              <label for="mustkw" class="control-label">必须包含关键词</label>    
              <input type="text" class="form-control" id="mustkw"  placeholder="多个词之间用“，”隔开" @blur="mustcreate_notag" v-model="mustkw" @keyup.enter="mustcreate_notag" style="height: 38px;font-size: 16px;">    
            </div>  
          </form>

          <form class="form-horizontal" style="margin-bottom: 30px;">
            <div class="form-group">
                <label for="kw" class="control-label">关键词</label>   
                <input type="text" class="form-control" id="kw" placeholder="多个词之间用“，”隔开" @blur="create_tag" v-model="kw" @keyup.enter="create_tag" style="height: 38px;font-size: 16px;">  
            </div>  
          </form>  

          <form class="form-horizontal" style="margin-bottom: 30px;">
            <div class="form-group">
              <label for="t_notkw" class="control-label">标题排除词</label>  
              <input type="text" class="form-control" id="t_notkw" placeholder="多个词之间用“，”隔开" @blur="t_notcreate_notag" v-model="t_notkw" @keyup.enter="t_notcreate_notag" style="height: 38px;font-size: 16px;">    
            </div>  
          </form>

          <form class="form-horizontal" >
            <div class="form-group">
              <label for="notkw" class="control-label">排除词</label> 
              <input type="text" class="form-control" id="notkw" placeholder="多个词之间用“，”隔开" @blur="notcreate_notag" v-model="notkw" @keyup.enter="notcreate_notag" style="height: 38px;font-size: 16px;">  
            </div>  
          </form>
            <p :style="{transition: '1s',margin:'30px 0px 40px -41px',opacity:show_moren}" class="moren">是否添加默认排除词
              <el-button type="info" :style="{display:show_moren==1? 'inline-block' : 'none',background:'rgba(255, 204, 102, 1)',borderColor:'rgba(255, 204, 102, 1)',padding:'3px 22px',marginLeft:'25px'}" @click="add_moren">是</el-button> 
              <el-button :style="{display:show_moren==1? 'inline-block' : 'none',background:'#fff',borderColor:'#fff',marginLeft:'25px',color:'#999999'}"  @click="show_moren=0">否</el-button>
            </p>

          <form class="form-horizontal" >
            <div class="form-group">
              <label for="remark" class="control-label" >备注</label> 
              <textarea type="text" class="form-control" id="remark" v-model="remark" style="display: inline-block; width: 70%;vertical-align:middle;"></textarea>  
            </div>  
          </form>  
        </el-form>
        <button type="button" class="btn  btn-md btn-inline-block " style="width:84px;margin-left: 38%;margin-top:4%;height: 34px;font-size: 14px;background-color: rgb(255, 204, 102);
        border-color:rgb(255, 204, 102);color: white;" @click="$router.back(-1)">返回</button>
          <button type="button" class="btn  btn-md btn-inline-block " style="width:84px;margin-left: 17%;margin-top:4%;height: 34px;font-size: 14px;background-color: #00b38a;
        border-color: #00b38a;color: white;" @click="save">完成</button>
      </div>
  </div> 
</template>
<script >
import { publicSearch,tipsMessage,successBack,GetLocalStorage,SetLocalStorage}  from '../../assets/js/map.js'
  export default{
    data : function(){ 
        return{
          name:'',
          mustkw:'',
          kw:'',
          t_notkw:'',
          notkw:'',
          show_moren:1,
          remark:''
        }
    },
    methods:{
      save () {
        if(this.name.length == 0 || this.mustkw.length + this.kw.length == 0){
          tipsMessage('方案名或者必须包含关键词和关键词不能同时为空','warning',this)
          return;
        };
        let data = {
           "method": 'post',
           "project":{
              "name":this.name,
              "simpleModelId": 0,
              "remark": this.remark,
           },
            'includeKeywords': this.kw.replace(/，/ig,',').split(',').filter(x => x&&$.trim(x).length > 0),
            'mustIncludeKeywords':this.mustkw.replace(/，/ig,',').split(',').filter(x => x&&$.trim(x).length > 0),
            'titleExcludeKeywords':this.t_notkw.replace(/，/ig,',').split(',').filter(x => x&&$.trim(x).length > 0),
            'contentExcludeKeywords': this.notkw.replace(/，/ig,',').split(',').filter(x => x&&$.trim(x).length > 0)
        };
         publicSearch('rsa/project',"POST",{"projectDto":JSON.stringify(data)}).then((data) =>{
          if(successBack(data,this)){
            console.log(data)
            let projectData = {};
            if(GetLocalStorage('current_projectData_A') == null || GetLocalStorage('current_projectData_A').project_list == null){
              projectData.project_list = [data.data]
            }else{
              projectData.project_list = [...[data.data],...GetLocalStorage('current_projectData_A').project_list];
            };
            projectData.project_id = data.data.id;
            projectData.project_name = data.data.name;
            SetLocalStorage('current_projectData_A',projectData);
            this.$router.push('/refer');
            location.reload();
          }
         });
      },
      mustcreate_notag () {
        this.mustkw = Array.from(new Set(this.mustkw.replace(/，/ig,',').split(','))).filter(x => x&&$.trim(x).length > 0).toString();
        let Tag = [...this.kw.replace(/，/ig,',').split(','),...this.notkw.replace(/，/ig,',').split(','),...this.t_notkw.replace(/，/ig,',').split(',')].filter(x => x&&$.trim(x).length > 0)
        if(this.mustkw.length){
          for(let i of this.mustkw.replace(/，/ig,',').split(',')){
            if(Tag.indexOf(i) != -1){
              tipsMessage('请不要输入与关键词重复的内容','warning',this); 
              this.focus('mustkw');
              return;
            }
          }
        };
      },
      create_tag () {
        this.kw = Array.from(new Set(this.kw.replace(/，/ig,',').split(','))).filter(x => x&&$.trim(x).length > 0).toString();
        let Tag = [...this.mustkw.replace(/，/ig,',').split(','),...this.notkw.replace(/，/ig,',').split(','),...this.t_notkw.replace(/，/ig,',').split(',')].filter(x => x&&$.trim(x).length > 0);
        if(this.kw.length){
          for(let i of this.kw.replace(/，/ig,',').split(',')){
            if(Tag.indexOf(i) != -1){
              tipsMessage('请不要输入与排除词、关键词重复的内容','warning',this); 
              this.focus('kw');
              return;
            }
          }
        };
      },
      t_notcreate_notag () {
        this.t_notkw = Array.from(new Set(this.t_notkw.replace(/，/ig,',').split(','))).filter(x => x&&$.trim(x).length > 0).toString();
        let Tag = [...this.mustkw.replace(/，/ig,',').split(','),...this.kw.replace(/，/ig,',').split(',')].filter(x => x&&$.trim(x).length > 0);
        if(this.t_notkw.length){
          for(let i of this.t_notkw.replace(/，/ig,',').split(',')){
            if(Tag.indexOf(i) != -1){
              tipsMessage('请不要输入与关键词重复的内容','warning',this); 
              this.focus('t_notkw');
              return;
            }
          }
        };
      },
      notcreate_notag () {
        this.notkw = Array.from(new Set(this.notkw.replace(/，/ig,',').split(','))).filter(x => x&&$.trim(x).length > 0).toString();
        let Tag = [...this.mustkw.replace(/，/ig,',').split(','),...this.kw.replace(/，/ig,',').split(',')].filter(x => x&&$.trim(x).length > 0);
        if(this.notkw.length){
          for(let i of this.notkw.replace(/，/ig,',').split(',')){
            if(Tag.indexOf(i) != -1){
              tipsMessage('请不要输入与关键词重复的内容','warning',this); 
              this.focus('notkw');
              return;
            }
          }
        };
      },
      add_moren(){
        publicSearch('rsa/defaultExcludeKeyword/',"POST",{"method": 'get'}).then((data) =>{//ajax
          if(successBack(data,this)){
            this.notkw =  Array.from(new Set([...this.notkw.replace(/，/ig,',').split(','),...this.notkw.replace(/，/ig,',').split(','),...data.data.defaultExcludeKeywords].filter(x => x&&$.trim(x).length > 0))).toString();
            this.show_moren = 0;
          }    
        });  
      },
      focus (n) {
        $('#'+n+'').focus();
      }    
    },
    watch:{
      notkw(){
        this.notkw.length == 0 ? this.show_moren = 1 : '';
      }
    }
  }
</script>
<style lang="scss" scoped>
  .createProject{
   width: 740px;
   height: 770px;
   box-shadow: #ccc 0px 0px 10px;
   margin: -80px auto 0 auto;
   .moren{
    .el-button--default:hover{
      color: rgb(255, 204, 102) !important;
    }
   } 
   ::-webkit-input-placeholder {/*Chrome/Safari*/
      color:#ccc;
      font-size: 14px;
      padding-left: 15px;
      }
   ::-moz-input-placeholder {/*Firefox*/
      color:#ccc;
      font-size: 14px;
      padding-left: 15px;
    }
  }
</style>