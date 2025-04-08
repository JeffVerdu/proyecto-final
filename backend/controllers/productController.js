const pool = require('../config/db');

exports.crearProducto = async (req, res) => {
  const { nombre, descripcion, imagenes, precio, condicion, ubicacion } = req.body;
  try {
    await pool.query('INSERT INTO productos (nombre, descripcion, imagenes, precio, condicion, ubicacion) VALUES ($1, $2, $3, $4, $5, $6)',
      [nombre, descripcion, JSON.stringify(imagenes), precio, condicion, ubicacion]);
    res.status(201).json({ mensaje: 'Producto creado' });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

exports.obtenerProductos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

exports.obtenerPorUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM productos WHERE usuario_id = $1', [id]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
