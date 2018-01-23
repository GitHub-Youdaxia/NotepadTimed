<template>
  <div class='main'>
    <quill-editor v-model='content' ref='quillEditorA' :options='editorOption' @blur='onEditorBlur($event)' @focus='onEditorFocus($event)' @ready='onEditorReady($event)'>
    </quill-editor>
    <div class="add">
      <el-select @change='classChange' v-model="selectClass" placeholder="请选择添加分类">
        <el-option
          v-for="item in classArr"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button @click='addInfo' title='默认添加到default分类' type="primary">添加</el-button>
      <div class="progress" title="本地存储空间使用百分比">
        <el-progress :percentage='percentage'></el-progress></div>
    </div>
      <div class="content-list">
        <el-tabs v-model="editableTabsValue" type="border-card" @tab-click='tabChange'>
          <el-tab-pane
            :key="item.name"
            v-for="(item,classIndex) in editableTabs"
            :label="item.title"
            :name="item.name"
          >
              <div v-for="(o,infoIndex) in item.content" :key="infoIndex" >
                <el-card class="box-card" :body-style="{ paddingLeft: '30px',paddingRight: '30px',paddingTop: '0',paddingBottom: '0' }">
                  <div slot="header" class="clearfix">
                    <span class="item-num">{{infoIndex+1}}</span>
                    <div class="item-header-right">
                      <el-button-group>
                      <el-button size="mini" plain icon="el-icon-delete" @click="remove(classIndex,infoIndex)"></el-button>
                      <el-button size="mini" plain icon="el-icon-edit" @click="edit(classIndex,infoIndex)"></el-button>
                      <el-button size="mini" plain icon="el-icon-share" @click="share(classIndex,infoIndex)"></el-button>
                      </el-button-group>
                    </div>
                  </div>                  
                  <div class="info" v-html="o"></div>
                </el-card>            
              </div>
          </el-tab-pane>
        </el-tabs>   
      </div>    
  </div>
</template>

<script>
var store = require('storejs')
export default {
  name: 'add',
  data () {
    return {
      percentage:0,
      editableTabsValue: '7',
      content: '',
      classArr: store.get('classArr')?store.get('classArr'):[],
      selectClass: '',
      editorOption: {
        theme: 'snow',
        placeholder: '输入任何内容，支持html',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{
              list: 'ordered'
            }, {
              list: 'bullet'
            }],
            [{
              header: [1, 2, 3, 4, 5, 6, false]
            }],
            [{
              color: []
            }, {
              background: []
            }],
            [{
              font: []
            }],
            [{
              align: ['']
            }],
            ['clean']
          ]
        }
      }
    }
  },
  created:function(){
   this.getPercentage()
  },
  computed: {
    editableTabs:function(){
      var arr=[]
      var len=this.classArr.length
      for(var i=0;i<len;i++){
        arr.push({
            title: this.classArr[i].value,
            name: i+'',
            content: store.get(this.classArr[i].value)
          });        
      }
      return arr
    }
  },
  methods: {
    tabChange : function(){
       var index=this.editableTabsValue;
       var className=this.getClassNameByIndex(index)
       this.selectClass=className+''     
    },    
    classChange (){
      var index=this.getIndexBySelectClass(this.selectClass)
      this.editableTabsValue=index+''
    },
    getPercentage (){
      this.percentage= ((JSON.stringify(localStorage).length/5000000)*100).toFixed(4)*1
    },
    addInfo () {
      // this.log(' this.selectClass',typeof this.selectClass);
      if(this.content.length==0){
        this.$message({
          message: '消息不能为空',
          type: 'warning'
        });
        return
      }
      if(this.selectClass.length==0){
        //没有选择分类，则添加到default分类
        this.selectClass='default';
        this.save( this.selectClass)
      }else{
        this.save(this.selectClass)
      }
      this.$message({
        message: '消息添加成功',
        type: 'success'
      });
      //重新渲染页面
      this.refresh(this.selectClass)
    },
    refresh (selectClass){
       this.log('selectClass',selectClass)
      var index=this.getIndexBySelectClass(selectClass);
      this.editableTabs[index].content=store.get(selectClass);
      this.log(' this.editableTabs[index].content',this.editableTabs[index].content);
      //不这样设置两次，删除的时候不自动刷新分类数据
      this.editableTabsValue=''
      this.editableTabsValue=index+''
      this.log('selectClass',selectClass)

      //
    },
    getIndexBySelectClass (selectClass){
      var arr=[]
      var len=this.classArr.length
      var index
      for(var i=0;i<len;i++){
        if(this.classArr[i].value===selectClass){
          index=i;
        }       
      }
      return index      
    },
    getClassNameByIndex (index){
      return this.classArr[index].value      
    },
    save (className){
        var data=store.get(className);
        data.push(this.content)
        store.set(className,data)
        this.content=''
        this.getPercentage()
    },
    edit(classIndex,infoIndex){
      this.log(' classIndex',classIndex);
      this.log(' infoIndex',infoIndex);
    },
    remove(classIndex,infoIndex){

      var className=this.getClassNameByIndex(classIndex)
      var currentData=store.get(className)
      currentData.splice(infoIndex, 1);
      store.set(className,currentData)
      this.refresh(className)
      this.getPercentage()
    },
    share(classIndex,infoIndex){
      this.log(' classIndex',classIndex);
      this.log(' infoIndex',infoIndex);
    },
    onEditorBlur (editor) {
      // console.log('editor blur!', editor)
    },
    onEditorFocus (editor) {
      // console.log('editor focus!', editor)
    },
    onEditorReady (editor) {
      // console.log('editor ready!', editor)
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.add{
  margin-top:6px;
  margin-bottom:6px;
}
.info{
  word-wrap: break-word;
  line-height: 30px;
}

.progress{display: inline-block;width: 150px;}
.item-header-right{float: right;}
.item-num{line-height: 28px;}
</style>
