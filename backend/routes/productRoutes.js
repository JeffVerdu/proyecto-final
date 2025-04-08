const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const { crearProducto, obtenerProductos, obtenerPorUsuario } = require('../controllers/productController');

router.post('/', verifyToken, crearProducto);
router.get('/', obtenerProductos);
router.get('/:id', obtenerPorUsuario);

module.exports = router;