var mongoose=require('../db.js');//引入数据库链接操作
var userSchema=mongoose.Schema({   //定义数据模型
	userName:String,
	passw:String,
	r_passw:String,
	sex:String,
	file:String,
	personal_profile:String
},{collection:'user_table'})  //collection:user_table指定需要操作的集合
module.exports=mongoose.model('user_table',userSchema);  //将该Schema发布为Model


