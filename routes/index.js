const express = require('express');
const router = express.Router();
const wikiRoutes = require('./wiki');

router.get('/', (req, res) => {
  res.redirect('/wiki');
})

router.use('/wiki', wikiRoutes);

module.exports = router;
