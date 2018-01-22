var app = express()

// 添加的、、、、
var appData = require('../db.json');
var sites=appData.sites;
var notes=appData.notes;
var apiRoutes = express.Router();

apiRoutes.get('/server01',function (req,res) {
  res.json({
    errno:0,
    data:sites
  });//'/server01'是URL要使用的路径；data:sites则是db.json中对象中的一个小的键名（详见下图），这两个名字可以相同也可以不同，但是只有将data:sites这块对应json写对了，才能获取到json相应的数据块。（也就是说这一段获取的不是整个json文件，而是json文件中的sites这个键的值）
});
apiRoutes.post('/server01',function (req,res) {
  res.json({
    errno:0,
    data:sites
  });
});
apiRoutes.get('/notes',function (req,res) {
  res.json({
    errno:0,
    data:notes
  });
});
app.use('/api',apiRoutes);



var compiler = webpack(webpackConfig)