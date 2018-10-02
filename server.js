const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var port = process.env.PORT || 3000;
var app = express();

// middleware ---
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) console.log('Unable to append to server log');
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));
// --------------

// helpers ---
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase(text);
});
// -----------

// HOME PAGE ---------------------------
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle:'Home Page',
    welcomeMessage: 'Welcome to our website',
  });
});
//--------------------------------------


// ABOUT PAGE --------------------------
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle:'About Page',
  });
});
//--------------------------------------


// BAD PAGE ----------------------------
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request.'
  })
});
//--------------------------------------


// TERMINAL NOTIFICATION  --------------
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
//--------------------------------------
