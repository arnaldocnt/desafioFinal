const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const verifyJWT = require('../middlewares/authMiddleware');

router.get('/usuarios', usuariosController.listarUsuario);
router.get('/usuarios/:id', usuariosController.idUsuario);
router.post('/usuarios', verifyJWT, usuariosController.cadastrarUsuario);
router.delete('/usuarios', usuariosController.deletarUsuario);

module.exports = router;
