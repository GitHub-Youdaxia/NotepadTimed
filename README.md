# notepadtimed
čżĺşŚďź
äźĺďźĺ é¤ćé
ćŹĺ°ĺ­ĺ¨APIs

store(key, data);                 //ĺä¸Şĺ­ĺ¨ĺ­çŹŚä¸˛ć°ćŽ
store({key: data, key2: data2});  //ćšéĺ­ĺ¨ĺ¤ä¸Şĺ­çŹŚä¸˛ć°ćŽ
store(key);               //čˇĺkeyçĺ­çŹŚä¸˛ć°ćŽ
store("?key");            //ĺ¤ć­keyćŻĺŚĺ­ĺ¨
store();                  //čˇĺććkey/data
//store(false);đŤ         //ďźĺźç¨ďźĺ ä¸şäź ĺĽçŠşĺź ćčćĽéĺžĺŽšćć¸çŠşĺş
//store(key,false); đŤ    //ďźĺźç¨ďźĺ é¤keyĺćŹkeyçĺ­çŹŚä¸˛ć°ćŽ, ĺ˝val ä¸ş 0çćśĺć ćłĺ­ĺ¨...

store.set(key, data[, overwrite]);    //=== store(key, data);
store.set({key: data, key2: data2})   //=== store({key: data, key2: data});
//store.setAll({key: data});(ĺźç¨)đŤ   //=== äżćçŽĺ setćšćłĺŻäťĽĺŽç°
store.get(key[, alt]);                //=== store(key);
store.get("?key");                    //ĺ¤ć­keyćŻĺŚĺ­ĺ¨
//store.getAll();(ĺźç¨)đŤ              //=== store()ĺstore.get()é˝ĺŻäťĽĺŽç°čˇĺććć°ćŽ
store.remove(key);                  //===store(key,false)
store.clear();                      //ć¸çŠşććkey/data
store.keys();                       //čżĺććkeyçć°çť
store.forEach(callback);            //ĺžŞçŻéĺďźčżĺfalseçťćéĺ
store.search(string)                //ćç´˘ćšćł

store.has(key);         //âĺ¤ć­ćŻĺŚĺ­ĺ¨čżĺtrue/false          


//â ćäžcallbackćšćłĺ¤çć°ćŽ
store("test",function(key,val){
    console.log(val)//čżéĺ¤ç éčżtestčˇĺçć°ćŽ
    return [3,4,5]//čżĺć°ćŽĺšśĺ­ĺ¨
})

store(["key","key2"],function(key){
    //čˇĺĺ¤ä¸Şkeyçć°ćŽĺ¤çďźreturn ĺšśäżĺ­ďź
    console.log("key:",key)
    return "éä¸Şć´ćšć°ćŽ"
})

// ĺłĺĺťş/ć´ć°/ĺ é¤ć°ćŽéĄšćśďźč§ŚĺčŻĽäşäťś
store.onStorage(function(key,val){
    console.log('onStorage:',key,val)
})
set

ĺä¸Şĺ­ĺ¨ćĺ é¤ĺ­çŹŚä¸˛ć°ćŽ
store.set(key, data[, overwrite]);
ććç¸ĺstore(key, data);

store.set("wcj","1")   //â  1
store.set("wcj")       //â  ĺ é¤wcjĺĺ­çŹŚä¸˛ć°ćŽ
setAll :gun:

ä˝żç¨ store.set({key: data, key2: data2}) äťŁćż
ćšéĺ­ĺ¨ĺ¤ä¸Şĺ­çŹŚä¸˛ć°ćŽ
store.setAll(data[, overwrite])
ććç¸ĺstore({key: data, key2: data});

store.setAll({
    "wcj1":123,
    "wcj2":345
}) //ĺ­ĺ¨ä¸¤ćĄĺ­çŹŚä¸˛ć°ćŽ

store.setAll(["w1","w2","w3"]) 
//ĺ­ĺ¨ä¸ćĄĺ­çŹŚä¸˛ć°ćŽ 
//  0â "w1"
//  1â "w2"
//  2â "w3"
get

čˇĺkeyçĺ­çŹŚä¸˛ć°ćŽ
store.get(key[, alt])
ććç¸ĺstore(key)

store.get("wcj1") //čˇĺwcj1çĺ­çŹŚä¸˛ć°ćŽ
store("wcj1") //ĺč˝ĺä¸
getAll :gun:

store()ĺstore.get() äťŁćż
čˇĺććkey/data
store.getAll()
ććç¸ĺstore()

store.getAll() //âJSON
store() //ĺč˝ĺä¸
clear

ć¸çŠşććkey/data
store.clear()

ĺźç¨ store(false) ĺ ä¸şäź ĺĽçŠşĺź ćčćĽéĺžĺŽšćć¸çŠşĺş

store.clear() //
keys

čżĺććkeyçć°çť
store.keys()

store.keys() //â["w1", "w2", "w3"]
search

ćç´˘ćšćł store.search(string)

store.search('key') //â {"key":"keytest","key1":{"a":1},"key2":"éä¸Şć´ćšć°ćŽ"}
has

ĺ¤ć­ćŻĺŚĺ­ĺ¨čżĺtrue/false
store.has(key)

store.has("w1"); //âtrue
remove

ĺ é¤keyĺćŹkeyçĺ­çŹŚä¸˛ć°ćŽ store.remove(key)

store.remove("w1"); //ĺ é¤w1 čżĺ w1çvalue

store("w1",false) //čżć ˇäšćŻ ĺ é¤w1
forEach

ĺžŞçŻéĺďźčżĺfalseçťćéĺ

store.forEach(function(k,d){
    console.log(k,d)
    if (k== 3) return false
})
ĺŽćść¸é¤

(ĺä¸ŞçŹčŽ°ďźćŞćĽĺ°ĺŽćść¸é¤ĺ°čŁčľˇćĽďźććčˇŻ)

if (+new Date() > +new Date(2014, 11, 30)) {
    localStorage.removeItem("c");    //ć¸é¤cçĺź
    // or localStorage.clear();
}
storageäşäťś

ä¸çĽä¸şćŻä¸ćŻćĺçä¸é˘ onStorage =>HTML5çćŹĺ°ĺ­ĺ¨ďźčżćäžäşä¸ä¸ŞstorageäşäťśďźĺŻäťĽĺŻšéŽĺźĺŻšçćšĺčżčĄçĺŹďźä˝żç¨ćšćłĺŚä¸ďź

if(window.addEventListener){
     window.addEventListener("storage",handle_storage,false);
}else if(window.attachEvent){
    window.attachEvent("onstorage",handle_storage);
}
function handle_storage(e){
    if(!e){e=window.event;}
    //showStorage();
}
ĺŻšäşäşäťśĺéeďźćŻä¸ä¸ŞStorageEventĺŻščąĄďźćäžäşä¸äşĺŽç¨çĺąć§ďźĺŻäťĽĺžĺĽ˝çč§ĺŻéŽĺźĺŻšçĺĺďźĺŚä¸čĄ¨ďź

Property	Type	Description
key	String	The named key that was added, removed, or moddified
oldValue	Any	The previous value(now overwritten), or null if a new item was added
newValue	Any	The new value, or null if an item was added
url/uri	String	The page that called the method that triggered this change
onStorage

ĺłĺĺťş/ć´ć°/ĺ é¤ć°ćŽéĄšćśďźč§ŚĺčŻĽäşäťś

store.onStorage(function(type,key,val){
   console.log("event:",type,key,val)
})

store({"a":1,"v":undefined})
//â event: set a 1
//â event: remove v 
éžĺźäšŚĺ

store.set('ad',234).get('ad')

store.onStorage(function(type){
 console.log('type:',type)
}).set('wcj',12).clear().setAll({"a":1,b:2}).get('wcj')
//â type: set
//â type: clear
//â type: set
build	ćçťĺĺ¸çäťŁç ĺ­ćžä˝ç˝Žă
config	éç˝ŽçŽĺ˝ďźĺćŹçŤŻĺŁĺˇç­ăćäťŹĺĺ­ŚĺŻäťĽä˝żç¨éťčŽ¤çă
node_modules	npm ĺ č˝˝çéĄšçŽäžčľć¨Ąĺ
src	
čżéćŻćäťŹčŚĺźĺççŽĺ˝ďźĺşćŹä¸čŚĺçäşćé˝ĺ¨čżä¸ŞçŽĺ˝éăéé˘ĺĺŤäşĺ ä¸ŞçŽĺ˝ĺćäťśďź
assets: ćžç˝Žä¸äşĺžçďźĺŚlogoç­ă
components: çŽĺ˝éé˘ćžäşä¸ä¸ŞçťäťśćäťśďźĺŻäťĽä¸ç¨ă
App.vue: éĄšçŽĺĽĺŁćäťśďźćäťŹäšĺŻäťĽç´ćĽĺ°çťäťśĺčżéďźčä¸ä˝żç¨ components çŽĺ˝ă
main.js: éĄšçŽçć ¸ĺżćäťśă
static	éćčľćşçŽĺ˝ďźĺŚĺžçăĺ­ä˝ç­ă
test	ĺĺ§ćľčŻçŽĺ˝ďźĺŻĺ é¤
.xxxxćäťś	čżäşćŻä¸äşéç˝ŽćäťśďźĺćŹčŻ­ćłéç˝Žďźgitéç˝Žç­ă
index.html	éŚéĄľĺĽĺŁćäťśďźä˝ ĺŻäťĽćˇťĺ ä¸äş meta äżĄćŻćçťčŽĄäťŁç ĺĽçă
package.json	éĄšçŽéç˝Žćäťśă
README.md	éĄšçŽçčŻ´ćććĄŁďźmarkdown ć źĺź
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
