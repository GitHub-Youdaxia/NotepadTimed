# notepadtimed
进度：
本地存储APIs

store(key, data);                 //单个存储字符串数据
store({key: data, key2: data2});  //批量存储多个字符串数据
store(key);               //获取key的字符串数据
store("?key");            //判断key是否存在
store();                  //获取所有key/data
//store(false);🔫         //（弃用）因为传入空值 或者报错很容易清空库
//store(key,false); 🔫    //（弃用）删除key包括key的字符串数据, 当val 为 0的时候无法存储...

store.set(key, data[, overwrite]);    //=== store(key, data);
store.set({key: data, key2: data2})   //=== store({key: data, key2: data});
//store.setAll({key: data});(弃用)🔫   //=== 保持简单 set方法可以实现
store.get(key[, alt]);                //=== store(key);
store.get("?key");                    //判断key是否存在
//store.getAll();(弃用)🔫              //=== store()和store.get()都可以实现获取所有数据
store.remove(key);                  //===store(key,false)
store.clear();                      //清空所有key/data
store.keys();                       //返回所有key的数组
store.forEach(callback);            //循环遍历，返回false结束遍历
store.search(string)                //搜索方法

store.has(key);         //⇒判断是否存在返回true/false          


//⇒ 提供callback方法处理数据
store("test",function(key,val){
    console.log(val)//这里处理 通过test获取的数据
    return [3,4,5]//返回数据并存储
})

store(["key","key2"],function(key){
    //获取多个key的数据处理，return 并保存；
    console.log("key:",key)
    return "逐个更改数据"
})

// 即创建/更新/删除数据项时，触发该事件
store.onStorage(function(key,val){
    console.log('onStorage:',key,val)
})
set

单个存储或删除字符串数据
store.set(key, data[, overwrite]);
效果相同store(key, data);

store.set("wcj","1")   //⇒  1
store.set("wcj")       //⇒  删除wcj及字符串数据
setAll :gun:

使用 store.set({key: data, key2: data2}) 代替
批量存储多个字符串数据
store.setAll(data[, overwrite])
效果相同store({key: data, key2: data});

store.setAll({
    "wcj1":123,
    "wcj2":345
}) //存储两条字符串数据

store.setAll(["w1","w2","w3"]) 
//存储三条字符串数据 
//  0⇒ "w1"
//  1⇒ "w2"
//  2⇒ "w3"
get

获取key的字符串数据
store.get(key[, alt])
效果相同store(key)

store.get("wcj1") //获取wcj1的字符串数据
store("wcj1") //功能同上
getAll :gun:

store()和store.get() 代替
获取所有key/data
store.getAll()
效果相同store()

store.getAll() //⇒JSON
store() //功能同上
clear

清空所有key/data
store.clear()

弃用 store(false) 因为传入空值 或者报错很容易清空库

store.clear() //
keys

返回所有key的数组
store.keys()

store.keys() //⇒["w1", "w2", "w3"]
search

搜索方法 store.search(string)

store.search('key') //⇒ {"key":"keytest","key1":{"a":1},"key2":"逐个更改数据"}
has

判断是否存在返回true/false
store.has(key)

store.has("w1"); //⇒true
remove

删除key包括key的字符串数据 store.remove(key)

store.remove("w1"); //删除w1 返回 w1的value

store("w1",false) //这样也是 删除w1
forEach

循环遍历，返回false结束遍历

store.forEach(function(k,d){
    console.log(k,d)
    if (k== 3) return false
})
定时清除

(做个笔记，未来将定时清除封装起来，有思路)

if (+new Date() > +new Date(2014, 11, 30)) {
    localStorage.removeItem("c");    //清除c的值
    // or localStorage.clear();
}
storage事件

不知为毛不支持参看下面 onStorage =>HTML5的本地存储，还提供了一个storage事件，可以对键值对的改变进行监听，使用方法如下：

if(window.addEventListener){
     window.addEventListener("storage",handle_storage,false);
}else if(window.attachEvent){
    window.attachEvent("onstorage",handle_storage);
}
function handle_storage(e){
    if(!e){e=window.event;}
    //showStorage();
}
对于事件变量e，是一个StorageEvent对象，提供了一些实用的属性，可以很好的观察键值对的变化，如下表：

Property	Type	Description
key	String	The named key that was added, removed, or moddified
oldValue	Any	The previous value(now overwritten), or null if a new item was added
newValue	Any	The new value, or null if an item was added
url/uri	String	The page that called the method that triggered this change
onStorage

即创建/更新/删除数据项时，触发该事件

store.onStorage(function(type,key,val){
   console.log("event:",type,key,val)
})

store({"a":1,"v":undefined})
//⇒ event: set a 1
//⇒ event: remove v 
链式书写

store.set('ad',234).get('ad')

store.onStorage(function(type){
 console.log('type:',type)
}).set('wcj',12).clear().setAll({"a":1,b:2}).get('wcj')
//⇒ type: set
//⇒ type: clear
//⇒ type: set
build	最终发布的代码存放位置。
config	配置目录，包括端口号等。我们初学可以使用默认的。
node_modules	npm 加载的项目依赖模块
src	
这里是我们要开发的目录，基本上要做的事情都在这个目录里。里面包含了几个目录及文件：
assets: 放置一些图片，如logo等。
components: 目录里面放了一个组件文件，可以不用。
App.vue: 项目入口文件，我们也可以直接将组件写这里，而不使用 components 目录。
main.js: 项目的核心文件。
static	静态资源目录，如图片、字体等。
test	初始测试目录，可删除
.xxxx文件	这些是一些配置文件，包括语法配置，git配置等。
index.html	首页入口文件，你可以添加一些 meta 信息或统计代码啥的。
package.json	项目配置文件。
README.md	项目的说明文档，markdown 格式
> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
