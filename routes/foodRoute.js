const express = require('express');
const { createFood,getAllFood ,getFoodBYid,getFoodByResturantController} = require('../controllers/foodController');

const route = express.Router();


route.post('/create-food',createFood);
route.get('/get-allfood',getAllFood);
route.get('/get-food-byid/:id',getFoodBYid);
route.get('/get-food-by-resturant/:id',getFoodByResturantController);

module.exports = route;