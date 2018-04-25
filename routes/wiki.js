const express = require('express');
const models = require('../models');
const Page = models.Page;
const User = models.User;
const router = express.Router();

router.get('/', (req, res) => {
Page.findAll()
.then((pages) => {
  res.render('index', {pages})
  })
});

router.post('/', (req, res, next) => {

  User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email
    }
  })
  .then(function (values) {

    const user = values[0];

    const page = Page.build({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status
    });

    return page.save().then(function (page) {
      return page.setAuthor(user);
    });

  })
  .then(function (page) {
    res.redirect(page.urlTitle);
  })
  .catch(next);




  // const page = Page.build({
  //   title: req.body.title,
  //   content: req.body.content,
  //   status: req.body.status
  // })
  // const user = User.findorCreate({
  //   name: req.body.name,
  //   email: req.body.email
  // });

});

router.get('/add', (req, res) => {
  res.render('addpage');
})

router.get('/:urlTitle', (req, res) => {
  // res.send("you reached the wiki pg route"+ req.params.urlTitle);
  Page.findOne({
    where: {urlTitle: req.params.urlTitle}
  })
  .then(page => {
    res.render('wikipage', {page});
  })
})

module.exports = router;
