const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const connectDB = require("./config/dbConnection");

const app = express();

connectDB();

// app.use(cors);
app.use(express.json());
app.use(morgan("dev"));

const port = process.env.PORT || 8000;
// all route
app.use('/api/v1/auth',require('./routes/authRoute'));
app.use('/api/v1/user',require('./routes/userRoute'));
app.use('/api/v1/category',require('./routes/categoryRoute'));
app.use('/api/v1/resturant',require('./routes/resturantRoute'));
app.use('/api/v1/food',require('./routes/foodRoute'));


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})


