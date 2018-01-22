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
    Vue.prototype.classArr =
      [{
        'value': 'css1',
        'label': 'css1'
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
