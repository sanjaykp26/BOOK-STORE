const express=require("express")
const app=express();
const bookRoute=express.Router();
let book =require("../node-backend/Book")

bookRoute.route('/add-book').post((req,res,next)=>{
    book.create(req.body,(error,data)=>{
        if(error){
            return next (error)
        }else{
            res.json(data)
        }
    });
});
bookRoute.route('/').get((req,res)=>{
    book.find((error,data)=>{
        if(error){
            return next (error)
        } else{
            res.json(data)
        }
    });
});
bookRoute.route('/read-book/:id').get((req,res)=>{
    book.findById(req.params.id,(error,data)=>{
        if(error){
            return next(error)
        }else{
            res.json(data)
        }
    })
})

bookRoute.route('/update-book/:id').put((req,res,next)=>{
    book.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },(error,data)=>{
       if(error){
        return next(error);
        console.log(error);
       } else{
        res.json(data)
        console.log("book updated successfully");
       }
    })
})



bookRoute.route('/delete-book/:id').delete((req,res,next)=>{
    book.findByIdAndRemove(req.params.id,(error,data)=>{
       if(error){
        return next(error);
       } else{
        res.status(200).json({
            msg:data
        })
       }
    })
})
module.exports=bookRoute;