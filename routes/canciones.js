const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Obtener todas las canciones
router.get('/', async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM canciones`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Subir canción (por autor)
router.post('/', async (req, res) => {
  const { titulo, archivo_url, duracion_segundos, categoria, autor_id, peso_mb } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO canciones (titulo, archivo_url, duracion_segundos, categoria, autor_id, peso_mb)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [titulo, archivo_url, duracion_segundos, categoria, autor_id, peso_mb]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Buscar canciones (por título)
router.get('/buscar', async (req, res) => {
  const { q } = req.query;
  try {
    const result = await db.query(
      `SELECT * FROM canciones WHERE LOWER(titulo) LIKE LOWER($1)`,
      [`%${q}%`]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
