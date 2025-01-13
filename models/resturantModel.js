const mongoose = require("mongoose");

const resturantSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Title must be required !'],
    },
    imageUrl:{
        type:String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fuxwing.com%2Ffemale-user-icon%2F&psig=AOvVaw2JxR1KermkKvwjjDnien6g&ust=1736825860936000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMjAytbi8YoDFQAAAAAdAAAAABAE"
    },
    foods:{
        type:Array,
    },
    time:{
        type:String,
    },
    pickup:{
        type:Boolean,
        default:true,
    },
    delivery:{
        type:Boolean,
        default:true,
    },
    isOpen:{
        type:Boolean,
        default:true,
    },
    logoUrl:{
        type:String,
    },
    rating:{
        type:Number,
        default:1,
        min:1,
        max:5,
    },
    ratingCount:{
        type:String,
    },
    code:{
        type:String,
    },
    // coords:{
    //     id:{
    //         type:String
    //     },
    //     latitude:{type:Number},
    //     latitudeDelta:{type:Number},
    //     longitude:{type:Number},
    //     longitudeDelta:{type:Number},
    //     address:{type:String},
    //     title:{type:String},
    // },
},{timestamps:true});


module.exports = mongoose.model("Resturant",resturantSchema);