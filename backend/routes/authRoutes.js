const express = require('express');
const router = express.Router();
const { register, login, getUserProfile } = require('../controllers/authController');
const verifyToken = require('../middlewares/authMiddleware');

// Rutas públicas
router.post('/register', register);
router.post('/login', login);

// Ruta protegida para obtener el perfil real del usuario
router.get('/me', verifyToken, getUserProfile);

module.exports = router;
