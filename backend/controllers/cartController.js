const pool = require("../config/db");

exports.agregarItem = async (req, res) => {
  const { carrito_id, producto_id, cantidad } = req.body;

  try {
    let newCarritoId = carrito_id;

    if (!newCarritoId) {
      const result = await pool.query(
        "INSERT INTO carritos (estado, fecha_creacion) VALUES ($1, NOW()) RETURNING id",
        ["activo"]
      );
      newCarritoId = result.rows[0].id;
    }

    await pool.query(
      `INSERT INTO carrito_items (carrito_id, producto_id, cantidad)
       VALUES ($1, $2, $3)
       ON CONFLICT (carrito_id, producto_id)
       DO UPDATE SET cantidad = carrito_items.cantidad + EXCLUDED.cantidad`,
      [newCarritoId, producto_id, cantidad]
    );

    res
      .status(200)
      .json({ mensaje: "Item agregado", carrito_id: newCarritoId });
  } catch (err) {
    console.error("Error al agregar item:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

exports.verCarrito = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
      SELECT 
        c.id AS carrito_id, 
        c.usuario_id, 
        c.estado, 
        c.fecha_creacion,
        json_agg(
          json_build_object(
            'producto_id', p.id,
            'nombre', p.nombre,
            'cantidad', ci.cantidad,
            'precio', p.precio,
            'imagenes', p.imagenes,
            'descripcion', p.descripcion,
            'condicion', p.condicion,
            'ubicacion', p.ubicacion,
            'usuario_id', p.usuario_id,
            'categoria', p.categoria
          )
        ) AS items
      FROM carritos c
      JOIN carrito_items ci ON c.id = ci.carrito_id
      JOIN productos p ON p.id = ci.producto_id
      WHERE c.id = $1
      GROUP BY c.id
    `,
      [id]
    );

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error en verCarrito:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

exports.eliminarPorProducto = async (req, res) => {
  const { carrito_id, producto_id } = req.body;

  try {
    const result = await pool.query(
      "SELECT cantidad FROM carrito_items WHERE carrito_id = $1 AND producto_id = $2",
      [carrito_id, producto_id]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Producto no encontrado en el carrito" });
    }

    const cantidadActual = result.rows[0].cantidad;

    if (cantidadActual > 1) {
      await pool.query(
        "UPDATE carrito_items SET cantidad = cantidad - 1 WHERE carrito_id = $1 AND producto_id = $2",
        [carrito_id, producto_id]
      );
    } else {
      await pool.query(
        "DELETE FROM carrito_items WHERE carrito_id = $1 AND producto_id = $2",
        [carrito_id, producto_id]
      );
    }

    res
      .status(200)
      .json({ mensaje: "Producto actualizado o eliminado del carrito" });
  } catch (err) {
    console.error("Error al eliminar producto del carrito:", err);
    res.status(500).json({ error: "Error al eliminar producto del carrito" });
  }
};

exports.asociarCarritoAUsuario = async (req, res) => {
  const { carrito_id, usuario_id } = req.body;

  try {
    await pool.query("UPDATE carritos SET usuario_id = $1 WHERE id = $2", [
      usuario_id,
      carrito_id,
    ]);

    const result = await pool.query(
      `
      SELECT 
        c.id AS carrito_id, 
        json_agg(
          json_build_object(
            'producto_id', p.id,
            'nombre', p.nombre,
            'cantidad', ci.cantidad,
            'precio', p.precio,
            'imagenes', p.imagenes,
            'descripcion', p.descripcion,
            'condicion', p.condicion,
            'ubicacion', p.ubicacion,
            'usuario_id', p.usuario_id,
            'categoria', p.categoria
          )
        ) AS items
      FROM carritos c
      JOIN carrito_items ci ON c.id = ci.carrito_id
      JOIN productos p ON p.id = ci.producto_id
      WHERE c.id = $1
      GROUP BY c.id
    `,
      [carrito_id]
    );

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error al asociar carrito:", err);
    res.status(500).json({ error: "Error al asociar carrito" });
  }
};

exports.crearCarritoAnonimo = async (req, res) => {
  try {
    const result = await pool.query(
      "INSERT INTO carritos (estado, fecha_creacion) VALUES ('activo', NOW()) RETURNING id"
    );
    res.status(201).json({ carrito_id: result.rows[0].id });
  } catch (err) {
    console.error("Error al crear carrito anónimo:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

exports.clearAllItems = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM carrito_items WHERE carrito_id = $1", [id]);
    res.status(200).json({ mensaje: "Todos los ítems eliminados" });
  } catch (err) {
    console.error("Error al vaciar carrito:", err);
    res.status(500).json({ error: "Error al vaciar carrito" });
  }
};

exports.obtenerCarritoPorUsuario = async (req, res) => {
  const { usuario_id } = req.params;
  try {
    const result = await pool.query(
      `
      SELECT 
        c.id AS carrito_id, 
        json_agg(
          json_build_object(
            'producto_id', p.id,
            'nombre', p.nombre,
            'cantidad', ci.cantidad,
            'precio', p.precio,
            'imagenes', p.imagenes,
            'descripcion', p.descripcion,
            'condicion', p.condicion,
            'ubicacion', p.ubicacion,
            'usuario_id', p.usuario_id,
            'categoria', p.categoria
          )
        ) AS items
      FROM carritos c
      JOIN carrito_items ci ON c.id = ci.carrito_id
      JOIN productos p ON p.id = ci.producto_id
      WHERE c.usuario_id = $1 AND c.estado = 'activo'
      GROUP BY c.id
      ORDER BY c.fecha_creacion DESC
      LIMIT 1
    `,
      [usuario_id]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ mensaje: "No se encontró carrito para el usuario" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error al obtener carrito por usuario:", err);
    res.status(500).json({ error: "Error al obtener carrito del usuario" });
  }
};
