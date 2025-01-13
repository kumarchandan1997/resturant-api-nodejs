const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    //title,description,price,imageUrl,foodTags,category,code,isAvailable,resturant,rating,ratingCount,

    title:{
        type:String,
        required:[true,'Title of food required !'],
    },
    descrption:{
        type:String,
        required:[true,'Description is required !'],
    },
    price:{
        type:Number,
        min:0,
        required:[true,'Price must be required !'],
    },
    imageUrl:{
        type:String,
        default:"https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png",
    },
    foodTags:{
        type:String,
    },
    category:{
        type:String,
        required:[true,'Food category required !'],
    },
    code:{
        type:String,
    },
    isAvailable:{
        type:Boolean,
        default:true,
    },
    resturant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Resturant",
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        default:5,
    },
    ratingCount:{
        type:String,
    }


},{timestamps:true});

module.exports = mongoose.model("Food",foodSchema);