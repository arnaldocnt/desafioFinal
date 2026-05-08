const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')

router.post('/paginaInicial', authController.paginaInicial);
router.get('/paginaInicial', authController.paginaInicial);


module.exports = router;