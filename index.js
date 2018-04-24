const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const path = require('path');
const app = express();
const models = require('./models')

// nunjucks

app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', { noCache: true });

// logging

app.use(morgan('dev'));

// static

app.use(express.static(path.join(__dirname, '/public')));

// body parsing

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routes);

models.db.sync({force: true})
.then (() => {
  console.log('All tables added')
  app.listen(3000, () => {
    console.log('listening on port 3000');
  })
  
})
.catch(console.error.bind(console));



