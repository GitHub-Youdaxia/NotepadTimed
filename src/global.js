export default{
  install (Vue, options) {
    // $(window).on('scroll', function () {
    //   if ($(this).scrollTop() > 150) {
    //     $('.main-header').addClass('fixed')
    //   } else {
    //     $('.main-header').addClass('fixed')
    //   }
    // })
    // 设置 main-content的高度=页面高度-main-header的高度
    // var mainContentHeight = $(window).height()-$('.main-header').height()
    // console.log(mainContentHeight)
    // $('.main-content').height(mainContentHeight)
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
    Vue.prototype.openWin = function (content, time) {
      // white-space: pre-wrap; word-break: break-all;word-wrap: break-word;
      var width = 600
      var height = 365
      var positionLeft = window.screen.width * 1 - width
      var positionHeight = window.screen.height * 1 - height
      var positionTop = 0
      var cssStr = 'html,body{height:100%;overflow-x:hidden;overflow-y:auto;paddding-bottom:100px;background:#3cb371;color:#FFF;}'
      cssStr += '/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/::-webkit-scrollbar{width: 8px;height: 8px;background-color: #3cb371;}/*定义滚动条轨道 内阴影+圆角*/::-webkit-scrollbar-track   {-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);border-radius: 10px;  background-color: #F5F5F5;   }  /*定义滑块 内阴影+圆角*/   ::-webkit-scrollbar-thumb  {   border-radius: 10px;   -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);   background-color: #555; }  '
      cssStr += 'html ::-webkit-scrollbar {display:none} #xmp ::-webkit-scrollbar {display:block}'
      var myWindow = window.open('', '_blank', 'width=' + width + ',height=' + height + '')
      myWindow.moveTo(positionLeft, positionHeight)
      myWindow.focus()
      myWindow.setTimeout(function () {
        myWindow.showModalDialog(myWindow.location.href, 'dialogWidth=100px;dialogHeight=100px')
      }, time)
      $(myWindow.document.body).attr('scrolling', 'no')
      $(myWindow.document.body).append('<style>' + cssStr + '</style>')
      var jsStr = 'window.setTimeout(function(){ window.close(); },10000)'
      $(myWindow.document.body).append('<div id="xmp" style="display:block;min-height:100%;padding:10px 10px 100px 10px;height:100%;">' + content + '</div>')
      // console.log(content)
      // window.showModalDialog('',content)
    }
    // 暂时没有用到
    Vue.prototype.openWinCarousel = function (content, time) {
      // white-space: pre-wrap; word-break: break-all;word-wrap: break-word;
      var width = 600
      var height = 365
      var positionLeft = window.screen.width * 1 - width
      var positionHeight = window.screen.height * 1 - height
      var positionTop = 0
      var cssStr = 'html,body{height:100%;overflow-x:hidden;overflow-y:auto;paddding-bottom:100px;background:#3cb371;color:#FFF;}'
      cssStr += '/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/::-webkit-scrollbar{width: 8px;height: 8px;background-color: #3cb371;}/*定义滚动条轨道 内阴影+圆角*/::-webkit-scrollbar-track   {-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);border-radius: 10px;  background-color: #F5F5F5;   }  /*定义滑块 内阴影+圆角*/   ::-webkit-scrollbar-thumb  {   border-radius: 10px;   -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);   background-color: #555; }  '
      cssStr += 'html ::-webkit-scrollbar {display:none} #xmp ::-webkit-scrollbar {display:block}'
      var myWindow = window.open('', '_blank', 'width=' + width + ',height=' + height + '')
      myWindow.moveTo(positionLeft, positionHeight)
      myWindow.focus()
      $(myWindow.document.body).attr('scrolling', 'no')
      $(myWindow.document.body).append('<style>' + cssStr + '</style>')
      var jsStr = 'window.setTimeout(function(){ window.close(); },10000)'
      $(myWindow.document.body).append('<div id="xmp" style="display:block;min-height:100%;padding:10px 10px 100px 10px;height:100%;">' + content + '</div>')
      myWindow.showModalDialog(myWindow.location.href, 'dialogWidth=200px;dialogHeight=100px')
      // console.log(content)
      // window.showModalDialog('',content)
    }
    Vue.prototype.copyToClipboard = function (elem) {
      var targetId = '_hiddenCopyText_'
      var isInput = elem.tagName === 'INPUT' || elem.tagName === 'TEXTAREA'
      var origSelectionStart, origSelectionEnd
      var target
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
      [
        {
          'value': 'default',
          'label': 'default'
        },
        {
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
        }
      ]
  }

}
