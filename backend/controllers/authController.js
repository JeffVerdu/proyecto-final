const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
require('dotenv').config();

exports.register = async (req, res) => {
  const { nombre, email, password, perfil } = req.body;
  if (!nombre || !email || !password || !perfil) return res.status(400).json({ error: 'Faltan campos requeridos' });

  try {
    const userExist = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (userExist.rows.length) return res.status(401).json({ error: 'Usuario ya registrado' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO usuarios (nombre, email, password, perfil) VALUES ($1, $2, $3, $4)',
      [nombre, email, hashedPassword, perfil]);
    res.status(201).json({ mensaje: 'Registro exitoso' });
    } catch (err) {
        console.error('Error en /register:', err);
        res.status(500).json({ error: err.message || 'Error en el servidor' });
    }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email y password son requeridos' });

  try {
    const user = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (!user.rows.length) return res.status(401).json({ error: 'Credenciales inválidas' });

    const validPass = await bcrypt.compare(password, user.rows[0].password);
    if (!validPass) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user.rows[0].id, perfil: user.rows[0].perfil }, process.env.JWT_SECRET);
    res.status(200).json({ email: user.rows[0].email, token: `Bearer ${token}`, perfil: user.rows[0].perfil });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
