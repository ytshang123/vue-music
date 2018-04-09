var express = require('express');
var app = express();
//console.log(app)

// 解决跨域问题，网上找的解决方案
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/mp3-list',function(req,res){
	var _musicList = {
		"music":[
			{
		      "id": "1",
		      "name": "动物世界",
		      "singer": "薛之谦",
		      "img": "http://ugc.cdn.qianqian.com/yinyueren/pic/76c284c9b8d9e4892e6acf1585b4eb8d.jpg",
		      "url": "http://ugc.cdn.qianqian.com/yinyueren/audio/79d3ee4d04ca9d3d4b27beadedf0457f.mp3"
		    },
		    {
		      "id": "2",
		      "name": "离人愁",
		      "singer": "李袁杰",
		      "img": "http://ugc.cdn.qianqian.com/yinyueren/pic/ddccbb342e425d8062cf.jpg",
		      "url": "http://ugc.cdn.qianqian.com/yinyueren/audio/d2b1b64146f2f12f7642af06aa9688f2.mp3"
		    },
		    {
		      "id": "3",
		      "name": "起风了",
		      "singer": "裂天",
		      "img": "http://ugc.cdn.qianqian.com/yinyueren/pic/f15798d68c9ff0ef8ede.jpg",
		      "url": "http://ugc.cdn.qianqian.com/yinyueren/audio/481c2cef6abca29c354ce4627add2f70.mp3"
		    }
		]
	}
	res.send(_musicList);
	res.end();
})

app.listen(1234,function(){
	console.log('1234已经执行');
})