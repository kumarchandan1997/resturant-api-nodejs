const express = require('express');
const {getUserController, updateUserController,deleteUserController,updatePasswordController,resetPasswordController} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const route = express.Router();

route.get('/getuser',authMiddleware,getUserController);
route.put('/updateuser/:id',authMiddleware,updateUserController);
route.delete('/deleteuser/:id',authMiddleware,deleteUserController);
route.post('/update-password/:id',authMiddleware,updatePasswordController);
route.post('/reset-password',authMiddleware,resetPasswordController);



module.exports = route;