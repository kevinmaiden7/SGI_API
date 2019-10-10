const admin = require('firebase-admin');

// Conexión a Firebase
let serviceAccount = require('./firebase_key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
let db = admin.firestore(); // Acesso a Firestore

module.exports = {db, admin};

