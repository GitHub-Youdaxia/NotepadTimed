<template>
  <div class='main'>
    <div class="main-header">
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
    </div>
      <div class="main-content">
        <el-tabs v-model="editableTabsValue" type="border-card" @tab-click='tabChange' class="main-content-tab">
          <el-tab-pane
            :key="item.name"
            v-for="(item,classIndex) in editableTabs"
            :label="item.title"
            :name="item.name"
          >
              <div v-for="(o,infoIndex) in item.content" :key="infoIndex" >
                <el-card class="box-card" :body-style="{ paddingLeft: '30px',paddingRight: '30px',paddingTop: '0',paddingBottom: '0' }">
                  <div slot="header" class="clearfix">
                    <span class="item-num"><el-tag size="mini">{{infoIndex+1}}</el-tag></span>
                    <div class="item-header-right">
                      <el-button-group>
                        提醒间隔:
                        <el-input-number v-model="hourArr[classIndex][infoIndex]" style="width:90px" controls-position="right" :min="0.001" :max="10" size="mini" :step="0.5" ></el-input-number>
                        小时                  
                      </el-button-group>
                      <el-button-group>
                        <el-button class="start" title='提醒一次' size="mini" :disabled=btn plain icon="" @click="start(classIndex,infoIndex,1,$event)">一次</el-button>
                        <el-button class="start" title='提醒多次' size="mini" :disabled=btn plain icon="" @click="start(classIndex,infoIndex,0,$event)">多次</el-button>
                        <el-button class='cancel' title='取消提醒' size="mini" plain icon="" @click="cancel(classIndex,infoIndex,$event)">取消</el-button>
                      </el-button-group>
                      <el-button-group>
                      <el-button title='删除' size="mini" plain icon="el-icon-delete" @click="remove(classIndex,infoIndex)"></el-button>
                      <el-button title='编辑'  size="mini" plain icon="el-icon-edit" @click="showEditDialog(classIndex,infoIndex)"></el-button>
                      <el-button title='复制'  size="mini" plain icon="el-icon-share" v-clipboard:copy="share(classIndex,infoIndex)" v-clipboard:success="onCopy" v-clipboard:error="onCopyError" ></el-button>
                      </el-button-group>
                    </div>
                  </div>                  
                  <div class="info" v-html="o"></div>
                </el-card>            
              </div>
          </el-tab-pane>
        </el-tabs>   
      </div>
      <!-- 修改信息对话框     -->
      <el-dialog
        title="修改信息"
        :visible.sync="dialogVisible"
        width="80%"
        :before-close="handleClose" center>
    <quill-editor v-model='editContent' ref='editQuillEditor' :options='editorOption'>
    </quill-editor>        
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="edit">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
//添加的纯数字信息过长时，使用该方法显示信息不换行
      // this.timerArr[classIndex][infoIndex]=setTimeout(function(){
      //       self.$notify.info({
      //       title: '消息',
      //       dangerouslyUseHTMLString: true,
      //       message:info,
      //       offset: 100,
      //       duration: 0
      //     });
      //   },time*60*60*1000)
//固定顶部
//分类标注信息的个数
var store = require('storejs')
export default {
  name: 'add',
  data () {
    return {
      btn:false,
      hourArr:[],
      timerArr:[],
      classIndex:'',
      infoIndex:'',
      dialogVisible: false,
      percentage:0,
      editableTabsValue: '7',
      content: '',
      editContent:'',
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
   this.getHourArr()
   this.getTimerArr()

  },
  mounted:function(){
    // 设置 main-content的高度=页面高度-main-header的高度
    var mainContentHeight = $(window).height()-$('.main-header').height()
    console.log(mainContentHeight)
    $(".el-tabs__content").height(mainContentHeight-100)
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
    getTimerArr: function(){
      var arr=[]
        var len=this.classArr.length
        for(var i=0;i<len;i++){
          var arr2=[]
          var classData=store.get(this.getClassNameByIndex(i))
          var len2=classData.length
          for(var j=0;j<len2;j++){
            arr2[j]=''
          }
          arr.push(arr2)
        }
        this.timerArr= arr    
    },
    getHourArr: function(){
      var arr=[]
        var len=this.classArr.length
        for(var i=0;i<len;i++){
          var arr2=[]
          var classData=store.get(this.getClassNameByIndex(i))
          var len2=classData.length
          for(var j=0;j<len2;j++){
            arr2[j]=''
          }
          arr.push(arr2)
        }
        this.hourArr= arr    
    },
    start: function(classIndex,infoIndex,type,event){
      // $(event.target).text('启动中')
      // this.btn=true
      if (event) {
        $(event.target).parents('.el-button-group').find('.start').each(function(){
          $(this).addClass('is-disabled').attr('disabled',true)
        })
      }
      var time=this.hourArr[classIndex][infoIndex];
      var info=this.getInfo(classIndex,infoIndex);
      var self=this
      if(type==0){
      this.timerArr[classIndex][infoIndex]=setInterval(function(){
          console.log('ddd')
         self.openWin(info)
        },time*60*60*1000)
      }else{
        this.timerArr[classIndex][infoIndex]=setTimeout(function(){
           self.openWin(info)
         $(event.target).parents('.el-button-group').find('.cancel').each(function(){
          $(this).click()
        })          
        },time*60*60*1000)      
      }

    },
    cancel: function(classIndex,infoIndex,event){
      // this.btn=false
      if (event) {
        $(event.target).parents('.el-button-group').find('.start').each(function(){
          $(this).removeClass('is-disabled').attr('disabled',false)
        })
      }      
      clearTimeout(this.timerArr[classIndex][infoIndex])
      clearInterval(this.timerArr[classIndex][infoIndex])
    },
    getInfo:function(classIndex,infoIndex){
      var className=this.getClassNameByIndex(classIndex)
      var info=store.get(className)[infoIndex]
      return info
    },
    onCopy : function(){
          this.$message({
          message: '消息复制成功',
          type: 'success'
        });  
    },
    onCopyError : function(){
          this.$message({
          message: '消息复制失败',
          type: 'warning'
        });  
    },
    tabChange : function(){
       var index=this.editableTabsValue;
       var className=this.getClassNameByIndex(index)
       this.selectClass=className+''     
    },    
    classChange (){
      var index=this.getIndexByClassName(this.selectClass)
      this.editableTabsValue=index+''
    },
    getPercentage (){
      this.percentage= ((JSON.stringify(localStorage).length/5000000)*100).toFixed(4)*1
    },
    addInfo () {
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
      var index=this.getIndexByClassName(selectClass);
      this.editableTabs[index].content=store.get(selectClass);
      //不这样设置两次，删除的时候不自动刷新分类数据
      this.editableTabsValue=''
      this.editableTabsValue=index+''

      //
    },
    getIndexByClassName (selectClass){
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
        var classIndex=this.getIndexByClassName(className)
        this.hourArr[classIndex].push(0.001);
        this.timerArr[classIndex].push('');

    },
    edit (){
        var className=this.getClassNameByIndex(this.classIndex)
        var data=store.get(className)
        data[this.infoIndex]=this.editContent
        store.set(className,data)
        this.editableTabs[this.classIndex].content=data;        
        this.dialogVisible=false
        this.editableTabsValue=''
        this.editableTabsValue=this.classIndex+''        
        this.getPercentage()
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
    },
    showEditDialog(classIndex,infoIndex){
      this.dialogVisible=true

      this.editContent=this.getInfo(classIndex,infoIndex)
      this.classIndex=classIndex  
      this.infoIndex=infoIndex  
    },
    remove(classIndex,infoIndex){
        this.$confirm('确定删除此消息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

        var className=this.getClassNameByIndex(classIndex)
        var currentData=store.get(className)
        currentData.splice(infoIndex, 1);
        store.set(className,currentData)
        this.refresh(className)
        this.hourArr[classIndex].splice(infoIndex, 1);
        this.getPercentage()          
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });


    },
    share(classIndex,infoIndex){
      var className=this.getClassNameByIndex(classIndex)
      var currentData=store.get(className)
      var copyValue = currentData[infoIndex] 
      var reg = /[\u4e00-\u9fa5]/g;  
      var copyValues = copyValue.match(reg);
      return currentData[infoIndex].replace(/<[^>]+>/g,"") 
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
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
.item-header-right{float: right;font-size: 14px;}
.item-num{line-height: 28px;}
</style>
