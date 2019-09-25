var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const admin = require('firebase-admin');

var app = express();

let results = [];

// Conexión a Firebase
let serviceAccount = require('../firebase_key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
let db = admin.firestore(); // Acesso a Firestore

app.get('/incidentes', async function (req, res) {
  results = [];
  await db.collection('incidentes').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        //console.log(doc.id, '=>', doc.data()); 
        let data = doc.data();
        data.id = doc.id;
        results.push(data);
        //res.send(results);        
      });
    })
    .catch(error => {
      console.log(error);
    });
  res.send(results);
});

app.get('/incidentes/:id', function (req, res) {
  id = req.params.id;

  db.collection('incidentes').doc(id).get() 
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        res.send(doc.data());
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });   
});

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
  res.json({
    message: res.local.message,
    error: res.locals.error
  });
});

module.exports = app;
