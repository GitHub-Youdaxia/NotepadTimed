<template>
  <div class='add'>
    <quill-editor v-model='content' ref='quillEditorA' :options='editorOption' @blur='onEditorBlur($event)' @focus='onEditorFocus($event)' @ready='onEditorReady($event)'>
    </quill-editor>
    <div class="add-bottom">
      <el-select v-model="value" placeholder="请选择添加分类">
        <el-option
          v-for="item in classArr"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button @click='addInfo' title='默认添加到default分类' type="primary">添加</el-button>
      <div></div>
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
      value: '',
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

    },
    onEditorBlur (editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus (editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady (editor) {
      console.log('editor ready!', editor)
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.add-bottom{
  margin-top:6px;
  margin-bottom:6px;
}
</style>
