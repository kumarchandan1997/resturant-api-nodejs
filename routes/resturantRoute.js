const express = require('express');
const { createResturant,getAllResturant,getResturantById,deleteResturant } = require('../controllers/resturantController');

const route = express.Router();

route.post('/create-resturant',createResturant);
route.get('/all-resturant',getAllResturant);
route.get('/get-resturant-id/:id',getResturantById);
route.delete('/delete-resturant/:id',deleteResturant);


module.exports = route;