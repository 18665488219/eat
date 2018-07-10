var mongoose=require('../db.js');//引入数据库链接操作
var articleSchema=mongoose.Schema({  //获取mongoDB的Schema码值   //定义一个Schema:Schema和数据库的字段保持一致
	title:String,
	content:String,
	time:String,
	author:Object,
	pv:Number,				//浏览量
	leave:Number          //留言
},{collection:'articles'})  //collection:user_table指定需要操作的集合
module.exports=mongoose.model('articles',articleSchema);  //返回一个可以操作数据库的对象

