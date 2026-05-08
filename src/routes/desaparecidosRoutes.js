const express = require('express');
const router = express.Router();
const desaparecidosController = require('../controllers/desaparecidosController');
const verifyJWT = require('../middlewares/authMiddleware');


router.get('/desaparecidos', desaparecidosController.listarDesaparecido);
router.get('/desaparecidos/:id', desaparecidosController.idDesaparecido);
router.post('/desaparecidos', verifyJWT, desaparecidosController.cadastrarDesaparecido);
router.put('/desaparecidos/:id', desaparecidosController.atualizarDesaparecido);
router.delete('/desaparecidos/:id', desaparecidosController.deletarDesaparecido);

module.exports = router;