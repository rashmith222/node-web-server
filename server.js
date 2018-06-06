const express = require('express');
const hbs = require('hbs');
var path = require('path');
var app = express();
const fs = require('fs');

const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append log to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// }); // for maintenance

app.get('/', (req, res) => {
  //res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: 'Andreq',
  //   likes: [
  //     'Biking',
  //     'Cities'
  //   ]
  // });
  var userName = process.env['USERPROFILE'].split('\\')[2];
  res.render('home.hbs', {
    pageTitle: 'Welcome to the party',
    welcomeMsgPerson: userName
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: "Unable to handle request"
  });
});

app.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
});
