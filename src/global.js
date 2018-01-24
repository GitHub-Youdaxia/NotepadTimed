export default{
  install (Vue, options) {
    Vue.prototype.log = function () {
      var args = Array.prototype.slice.apply(arguments)
      if (args.length === 1) {
        console.log(args[0])
        return
      }
      if (args.length === 2) {
        console.log('%c' + '// ' + args[0], 'color:#7B9B99;')
        console.log(args[1])
      }
      if (args.length === 3) {
        console.log('%c' + '// ' + args[0], 'color:#7B9B99;')
        console.log(JSON.stringify(args[1]))
      }
    }
    Vue.prototype.copyToClipboard = function (elem) {
      var targetId = '_hiddenCopyText_'
      var isInput = elem.tagName === 'INPUT' || elem.tagName === 'TEXTAREA'
      var origSelectionStart, origSelectionEnd
      if (isInput) {
        // 如果是input标签或textarea，则直接指定该节点
        target = elem
        origSelectionStart = elem.selectionStart
        origSelectionEnd = elem.selectionEnd
      } else {
        // 如果不是，则使用节点的textContent
        target = document.getElementById(targetId)
        if (!target) {
          // 如果不存在，则创建一个
          var target = document.createElement('textarea')
          target.style.position = 'absolute'
          target.style.left = '-9999px'
          target.style.top = '0'
          target.id = targetId
          document.body.appendChild(target)
        }
        target.textContent = elem.textContent
      }
      // 聚焦目标节点，选中它的内容
      var currentFocus = document.activeElement
      target.focus()
      target.setSelectionRange(0, target.value.length)

      // 进行复制操作
      var succeed
      try {
        succeed = document.execCommand('copy')
      } catch (e) {
        succeed = false
      }
      // 不再聚焦
      if (currentFocus && typeof currentFocus.focus === 'function') {
        currentFocus.focus()
      }

      if (isInput) {
        // 清空临时数据
        elem.setSelectionRange(origSelectionStart, origSelectionEnd)
      } else {
        // 清空临时数据
        target.textContent = ''
      }
      return succeed
    }
    Vue.prototype.classArr =
      [{
        'value': 'css',
        'label': 'css'
      }, {
        'value': 'js',
        'label': 'js'
      }, {
        'value': 'jquery',
        'label': 'jquery'
      }, {
        'value': 'vue',
        'label': 'vue'
      }, {
        'value': 'react',
        'label': 'react'
      },
      {
        'value': 'php',
        'label': 'php'
      },
      {
        'value': 'mysql',
        'label': 'mysql'
      },
      {
        'value': 'default',
        'label': 'default'
      }
      ]
  }

}
