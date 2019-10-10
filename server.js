const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors');

const incidentesRoute = require('./MRI/app');
const leccionesRoute = require('./MLA/app');
const gestionIncidentesRoute = require('./MGI/app');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/incidentes', incidentesRoute); // Ruta de acceso a la API de reporte de incidentes
app.use('/lecciones', leccionesRoute); // Ruta de acceso a la API de lecciones
app.use('/gestion-incidentes', gestionIncidentesRoute); // Ruta de acceso a la API de lecciones

var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.json({"SGI": "API"});
});

const server = app.listen(port, function(){
    console.log('Server running on port %d', port);
});
