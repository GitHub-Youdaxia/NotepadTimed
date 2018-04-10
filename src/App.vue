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
// console.clear()
var store = require('storejs')
export default {
  name: 'App',
  created: function(){
    // store.clear()
    // this.log(' store.get()',store.get('classArr'));
    //初始化本地存储
    if(!store.get('classArr')||store.get('classArr').length==0){
      console.log(store.get('classArr').length)
      store.set('classArr',this.classArr)
      var classArrLength=this.classArr.length
      for(var i=0;i<classArrLength;i++){
        store.set(this.classArr[i].value,[])
        // this.log(this.classArr[i].value);
        // this.log(store.get(this.classArr[i].value));
      }
    }    
  }
}
</script>

<style>
html,body{height:100%;}
/* padding-right:0 !important; 弹出时莫名加了padding，所以去掉它
*/
body {
overflow-x:hidden;
overflow-y:hidden;
padding-right:0 !important;
}
.el-row::-webkit-scrollbar{display: none}

#app {
  font-family: 'microsoft yahei';
  color: #2c3e50;
  margin-top: 10px;
  height:100%;
}
.el-row{
  height: 100%;
}
.el-row .el-col{
  height: 100%;
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
.fixed{position: fixed;left:0;top:0;width: 100%;z-index: 1000}
/* 显示滚动条 */
.el-tabs__content,.el-table__body-wrapper{overflow: auto !important;}

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
.el-table__body-wrapper::-webkit-scrollbar{width: 8px;height: 8px;background-color: #fff;}
/*定义滚动条轨道 内阴影+圆角*/
.el-table__body-wrapper::-webkit-scrollbar-track{box-shadow: inset 0 0 6px rgba(0,0,0,0.3);border-radius: 10px;  background-color: #fff; } 
 /*定义滑块 内阴影+圆角*/   
 .el-table__body-wrapper::-webkit-scrollbar-thumb  {  border-radius: 10px;box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
  background-color: #5CACEE;}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
.el-tabs__content::-webkit-scrollbar{width: 8px;height: 8px;background-color: #fff;}
/*定义滚动条轨道 内阴影+圆角*/
.el-tabs__content::-webkit-scrollbar-track{box-shadow: inset 0 0 6px rgba(0,0,0,0.3);border-radius: 10px;  background-color: #fff; } 
 /*定义滑块 内阴影+圆角*/   
 .el-tabs__content::-webkit-scrollbar-thumb  {  border-radius: 10px;box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
  background-color: #5CACEE;}
  .el-card__header{padding: 2px 4px !important}

/* 控制编辑器的最大高度*/
.ql-editor {
    max-height: 500px !important;
  } 
/*控制tab选项的高亮*/
.el-tabs__item.is-active{
  transform: scale(1.2);
  color: #409EFF !important;
  transition:all 0.1s !important;
  -webkit-transition:all 0.1s !important; /* Safari */
}
</style>
