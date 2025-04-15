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
        u.nombre AS nombre_usuario,
        p.categoria,
        CASE 
          WHEN p.precio::numeric >= 100000 THEN true
          ELSE false
        END AS envio_gratis
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
        p.categoria,
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
        p.categoria, 
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

exports.eliminarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM productos WHERE id = $1", [id]);
    res.status(200).json({ mensaje: "Producto eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar producto:", err);
    res.status(500).json({ error: "Error al eliminar producto" });
  }
};

exports.actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const usuario_id = req.user.id; // viene del token gracias a verifyToken
  const { nombre, descripcion, imagenes, precio, condicion, ubicacion } = req.body;

  try {
    // Verificamos si el producto existe y le pertenece al usuario
    const producto = await pool.query("SELECT * FROM productos WHERE id = $1", [id]);

    if (producto.rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    if (producto.rows[0].usuario_id !== usuario_id) {
      return res.status(403).json({ error: "No tienes permiso para editar este producto" });
    }

    // Actualizamos el producto
    await pool.query(
      `UPDATE productos 
       SET nombre = $1, descripcion = $2, imagenes = $3, precio = $4, condicion = $5, ubicacion = $6
       WHERE id = $7`,
      [nombre, descripcion, imagenes, precio, condicion, ubicacion, id]
    );

    res.status(200).json({ mensaje: "Producto actualizado correctamente" });
  } catch (err) {
    console.error("Error al actualizar producto:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
