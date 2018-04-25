const express = require('express');
const router = express.Router();
const wikiRoutes = require('./wiki');
const userRoutes = require('./user');

router.get('/', (req, res) => {
  res.redirect('/wiki');
})

router.use('/wiki', wikiRoutes);
router.use('/users', userRoutes);

module.exports = router;
