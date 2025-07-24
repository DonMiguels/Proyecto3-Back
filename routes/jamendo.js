
const express = require('express');
const axios = require('axios');
const router = express.Router();

const JAMENDO_CLIENT_ID = '9ed3962f';

router.get('/buscar', async (req, res) => {
  const query = req.query.q || '';
  try {
    const response = await axios.get('https://api.jamendo.com/v3.0/tracks', {
      params: {
        client_id: JAMENDO_CLIENT_ID,
        format: 'json',
        limit: 20,
        namesearch: query,
      },
    });

    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
