const foodModel = require("../models/foodModel");


const createFood = async (req,res) =>{
  try{

    const {title,descrption,price,foodTags,category,resturant,rating,ratingCount} = req.body;

    if(!ratingCount || !title || !descrption || !price || !foodTags || !category || !resturant || !rating){
        res.status(500).send({
            success:false,
            message:'All field are required !'
        });
    }

    await foodModel.create({title,resturant,descrption,price,foodTags,rating,ratingCount,category});

    res.status(200).send({
        success:true,
        message:'Food created Successfully !'
    });

  }catch(error){
    console.log(error);
    return res.status(500).send({
        success:false,
        message:'Something went wrong !',
    });
  }
}

const getAllFood = async (req,res) =>{
    try{
        const food = await foodModel.find({});
        if(!food){
            return res.status(500).send({
                success:false,
                message:'Food not available',
            });
        }else{
            res.status(200).send({
                success:true,
                message:'Food get successfully !',
                count:food.length,
                data:food
            });
        }


    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Something went wrong !',
        });
      }
}

const getFoodBYid = async (req,res) =>{
    try{
        const foodId = req.params.id;
        console.log(foodId);
        if(!foodId){
            return res.status(500).send({
                success:false,
                message:'Food id  not available',
            });
        }

        const food = await foodModel.findById(foodId);
        if(!food){
            return res.status(500).send({
                success:false,
                message:'Food not available',
            });
        }else{
            res.status(200).send({
                success:true,
                message:'Food get successfully !',
                data:food
            });
        }


    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Something went wrong !',
        });
      }
}

const getFoodByResturantController = async (req,res) =>{
    try{
        console.log("chandan");
       const resturantId = req.params.id;
       console.log(resturantId);
       if(!resturantId){
        return res.status(500).send({
            success:false,
            message:'Resturant is not found !',
        });
       }
       const resturantData = await foodModel.find({resturnat:resturantId});
       console.log(resturantData);
       res.status(200).send({
        success:true,
        message:'Resturant data is found successfully !',
        data:resturantData,
       });


    }catch(error){
        console.log(error);
    }
}

const updateFoodController = async (req, res) => {
    try {
      const foodID = req.params.id;
      if (!foodID) {
        return res.status(404).send({
          success: false,
          message: "no food id was found",
        });
      }
      const food = await foodModel.findById(foodID);
      if (!food) {
        return res.status(404).send({
          success: false,
          message: "No Food Found",
        });
      }
      const {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        catgeory,
        code,
        isAvailabe,
        resturnat,
        rating,
      } = req.body;
      const updatedFood = await foodModel.findByIdAndUpdate(
        foodID,
        {
          title,
          description,
          price,
          imageUrl,
          foodTags,
          catgeory,
          code,
          isAvailabe,
          resturnat,
          rating,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Food Item Was Updated",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr In Update Food API",
        error,
      });
    }
  };

  const deleteFoodController = async (req, res) => {
    try {
      const foodId = req.params.id;
      if (!foodId) {
        return res.status(404).send({
          success: false,
          message: "provide food id",
        });
      }
      const food = await foodModel.findById(foodId);
      if (!food) {
        return res.status(404).send({
          success: false,
          message: "No Food Found with id",
        });
      }
      await foodModel.findByIdAndDelete(foodId);
      res.status(200).send({
        success: true,
        message: "Food Item Dleeted ",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Eror In Delete Food APi",
        error,
      });
    }
  };

  const placeOrderController = async (req, res) => {
    try {
      const { cart } = req.body;
      if (!cart) {
        return res.status(500).send({
          success: false,
          message: "please food cart or payemnt method",
        });
      }
      let total = 0;
      //cal
      cart.map((i) => {
        total += i.price;
      });
  
      const newOrder = new orderModel({
        foods: cart,
        payment: total,
        buyer: req.body.id,
      });
      await newOrder.save();
      res.status(201).send({
        success: true,
        message: "Order Placed successfully",
        newOrder,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr In Place Order API",
        error,
      });
    }
  };


module.exports = {createFood,getAllFood,getFoodBYid,getFoodByResturantController,updateFoodController,deleteFoodController,placeOrderController};