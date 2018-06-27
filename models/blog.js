//scema setup

var mongoose = require('mongoose');
var articleSchema=new mongoose.Schema({
    image:String,
    paragraph:String,
    tag:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
},
    
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"comment"
        }
        
        ]
});

module.exports=mongoose.model("articles",articleSchema);