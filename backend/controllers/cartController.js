const pool = require('../config/db');

exports.agregarItem = async (req, res) => {
  const { carrito_id, producto_id, cantidad } = req.body;
  try {
    await pool.query('INSERT INTO carrito_items (carrito_id, producto_id, cantidad) VALUES ($1, $2, $3)',
      [carrito_id, producto_id, cantidad]);
    res.status(200).json({ mensaje: 'Item agregado' });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

exports.verCarrito = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`SELECT c.id AS carrito_id, c.usuario_id, c.estado, c.fecha_creacion,
      json_agg(json_build_object('producto_id', p.id, 'nombre', p.nombre, 'cantidad', ci.cantidad, 'precio', p.precio)) AS items
      FROM carritos c
      JOIN carrito_items ci ON c.id = ci.carrito_id
      JOIN productos p ON p.id = ci.producto_id
      WHERE c.id = $1
      GROUP BY c.id`, [id]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

exports.eliminarItem = async (req, res) => {
  const { itemId } = req.params;
  try {
    const result = await pool.query('DELETE FROM carrito_items WHERE id = $1 RETURNING *', [itemId]);
    if (!result.rowCount) return res.status(404).json({ error: 'Item no encontrado' });
    res.status(200).json({ mensaje: 'Item eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
