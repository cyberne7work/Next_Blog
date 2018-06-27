var express=require("express");
var router=express.Router({mergeParams:true});
var newarticles=require("../models/blog");
var comment=require("../models/comment");

// comment route

router.get("/blog/:id/comments/new",isLoggedIn,function(req, res) {
    //find blog
    newarticles.findById(req.params.id,function(err,commentblog){
        if(err){
            console.log(err);
        }
        else{
             res.render("comments/new",{blog:commentblog});
        }
    });
   
});


//comment post

router.post("/blog/:id/comments",isLoggedIn,function(req,res){
    newarticles.findById(req.params.id,function(err,newcomment){
        if(err){
            console.log(err);
            res.redirect("/blog");
        }
        else{
            comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                }
                else{
                    //add username and id to comment
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    newcomment.comments.push(comment);
                    newcomment.save();
                    res.redirect("/blog/"+newcomment._id)
                }
            });
        }
        
    });
});

//comment edit route
router.get("/blog/:id/comments/:comment_id",function(req,res){
    comment.findById(req.params.comment_id,function(err, foundcomment) {
        if(err){
            res.redirect("back");
        }
        else{
             res.render("comments/commentedit",{blog_id:req.params.id,commentpost:foundcomment});
        }
    })
  
});

//comment update

router.put("/blog/:id/comments/:comment_id",function(req,res){
    comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,done){
       if(err){
           res.redirect("back");
       } 
       else{
           res.redirect("/blog/"+req.params.id);
       }
    })
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect("/login");
    }
}
module.exports=router;