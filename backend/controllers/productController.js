const pool = require('../config/db');

exports.crearProducto = async (req, res) => {
  const { nombre, descripcion, imagenes, precio, condicion, ubicacion } = req.body;
  const usuario_id = req.user.id;

  try {
    const result = await pool.query(
      'INSERT INTO productos (nombre, descripcion, imagenes, precio, condicion, ubicacion, usuario_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      [nombre, descripcion, JSON.stringify(imagenes), precio, condicion, ubicacion, usuario_id]
    );

    res.status(201).json({ mensaje: 'Producto creado', id: result.rows[0].id });
  } catch (err) {
    console.error("Error en el INSERT:", err.message); // 🔍 debug útil
    res.status(500).json({ error: 'Error en el servidor' });
  }
};


exports.obtenerProductos = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.id, 
        p.nombre, 
        p.descripcion, 
        p.imagenes, 
        p.precio, 
        p.condicion, 
        p.ubicacion, 
        p.usuario_id, 
        u.nombre AS nombre_usuario
      FROM productos p
      JOIN usuarios u ON p.usuario_id = u.id
    `);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};


exports.obtenerPorUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      SELECT 
        p.id, 
        p.nombre, 
        p.descripcion, 
        p.imagenes, 
        p.precio, 
        p.condicion, 
        p.ubicacion, 
        p.usuario_id, 
        u.nombre AS nombre_usuario
      FROM productos p
      JOIN usuarios u ON p.usuario_id = u.id
      WHERE p.usuario_id = $1
    `, [id]);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error al obtener productos del usuario:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

exports.obtenerProductoPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`
      SELECT 
        p.id, 
        p.nombre, 
        p.descripcion, 
        p.imagenes, 
        p.precio, 
        p.condicion, 
        p.ubicacion, 
        p.usuario_id, 
        u.nombre AS nombre_usuario
      FROM productos p
      JOIN usuarios u ON p.usuario_id = u.id
      WHERE p.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error al obtener producto por ID:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};


