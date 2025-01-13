const categoryModel = require('../models/categoryModel');

const storeCategoryController = async (req,res) =>{
    try{
        const {title} = req.body;
        if(!title){
            res.status(500).send({
                success:false,
                message:'Title not empty !'
            });
        }else{
            categoryModel.create({title});
            res.status(200).send({
                success:true,
                message:'Category created successfully !'
            });
        }

    }catch(error){
        return res.status(500).send({
            succes:false,
            message:'Something went wrong !'
        })
    }
}

const getAllCategory = async (req,res)=>{
    try{
        const category = await categoryModel.find();

        if(!category){
            return res.status(500).send({
                success:false,
                message:'No any category found!'
            });
        }

        res.status(200).send({
            succes:true,
            message:'Get all category successfully !',
            data:category,
        });

    }catch(error){
        return res.status(500).send({
            success:false,
            message:'Something went wrong !'
        })
    }
}

const updateCategory = async (req,res) =>{
    try{
        const {title} = req.body;
        if(!title){
            res.status(500).send({
                success:false,
                message:'Title not empty !'
            });
        }
        console.log(req.params.id);
        const category = await categoryModel.findById(req.params.id);
        console.log(category);
        if(!category){
            return res.status(500).send({
                succes:false,
                message:'Category not found !'
            })
        }else{
            category.title = title;
           await category.save();
        }

        res.status(200).send({
            success:true,
            message:'Category updated successfully !'
        });

    }catch(error){
      return res.status(500).send({
            success:false,
            message:'Something went wrong !'
        })
    }
}

const deleteCategory = async (req,res) =>{
    try{
        const id = req.params.id;
        if(!id){
            return res.status(400).send({
                success:false,
                message:'Please pass id'
            })
        }

        const category = await categoryModel.findById(req.params.id);
        console.log(category);
        if(!category){
            return res.status(400).send({
                success:false,
                message:'Category not found !'
            });
        }

        await categoryModel.findByIdAndDelete(id);

        res.status(200).send({
            success:true,
            message:'Category Deleted successfully !'
        });

    }catch(error){
        res.status(500).send({
            success:false,
            message:'something went wrong!'
        })
    }
}

module.exports = {storeCategoryController,getAllCategory,updateCategory,deleteCategory}