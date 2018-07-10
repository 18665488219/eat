//引入库文件
var mongoose = require('mongoose');

//连接mydb数据库
mongoose.connect('mongodb://127.0.0.1:27017/mydb'); 

//监听连接成功时间
mongoose.connection.on('connected',function(){
	console.log('数据库连接成功..');
})
module.exports=mongoose;