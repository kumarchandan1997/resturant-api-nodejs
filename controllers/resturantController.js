const resturantModel = require('../models/resturantModel');
// create resturant 
const createResturant = async (req,res) =>{
    try{
        const {title,foods,time,logoUrl,rating,ratingCount,code,coords} = req.body;

        if(!title || !foods || !time || !logoUrl || !rating || !ratingCount || !code){
            return res.status(500).send({
                success:false,
                message:'All field are required !',
            });
        }

        await resturantModel.create({title,foods,time,logoUrl,rating,ratingCount,code});

        res.status(200).send({
            success:true,
            message:'Resturant created successfully !',
        });



    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'something went wrong !',
        });
    }

}
// get all resturant data
const getAllResturant = async (req,res) =>{
    try{
        const resturant = await resturantModel.find({});

        if(!resturant){
            return res.status(500).send({
                success:false,
                message:'Resturant data not found !',
            });
        }else{
            res.status(200).send({
                success:true,
                message:'data get successfully !',
                count:resturant.length,
                data:resturant,
            });
        }

    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Something went wrong !'
        });
    }
}
// get resturant data by id
const getResturantById = async (req,res) => {
    try{
        const resturantId = req.params.id;
        if(!resturantId){
            return res.status(500).send({
                success:false,
                message:'Please provide resturant id !',
            });
        }

        const resturant = await resturantModel.findById(resturantId);
        if(!resturant){
            return res.status(500).send({
                success:false,
                message:'Resturnat data not found !'
            });
        }

        res.send({
            success:true,
            message:'Resturant get successfully !',
            data:resturant,
        });


    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Something went wrong !'
        });
    }
}
// delete resturant by id

const deleteResturant = async (req,res) =>{
    try{
        const resturantId = req.params.id;
        if(!resturantId){
            return res.status(500).send({
                success:false,
                message:'Please provide resturant id',
            });
        }
        const resturant = await resturantModel.findById(resturantId);
        if(!resturant){
            return res.status(500).send({
                success:false,
                message:'Resturant data not found !',
            });
        }

        await resturantModel.findByIdAndDelete(resturantId);

        res.status(200).send({
            success:true,
            message:'Resturant deleted successfully !',
        });

    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Something went wrong !'
        });
    }
}


module.exports = {createResturant,getAllResturant,getResturantById,deleteResturant};