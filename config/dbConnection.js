const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
       const connect = await mongoose.connect(process.env.DATABASE_URL);
       console.log("Database connect successfully !",connect.connection.name)
    }catch(error){
        console.log("Error",error);
        process.exit(1);
    }
}

module.exports = connectDB;