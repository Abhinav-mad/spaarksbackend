const express = require('express')
const { createRestaurant, getRestaurantsByRadius, getRestaurantsByRange, updateRestaurant } = require('../controllers/restaurentController');
const authMiddleware = require('../utils/authMiddleware');




const router = express.Router()


router.post('/create',authMiddleware,createRestaurant);
router.put('/:id',authMiddleware,updateRestaurant);


router.post('/radius',authMiddleware,getRestaurantsByRadius);
router.post('/range',authMiddleware,getRestaurantsByRange);



module.exports = router


