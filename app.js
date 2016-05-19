var express = require('express');
var app = express();

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  partialsDir: __dirname + '/views/partials',
  helpers: {
  }
}));
app.set('view engine', 'handlebars');

var sassMiddleware = require('node-sass-middleware');
var path = require('path');
app.use(sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/prefix'
}));

app.use(express.static('public'));

var content = require(__dirname + '/content.json').content;
var stringified = [];
content.forEach(function(c) {
  stringified.push(JSON.stringify(c));
});
content = stringified;

app.get('/', function (req, res) {
  res.render('index', {"content": content});
});

app.listen(process.env.PORT || 5000, function () {
  console.log('App listening');
});
