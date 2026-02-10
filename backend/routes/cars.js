const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const { verifyToken, isAdmin } = require('../config/middleware');

// Public routes
router.get('/', carController.getAllCars);
router.get('/:id', carController.getCarById);

// Admin routes
router.post('/', verifyToken, isAdmin, carController.addCar);
router.put('/:id', verifyToken, isAdmin, carController.updateCar);
router.delete('/:id', verifyToken, isAdmin, carController.deleteCar);

module.exports = router;
