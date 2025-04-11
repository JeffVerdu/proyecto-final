const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {
  const usuario = req.body?.user || 'desconocido';
  const log = `${new Date().toISOString()} - 🔐 Usuario cerró sesión: ${usuario}\n`;

  // Puedes imprimirlo o escribirlo en archivo
  console.log(log.trim());

  // Opcional: guardar en archivo
  const fs = require('fs');
  const path = require('path');
  const logPath = path.join(__dirname, '../logs/logout.log');
  fs.appendFileSync(logPath, log);

  res.status(200).json({ mensaje: 'Logout registrado' });
});

module.exports = router;
