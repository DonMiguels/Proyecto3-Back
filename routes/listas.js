const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Crear lista
router.post('/', async (req, res) => {
  const { nombre, usuario_id } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO listas_reproduccion (nombre, usuario_id)
       VALUES ($1, $2) RETURNING *`,
      [nombre, usuario_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Agregar canción a lista
router.post('/:id/canciones', async (req, res) => {
  const lista_id = req.params.id;
  const { cancion_id, orden } = req.body;
  try {
    await db.query(
      `INSERT INTO canciones_lista (lista_id, cancion_id, orden)
       VALUES ($1, $2, $3)`,
      [lista_id, cancion_id, orden || 1]
    );
    res.json({ mensaje: 'Canción agregada a la lista' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener canciones de una lista
router.get('/:id/canciones', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT c.* FROM canciones c
       JOIN canciones_lista cl ON c.id = cl.cancion_id
       WHERE cl.lista_id = $1 ORDER BY cl.orden`,
      [req.params.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Borrar lista
router.delete('/:id', async (req, res) => {
  try {
    await db.query(`DELETE FROM listas_reproduccion WHERE id = $1`, [req.params.id]);
    res.json({ mensaje: 'Lista eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
