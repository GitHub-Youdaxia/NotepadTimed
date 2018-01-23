<template>
  <div id="app">
    <el-row>
      <el-col :span="20" :offset="2">
        <router-view/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
console.clear()
var store = require('storejs')
export default {
  name: 'App',
  created: function(){
    // store.clear()
    //初始化本地存储
    if(!store.get('classArr')){
      this.log('初始化本地存储')
      store.set('classArr',this.classArr)
      var classArrLength=this.classArr.length
      for(var i=0;i<classArrLength;i++){
        store.set(this.classArr[i].value,[])
        this.log(this.classArr[i].value);
        this.log(store.get(this.classArr[i].value));
      }
    }    
  }
}
</script>

<style>
#app {
  font-family: 'microsoft yahei';
  color: #2c3e50;
  margin-top: 10px;
}
p{  -webkit-margin-before:0;
  -webkit-margin-after:0;
  text-indent: 2em;}
  .el-card__header{
    padding-top:2px;
    padding-bottom:2px;
  }
.clearfix:after {display: block;clear: both;content: "";visibility: hidden;height: 0;}
.clearfix{zoom:1;}
</style>
