const mongoose=require("mongoose")

require("dotenv").config()


const postSchema=new mongoose.Schema({
   selectedCategory:{
    type:String,
   },
   heading:{
    type:String,
   },
   description:{
    type:String,
   },
   image:{
      type:String
   },
   link:{
      type:String
   }
     

})


const PostModel=mongoose.model('post',postSchema)

module.exports={PostModel};