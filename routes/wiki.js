const express = require('express');
const models = require('../models');
const Page = models.Page;
const User = models.User;
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/');
});

router.post('/', (req, res) => {
  const page = Page.build({
    title: req.body.title,
    content: req.body.content
  });

  page.save().then(() => {
    res.json(page);
  });
});

router.get('/add', (req, res) => {
  res.render('addpage');
})

module.exports = router;
