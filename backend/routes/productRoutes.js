const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const { crearProducto, obtenerProductos, obtenerPorUsuario, obtenerProductoPorId} = require('../controllers/productController');

router.post('/', verifyToken, crearProducto);
router.get('/', obtenerProductos);
router.get('/usuario/:id', obtenerPorUsuario);
router.get('/:id', obtenerProductoPorId);

module.exports = router;