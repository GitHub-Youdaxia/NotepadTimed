## notepadtimed 定时提醒
## 开发依赖包
  "dependencies": {
    "element-ui": "^2.0.11",
    "jquery": "^3.3.1",
    "storejs": "^1.0.16",
    "vue": "^2.5.2",
    "vue-clipboard2": "^0.0.8",
    "vue-quill-editor": "^3.0.4",
    "vue-resource": "^1.3.5",
    "vue-router": "^3.0.1"
  },
## 功能介绍
### 添加
富文本编辑后的信息，修改同样使用富文本编辑器。添加时可以选择信息的分类。
### 删除
 可以单条删除，也可以删除所有当前选中分类下的信息
### 提醒
 每条信息都用自己的定时器，时间选择默认是0.001，步数是0.5,可选择提醒一次和多次提醒，多次提醒需要手动取消。
### 开关闭轮播
 所有分类下的信息以轮播的方法展示。
### 分类管理
 查看分类的详细信息，添加，修改，删除分类。

##安装运行
``` bash
# install dependencies
cnpm install

# serve with hot reload at localhost:8080
cnpm run dev

# build for production with minification
cnpm run build

# build for production and view the bundle analyzer report
cnpm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
