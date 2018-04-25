const express = require('express');
const models = require('../models');
const Page = models.Page;
const User = models.User;
const router = express.Router();

router.get('/', (req, res) => {
  User.findAll()
    .then(users => {
      res.render('users', {users});
    })
});

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id, {
      include: [Page]
  })
  .then(function (user) {
      res.render('userpages', {
          pages: user.pages,
          user
      });
  })
  .catch(next);
});

module.exports = router;
