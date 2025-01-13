const express = require('express');
const { createFood,getAllFood ,getFoodBYid,getFoodByResturantController,updateFoodController,deleteFoodController,placeOrderController} = require('../controllers/foodController');

const route = express.Router();


route.post('/create-food',createFood);
route.get('/get-allfood',getAllFood);
route.get('/get-food-byid/:id',getFoodBYid);
route.get('/get-food-by-resturant/:id',getFoodByResturantController);
route.put('/update-food/:id',updateFoodController);
route.delete('/delete-food/:id',deleteFoodController);
route.post("/placeorder", placeOrderController);

module.exports = route;