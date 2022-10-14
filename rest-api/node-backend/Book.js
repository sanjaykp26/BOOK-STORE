// create schema 
const mongoose=require('mongoose')
const Schema =mongoose.Schema;
let Book =new Schema( {
    name:{
        type:String
    },
    price:{
        type:String

},
    description:{
        type:String
    },
    image:{
        type:String
    }

    

},
{
    collection:"books"
}
)
// export module
module.exports=mongoose.model('book',Book)