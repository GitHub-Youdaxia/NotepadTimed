<template>
  <div class='add'>
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <quill-editor v-model='content' ref='quillEditorA' :options='editorOption' @blur='onEditorBlur($event)' @focus='onEditorFocus($event)' @ready='onEditorReady($event)'>
    </quill-editor>
  </div>
</template>

<script>
import classArr from '../../class'
console.log(classArr)
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      content: 'Welcome to Your Vue.js App',
      options: classArr.class,
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
  h1,
  h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
