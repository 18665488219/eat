var mongoose=require('../db.js');//引入数据库链接操作

/*
	留言的用户，
	留言的内容
	留言时间，
	留言是属于哪一篇文章
 */
var msgSchema=mongoose.Schema({  //获取mongoDB的Schema码值   //定义一个Schema:Schema和数据库的字段保持一致
	author:Object,
	content:String,
	time:String,
	msg_id:String
},{collection:'msgs'})  //collection:user_table指定需要操作的集合
module.exports=mongoose.model('msgs',msgSchema);  //返回一个可以操作数据库的对象


