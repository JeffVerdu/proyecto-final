const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const bearer = req.headers['authorization'];
  if (!bearer) return res.status(401).json({ error: 'Token requerido' });

  try {
    const token = bearer.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('Usuario autenticado:', req.user);
    next();
  } catch (err) {
    res.status(403).json({ error: 'Token inválido' });
  }
};

module.exports = verifyToken;
