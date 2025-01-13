const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Category title must be required!']
    },
    image:{
        type:String,
        default: "https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png",
    }
},{timestamps:true});


module.exports = mongoose.model("Category",categorySchema);