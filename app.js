const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/usuarios', require('./routes/usuarios'));
app.use('/canciones', require('./routes/canciones'));
app.use('/listas', require('./routes/listas'));
app.use('/api/jamendo', require('./routes/jamendo')); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
