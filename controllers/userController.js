const userModel = require("../models/userModel");
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUserController = async (req,res)=>{
    try{
       const userDetails = await userModel.find();
       if(!userDetails){
        res.status(500).send({
            success:false,
            message:'Data mot found !'
        });
       }
       res.status(200).send({
        success:true,
        message:'Data fetch successfully !',
        data:userDetails,
       })
    }catch(error){
        console.log(error);
    }
}

const updateUserController = async (req,res)=>{
   try{
        const user = await userModel.findById(req.params.id);
        
        if(!user){
            return res.status(500).send({
                success:false,
                message:'User not found !' 
            });
        }

        const {userName , address,phone} = req.body;
        if(userName) user.userName = userName
        if(address) user.address = address
        if(phone) user.phone = phone

        await user.save();

        res.status(200).send({
            success:true,
            message:'User updated Successfully !'
        });



   }catch(error){
    console.log("yadav");
    return res.status(500).send({
        success:false,
        message:'Something went wrong !'
    });
   }
}

const deleteUserController = async (req,res) =>{
    console.log("dhsgfhdsfg");
    try{
        console.log("hsgdhsfghdsfghgfsgdfhgdsfhgds");
        const user = await userModel.findById(req.params.id);
        if(!user){
            return res.status(500).send({
                success:false,
                message:'User not found !'
            });
        }else{
            await userModel.findByIdAndDelete(req.params.id);
            return res.status(200).send({
                success:true,
                message:'User deleted successfully !'
            });
        }


    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Something went wrong !'
        })
    }
}

const updatePasswordController = async (req,res)=>{
    try{
        const user = await userModel.findById(req.params.id);
        if(!user){
            return res.status(500).send({
                success:false,
                message:'User not found',
            });
        }

        const {newpassword,oldpassword} = req.body;

        if(!newpassword || !oldpassword){
            return res.status(500).send({
                success:false,
                message:'Please enter new and old password !'
            });
        }

        const ismatch = await bcrypt.compare(oldpassword,user.password);
        if(!ismatch){
            return res.status(500).send({
                success:false,
                message:'old password is not correct !'
            });
        }

        var salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(newpassword,salt);
        user.password = hashPassword;
        await user.save();

        res.status(200).send({
            success:true,
            message:'Password updated succcessfully !'
        });

    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'something went wrong'
        });
    }
}

const resetPasswordController = async (req,res)=>{
    try{
        const {email,answer,newpassword} = req.body;
        if(!email || !answer || !newpassword){
            return res.status(500).send({
                success:false,
                message:'please provide all field',
            });
        }

         const user = await userModel.findOne({email,answer});
         if(!user){
            return res.status(500).send({
                success:false,
                message:'User not found !'
            });
         }
         
         const salt = bcrypt.genSaltSync(10);
         const hasPassword = await bcrypt.hash(newpassword,salt);

         user.password = hasPassword;
         await user.save();

         res.status(200).send({
            success:true,
            message:'Password reset successfully !'
         });

    }catch(error){
        return res.status(500).send({
            success:false,
            message:'Something went wrong!'
        });
    }
}


module.exports = {getUserController,updateUserController,deleteUserController,updatePasswordController,resetPasswordController};