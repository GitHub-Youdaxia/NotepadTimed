<template>
  <div class='main' >
    <div class="main-header">
    <div class="add">
        <el-button-group >
          <el-select size='medium'  @change='classChange' v-model="selectClass" placeholder="请选择添加分类">
            <el-option
              v-for="item in classArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>            
      </el-button-group>      
        <el-button-group >         
        <el-button size='medium' id="addBtn"  @click='addInfo' title='快键键：ctrl+enter' type="primary">添加</el-button>
        <el-button size='medium' v-clipboard:copy="copyCurrenClassAll()" v-clipboard:success="onCopy" v-clipboard:error="onCopyError"  title='复制当前选择分类的所有信息' type="primary">复制全部</el-button>
        <el-button size='medium' @click='deleteCurrenClassAll' title='删除当前选择分类的所有信息' type="primary">删除全部</el-button>
        <el-button size='medium' id="startCarousel" @click='startCarousel' title='开启每个分类所有信息轮播,shift+r' type="primary">开启轮播</el-button>
        <el-button size='medium' id="endCarousel" @click='endCarousel' title='关闭每个分类所有信息轮播,shift+e' type="primary">关闭轮播</el-button>
      </el-button-group>
            <el-button-group style="float:right;margin-right:10px;" >
                    <el-button size='medium' @click='classManagement' title='分类管理'  type="primary">分类管理</el-button>
              
            </el-button-group>
       <el-button-group title="本地存储空间使用百分比">
         <div class="progress">
           <el-progress :percentage='percentage'></el-progress>       
         </div>  
       </el-button-group >         
    </div>      
    <quill-editor class="add-editor" v-model='content' ref='quillEditorA' :options='editorOption' @blur='onEditorBlur($event)' @focus='onEditorFocus($event)' @ready='onEditorReady($event)'>
    </quill-editor>

    </div>
      <div class="main-content">
        <el-tabs v-model="editableTabsValue" type="border-card" @tab-click='tabChange' class="main-content-tab">
          <el-tab-pane
            :key="item.name"
            v-for="(item,classIndex) in editableTabs"
            :label="item.title"
            :name="item.name"
          >
            <el-carousel ref=carousel :interval="10000" trigger="click" class="info-carousel" style="display:none" height="500px">
              <el-carousel-item v-for="(o,infoIndex) in item.content" :key="infoIndex">
                <div v-html="o"></div>
              </el-carousel-item>
            </el-carousel>
            <div class="info-list">
              <div v-for="(o,infoIndex) in item.content" :key="infoIndex" >
                <el-card class="box-card" :body-style="{ paddingLeft: '30px',paddingRight: '30px',paddingTop: '0',paddingBottom: '0' }">
                  <div slot="header" class="clearfix">
                    <span class="item-num"><el-tag type="info" color="#409EFF" size="mini">{{infoIndex+1}}</el-tag></span>
                    <div class="item-header-right">
                      <el-button-group>
                        提醒间隔:
                        <el-input-number v-model="hourArr[classIndex][infoIndex]" style="width:90px" controls-position="right" :min="0.001" :max="10" size="mini" :step="0.5" ></el-input-number>
                        小时                  
                      </el-button-group>
                      <el-button-group>
                        <el-button class="start" title='提醒一次' size="mini" :disabled=btn  type="primary" icon="" @click="start(classIndex,infoIndex,1,$event)">一次</el-button>
                        <el-button class="start" title='提醒多次' size="mini" :disabled=btn  type="primary" icon="" @click="start(classIndex,infoIndex,0,$event)">多次</el-button>
                        <el-button class='cancel' title='取消提醒' size="mini"  type="primary" icon="" @click="cancel(classIndex,infoIndex,$event)">取消</el-button>
                      </el-button-group>
                      <el-button-group>
                      <el-button title='删除' size="mini"  type="danger"  icon="el-icon-delete" @click="remove(classIndex,infoIndex)"></el-button>
                      <el-button title='编辑'  size="mini"  type="primary" icon="el-icon-edit" @click="showEditDialog(classIndex,infoIndex)"></el-button>
                      <el-button title='复制'  size="mini"  type="primary" icon="el-icon-share" v-clipboard:copy="share(classIndex,infoIndex)" v-clipboard:success="onCopy" v-clipboard:error="onCopyError" ></el-button>
                      </el-button-group>
                    </div>
                  </div>                  
                  <div class="info" v-html="o"></div>
                </el-card>            
              </div>
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
      <!-- 分类管理对话框 -->
    <el-dialog title="分类管理" :visible.sync="dialogTableVisible"  height="150" center
    border>
    <div class="ele-center">
      <el-form  :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-form-inline">
        <el-form-item label="分类名称" prop="className">
          <el-input size="mini" v-model="ruleForm.className" placeholder="填写分类名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="onSubmit">添加</el-button>
        </el-form-item>
      </el-form>    
      <el-table :data="gridData" height="500">
        <el-table-column property="value" label="类名" width="150"></el-table-column>
        <el-table-column property="num" label="信息数量" width="150"></el-table-column>
        <el-table-column
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="editRow(scope.$index, gridData)"
              type="plain"
              size="mini">
              修改类名
            </el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, gridData)"
              type="danger"
              size="mini">
              移除分类
            </el-button>
          </template>
        </el-table-column>        
      </el-table>
      </div>
    <!-- 内层修改类名dialog -->
    <el-dialog
      width="30%"
      title="修改类名"
      :visible.sync="innerVisible"
      append-to-body>
        <el-form :inline="true" :model="editClassName" :rules="rules2" ref="editClassName" class="demo-form-inline">
          <el-form-item label="分类名称" prop="className">
            <el-input size="mini" autofocus select v-model="editClassName.className" placeholder="填写分类名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button  size="mini" type="primary" @click="onEditClassName">修改</el-button>
          </el-form-item>
        </el-form>    
    </el-dialog>      
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
import hljs from 'highlight.js'
// import aaa from './aaa'
var store = require('storejs')
export default {
  name: 'add',
  data () {
    return {
      innerVisible:false,
      editClassName:'',
      editClassNameIndex:'',
      rules2: {
        className: [
          { required: true, message: '请输分类名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },      
      editClassName:{
        className: '',
      },
      rules: {
        className: [
          { required: true, message: '请输分类名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },      
      ruleForm:{
        className: '',
      },
      dialogTableVisible:false,
      btn:false,
      hourArr:[],
      timerArr:[],
      classIndex:'',
      infoIndex:'',
      dialogVisible: false,
      percentage:0,
      editableTabsValue: '0',
      content: '',
      editContent:'',
      classArr: store.get('classArr')?store.get('classArr'):[],
      selectClass: store.get('classArr')?store.get('classArr')[0].value:[],
      editorOption: {
        theme: 'snow',
        placeholder: '输入任何内容，支持html',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{
              list: 'ordered'
            }, {
              list: 'bullet'
            }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
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
            ['clean'],
            ['link', 'image', 'video']
          ],
            syntax: {
              highlight: text => hljs.highlightAuto(text).value
            }
        }
      }
    }
  },
  // components:{
  //   'aaa':aaa
  // },
  created:function(){

   this.getHourArr()
   this.getTimerArr()

  },
  mounted:function(){

    var self=this
    store.onStorage(function(key,val){
      self.getPercentage()
  })
    //设置内容高度
    self.resetView()
    $(document).keydown(function (e) {

        if (e.ctrlKey && e.which == 10) {
          document.getElementById("addBtn").click();
        }
        if (e.shiftKey && e.which == 82) {
          document.getElementById("startCarousel").click();
        }
        if (e.shiftKey && e.which == 69) {
          document.getElementById("endCarousel").click();
        }

    })
    console.log(self.$refs)
    var classLength=self.editableTabs.length
    $(document).keydown(function (e) {
        if (event.keyCode==38){
          if(self.$refs.carousel[self.getIndexByClassName(self.selectClass)]){
            self.$refs.carousel[self.getIndexByClassName(self.selectClass)].prev()
          }
      }
      if (event.keyCode==40){
        if(self.$refs.carousel[self.getIndexByClassName(self.selectClass)]){
        self.$refs.carousel[self.getIndexByClassName(self.selectClass)].next()
        }
      }
      if (event.keyCode==39){
        var nextClassIndex=self.editableTabsValue*1+1+''
         if(nextClassIndex>classLength-1){
          nextClassIndex='0'
        }
        self.editableTabsValue=nextClassIndex
        self.selectClass=self.getClassNameByIndex(nextClassIndex)

      }
      if (event.keyCode==37){
        var nextClassIndex=self.editableTabsValue*1-1+''
         if(nextClassIndex<0){
          nextClassIndex=classLength-1+''
        }
        self.editableTabsValue=nextClassIndex
        self.selectClass=self.getClassNameByIndex(nextClassIndex)

      }
    })
    $(document).keyup(function (e) {
        if (e.ctrlKey && e.which == 13) {
          document.getElementById("addBtn").click();
        }
    })
  $(window).resize(function(){
       self.resetView() 
  });    
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
    },
    gridData:function(){
      var classArrLen=this.classArr.length
      for(var i=0;i<classArrLen;i++){
        if(store.get(this.getClassNameByIndex(i))){
          this.classArr[i]['num']=store.get(this.getClassNameByIndex(i)).length
        }
      }
      return  this.classArr
    }
  },
  methods: {
    resetView(){
       // 设置 main-content的高度=页面高度-main-header的高度
    var mainContentHeight = $(window).height()-$('.main-header').height()
    $(".el-tabs__content").height(mainContentHeight-100)
    $(".el-carousel__container").height(mainContentHeight-100) 
    },
    getGridData(){
      var classArrLen=this.classArr.length
      for(var i=0;i<classArrLen;i++){
        if(store.get(this.getClassNameByIndex(i))){
          this.classArr[i]['num']=store.get(this.getClassNameByIndex(i)).length
        }
      }
      return  this.classArr      
    },
    onEditClassName(){
      var newClassName= this.editClassName.className
      var len=this.classArr.length 
      var flag=false     
      for(var i=0;i<len;i++){
        if(this.classArr[i].value==newClassName){
          flag=true
          break
        }
      }
      if(flag){
        this.$notify({
          message: '修改失败！已存在分类"'+newClassName+'"不能重复添加',
          type: 'warning',
          duration:2000
        });        
        return false
      } 
      var editIndex=this.editClassNameIndex
      var oldClassName=this.getClassNameByIndex(editIndex)
      var oldData=store.get(oldClassName)
      store.remove(oldClassName)
      store.set(newClassName,oldData?oldData:[])
      this.classArr[editIndex].value=newClassName
      this.classArr[editIndex].label=newClassName

      store.set('classArr',this.classArr)
      this.gridData[editIndex].value=newClassName
      // var classArrLen=this.classArr.length
      // for(var i=0;i<classArrLen;i++){
      //   if(store.get(this.getClassNameByIndex(i))){
      //     this.classArr[i]['num']=store.get(this.getClassNameByIndex(i)).length
      //   }
      // }
      // this.gridData=this.classArr
      // this.hourArr.push([])
      // this.timerArr.push([]) 

      this.$notify({
          message: '分类修改成功',
          type: 'success',
          duration:2000
        }); 
      this.innerVisible=false           
    },
    onSubmit(){
      var className=this.ruleForm.className
      this.ruleForm.className=''
      var len=this.classArr.length 
      var flag=false     
      for(var i=0;i<len;i++){
        if(this.classArr[i].value==className){
          flag=true
          break
        }
      }
      if(flag){
        this.$notify({
          message: '添加失败！已存在分类"'+className+'"不能重复添加',
          type: 'warning',
          duration:2000
        });        
        return false
      }
      store.set(className,[])
      this.classArr.push({
        'value':className,
        'label':className
      })
      store.set('classArr',this.classArr)
      this.hourArr.push([])
      this.timerArr.push([])
      // this.editableTabs.push({
      //       title: this.classArr[len].value,
      //       name: len+'',
      //       content: []
      //     })
      this.$notify({
          message: '分类添加成功',
          type: 'success',
          duration:2000
        });  
    },
    editRow(index, rows) {
      this.innerVisible=true;
      this.editClassNameIndex=index
      this.editClassName.className=this.classArr[index].value
    },   
    deleteRow(index, rows) {

        this.$confirm('确定删除分类"'+this.getClassNameByIndex(index)+'"?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          duration:2000
        }).then(() => {
            var className=this.getClassNameByIndex(index)
            store.remove(className);
            this.editableTabs.splice(index,1)        
            this.hourArr.splice(index,1)
            this.timerArr.splice(index,1)
            rows.splice(index, 1);
            this.classArr.splice(index, 1);
            store.set('classArr',this.classArr)
        }).catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消删除'
          });          
        });


    },   
    copyCurrenClassAll: function(){
      var data=store.get(this.selectClass)
      if(data){
        if(data.length==0){
          // this.$notify({
          //   message: '分类"'+this.selectClass+'"数据是空的',
          //   type: 'warning',
          //duration:2000
          // });               
          return
        }
        var dataStr=data.join('/n')
        var dataLen=data.length
        var str=''
        for(var i=0;i<dataLen;i++){
          str+="\n"+data[i].replace(/<[^>]+>/g,"")+"\n"
        }
        return str
      }

    },
    deleteCurrenClassAll: function(){
        if(store.get(this.selectClass).length==0){
            this.$notify({
              type: 'info',
              message: '分类："'+this.selectClass+'"数据是空的'
            });      
            return 
        }
        this.$confirm('确定删除分类"'+this.selectClass+'"的所有信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        store.set(this.selectClass,[])
        this.refresh(this.selectClass)
        var classIndex=this.getIndexByClassName(this.selectClass)
        this.hourArr[classIndex]=[]
        this.timerArr[classIndex]=[]
                  
          this.$notify({
            type: 'success',
            duration:2000,
            message: '删除成功!'
          });
        }).catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    startCarousel: function(){
        // if(store.get(this.selectClass).length==0){
        //     this.$notify({
        //       type: 'info',
        //       message: '分类："'+this.selectClass+'"数据是空的'
        //     });      
        //     return 
        // }      
      $('.info-carousel').each(function(){
        $(this).show()
      })
      // $('.add-editor').hide()
      $('.info-list').each(function(){
        $(this).hide()
      })
    },
    endCarousel: function(){
      // $('.add-editor').show()

      $('.info-carousel').each(function(){
        $(this).hide()
      })
      $('.info-list').each(function(){
        $(this).show()
      })
    },
    classManagement: function(){
      this.dialogTableVisible=true
      this.gridData=this.getGridData()

    },
    getTimerArr: function(){
      var arr=[]
        var len=this.classArr.length
        for(var i=0;i<len;i++){
          var arr2=[]
          var classData=store.get(this.getClassNameByIndex(i))
          if(classData){
            var len2=classData.length
            for(var j=0;j<len2;j++){
              arr2[j]=''
            }
            arr.push(arr2)
          }

        }
        this.timerArr= arr    
    },
    getHourArr: function(){
      var arr=[]
        var len=this.classArr.length
        for(var i=0;i<len;i++){
          var arr2=[]
          var classData=store.get(this.getClassNameByIndex(i))
          if(classData){
            var len2=classData.length
            for(var j=0;j<len2;j++){
              arr2[j]=''
            }
            arr.push(arr2)
          }

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
         self.openWin(info)
        },time*60*60*1000)
      }else{
        this.timerArr[classIndex][infoIndex]=setTimeout(function(){
           self.openWin(info,time*60*60*1000)
         $(event.target).parents('.el-button-group').find('.cancel').each(function(){
          $(this).click()
        })          
        },time*60*60*1000)      
      }

    },
    cancel: function(classIndex,infoIndex,event){

      clearTimeout(this.timerArr[classIndex][infoIndex])
      clearInterval(this.timerArr[classIndex][infoIndex])
      console.log('清除定时')      
      // this.btn=false
      if (event) {
        $(event.target).parents('.el-button-group').find('.start').each(function(){
          $(this).removeClass('is-disabled').attr('disabled',false)
        })
      }      

    },
    getInfo:function(classIndex,infoIndex){
      var className=this.getClassNameByIndex(classIndex)
      var info=store.get(className)[infoIndex]
      return info
    },
    onCopy : function(){
          this.$notify({
          message: '消息复制成功',
          type: 'success',
          duration:2000
        });  
    },
    onCopyError : function(){
          this.$notify({
          message: '消息复制失败',
          type: 'warning',
          duration:2000
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
        this.$notify({
          message: '消息不能为空',
          type: 'warning',
          duration:2000
        });
        return
      }
      if(this.selectClass.length==0){
        //没有选择分类，则添加到default分类
        this.selectClass='default';
        this.save(this.selectClass)
      }else{
        this.save(this.selectClass)
      }
      this.$notify({
        message: '消息添加成功',
        type: 'success',
        duration:2000
      });
      //重新渲染页面
      this.refresh(this.selectClass)

      this.$http.post('/api/user/addUser', {
            username: 'name',
            age: 11
          },{}).then((response) => {
            console.log(response);
          })      
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
        this.editableTabsValue=''
        this.editableTabsValue=this.classIndex+''   
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
        
        this.$notify({
          type: 'success',
          duration:2000,
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
          type: 'warning',
          duration:2000
        }).then(() => {
         // 先清除定时

        this.cancel(classIndex,infoIndex) 
  
        var className=this.getClassNameByIndex(classIndex)
        var currentData=store.get(className)
        currentData.splice(infoIndex, 1);
        store.remove(className);
        store.set(className,currentData)
        this.refresh(className)
        this.hourArr[classIndex].splice(infoIndex, 1);
        this.timerArr[classIndex].splice(infoIndex, 1);

        this.getPercentage()
           this.log('已删除定时返回数'); 
        this.$notify({
            type: 'success',
            duration:2000,
            message: '删除成功!'
          });
        }).catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消删除'
          });          
        });


    },
    share(classIndex,infoIndex){
      var className=this.getClassNameByIndex(classIndex)
      var currentData=store.get(className)
      if(currentData[infoIndex]>0){
       return currentData[infoIndex].replace(/<[^>]+>/g,"") 
      }
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
.item-header-right{float: right;font-size: 14px;color: #909399}
.item-num span{color: #FFF}
  .el-carousel__item{color:#FFF;padding: 25px;box-sizing: border-box}
  .el-carousel__item:nth-child(2n) {
    background-color: #46485f;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #3cb371;
  }
  .el-carousel__item:nth-child(3n+1) {
    background-color: #008792;
  }
  .el-carousel__item:nth-child(4n+1) {
    background-color: #33a3dc;
  }
  .ele-center{margin: 0 auto;width: 90%;}
/* .quill-editor {
  max-height:500px;
}  
 .quill-editor .ql-container {
   overflow: auto;
  } */

</style>
