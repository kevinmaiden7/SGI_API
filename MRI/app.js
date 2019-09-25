var createError = require('http-errors');
var express = require('express');
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

// MIDDLEWARES
app.use(express.json());

app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if(req.method ==='OPTIONS'){
  res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
  return res.status(200).json({});
  }
  next();
  });

//GET
app.get('/incidentes', async function (req, res) {
  results = [];
  await db.collection('incidentes').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let data = doc.data();
        data.id = doc.id;
        results.push(data);
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

app.get('/incidentes/autor/:id', async function (req, res) {
  id = req.params.id;
  results = [];
  await db.collection('incidentes').where('autor', '==', id).get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }

      snapshot.forEach(doc => {
        let data = doc.data();
        data.id = doc.id;
        results.push(data);
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });

    res.send(results);
});

app.get('/lecciones', async function (req, res) {
  results = [];
  await db.collection('lecciones').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let data = doc.data();
        data.id = doc.id;
        results.push(data);
      });
    })
    .catch(error => {
      console.log(error);
    });
  res.send(results);
});

//POST

app.post('/incidentes/', function (req, res) {
  let data = req.body;

  db.collection('incidentes').add(data)
    .then(() => {
      res.send("Object added");
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
