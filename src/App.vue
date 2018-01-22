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
    if(!store.get('classArr')){
      store.set('classArr',this.classArr)
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
</style>
