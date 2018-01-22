<template>
  <div class='main'>
    <quill-editor v-model='content' ref='quillEditorA' :options='editorOption' @blur='onEditorBlur($event)' @focus='onEditorFocus($event)' @ready='onEditorReady($event)'>
    </quill-editor>
    <div class="add">
      <el-select v-model="selectClass" placeholder="请选择添加分类">
        <el-option
          v-for="item in classArr"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button @click='addInfo' title='默认添加到default分类' type="primary">添加</el-button>
      <div class="content-list">
        
      </div>
    </div>
  </div>
</template>

<script>
var store = require('storejs')
export default {
  name: 'HelloWorld',
  data () {
    return {
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
  methods: {
    addInfo () {
      // this.log(' this.selectClass',typeof this.selectClass);
      if(this.selectClass.length==0){
        //没有选择分类，则添加到default分类
        this.selectClass='default';
        this.save( this.selectClass)
      }else{
        this.save(this.selectClass)
      }
      //重新渲染页面
      this.refresh(this.selectClass)
    },
    refresh (selectClass){
      this.log('显示选中分类的数据',store.get(selectClass))
    },
    save (className){
        var data=store.get(className);
        data.push(this.content)
        store.set(className,data)
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
</style>
