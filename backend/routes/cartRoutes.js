const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const { agregarItem, verCarrito, eliminarItem } = require('../controllers/cartController');

router.post('/items', verifyToken, agregarItem);
router.get('/:id', verifyToken, verCarrito);
router.delete('/items/:itemId', verifyToken, eliminarItem);

module.exports = router;