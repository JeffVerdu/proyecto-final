const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const { agregarItem, verCarrito, eliminarPorProducto, asociarCarritoAUsuario, crearCarritoAnonimo, clearAllItems } = require('../controllers/cartController');

router.post('/crear', crearCarritoAnonimo);
router.get('/:id', verCarrito);
router.post('/items', agregarItem);
router.put('/asociar', verifyToken, asociarCarritoAUsuario);
router.post('/:id/asociar', verifyToken, asociarCarritoAUsuario);
router.delete('/item', eliminarPorProducto);
router.delete('/:id/items', clearAllItems);


module.exports = router;
