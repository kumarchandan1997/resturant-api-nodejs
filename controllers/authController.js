const userModel = require("../models/userModel");
const { use } = require("../routes/authRoute");
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerController = async (req,res)=>{
    try{
       const {userName,email,password,phone,address,answer} = req.body;
       
       if(!userName || !email || !password || !phone || !address || !answer){
        return res.status(500).send({
            success:false,
            message:'Please provide all fields',
        });
       }

       const existingUser = await userModel.find({email});
       if(existingUser.length>0){
        return res.status(500).send({
            success:false,
            message:"Email is already use !",
        });
       }

       var salt = bcrypt.genSaltSync(10);
       const hashPassword = await bcrypt.hash(password,salt);

       const newUser = await userModel.create({userName,password:hashPassword,email,phone,address,answer});
       
       res.status(200).send({
        success:true,
        message:'User added successfully !',
        data:newUser,
       });

    }catch(error){
        console.log(error);
    }

}

const loginController = async (req,res)=>{

    try{
        const {email,password} = req.body;
        if(!email || !password)
        {
          return  res.status(500).send({
                success:false,
                message:'All field is required !',
            });
        }
        const user = await userModel.findOne({email:email});
        if(!user){
          return  res.status(400).send({
                success:false,
                message:"User is not found!",
            });
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(500).send({
                success:false,
                message:'Password is not correct',
            });
        }

        const token = jwt.sign({id:user._id},process.env.ACCESS_SECRET_TOKEN,{expiresIn:'60m'});

        res.status(200).send({
            success:true,
            token:token,
            message:'User login successfully !',
        });

    }catch(error){
        console.log(error);
    }

}

module.exports = {registerController,loginController};