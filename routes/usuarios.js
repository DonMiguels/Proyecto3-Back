const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Crear usuario
router.post('/registro', async (req, res) => {
  const { nombre_usuario, correo, contrasena, tipo_usuario } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO usuarios (nombre_usuario, correo, contrasena, tipo_usuario)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [nombre_usuario, correo, contrasena, tipo_usuario || 'normal']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login (solo validación básica por nombre y contraseña)
router.post('/login', async (req, res) => {
  const { nombre_usuario, contrasena } = req.body;
  try {
    const result = await db.query(
      `SELECT * FROM usuarios WHERE nombre_usuario = $1 AND contrasena = $2`,
      [nombre_usuario, contrasena]
    );
    if (result.rows.length > 0) res.json(result.rows[0]);
    else res.status(401).json({ mensaje: 'Credenciales incorrectas' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Editar perfil
router.put('/:id', async (req, res) => {
  const { nombre_usuario, correo, contrasena } = req.body;
  try {
    const result = await db.query(
      `UPDATE usuarios SET nombre_usuario=$1, correo=$2, contrasena=$3 WHERE id=$4 RETURNING *`,
      [nombre_usuario, correo, contrasena, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Borrar cuenta
router.delete('/:id', async (req, res) => {
  try {
    await db.query(`DELETE FROM usuarios WHERE id=$1`, [req.params.id]);
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
