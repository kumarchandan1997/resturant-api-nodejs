const jwt = require('jsonwebtoken');

module.exports = async (req,res,next)=>{
    try{
        let token;
        let authHeader = req.headers.Authorization || req.headers.authorization;
        if(authHeader && authHeader.startsWith("Bearer")){
            token = authHeader.split(" ")[1];
            jwt.verify(token,process.env.ACCESS_SECRET_TOKEN,(err,decode)=>{
             if(err){
                return res.status(500).send({
                    success:false,
                    message:'User is not authorize !'
                });
             }else{
                req.body.id = decode.id; 
                next();
             }
            })
        }
    }catch(error){
        console.log(error);
    }
}