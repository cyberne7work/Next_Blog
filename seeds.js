var mongoose=require("mongoose");
var newarticles=require("./models/blog");
var comment=require("./models/comment");



var data=[
    
    {
        image:"https://fthmb.tqn.com/ksK97eLxTzH94uERSweL1mcGNGU=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/hacker-Gu-577f9e9d3df78c1e1fb0b9c4.jpg",
        paragraph:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type",
        tag:"Technology"
        
    },
    {
        image:"https://darkwebnews.com/wp-content/uploads/2017/09/Hacker-with-Rised-Handed.jpg",
        paragraph:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a typem",
        tag:"Technology"
        
    },
    {
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUI-xTervRv3kCfc2E2sGp309uA-QL0H0e52Qq_IARX9hsaEzi",
        paragraph:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type",
        tag:"Technology"
        
    }
    
    
    ]

function seedDb(){
    newarticles.remove({},function(err){
    if (err) {
        console.log(err)
    }
    else{
        console.log("Content Removed")
    }
});
// data.forEach(function(blog){
//     newarticles.create(blog,function(err,cblog){
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log("added succesfully");
//             comment.create({
//                 text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry",
//                 author:"Vishal"
//             },function(err,comment){
//                 if(err){
//                     console.log(err);
//                 }
//                 else{
//                     cblog.comments.push(comment);
//                     cblog.save();
//                     console.log("Created new comment");
//                 }
//             })
//         }
//     })
// })
}

module.exports=seedDb;

