# SGI_API

API para el proyecto de Sistema de Gestión de Incidentes.

## Endpoints

### Reporte de Incidentes

- `https://sgi-web-api.herokuapp.com/incidentes` `GET` traer todos los incidentes.
- `https://sgi-web-api.herokuapp.com/incidentes` `POST` agregar un incidente.
- `https://sgi-web-api.herokuapp.com/ìncidentes/{incidenteId}` `GET` traer un incidente por ID.
- `https://sgi-web-api.herokuapp.com/incidentes/autor/{autorId}` `GET` traer incidentes de un autor por ID.
- `https://sgi-web-api.herokuapp.com/incidentes/investigador/{investigadorId}` `GET` traer incidentes en los cuales un investigador este asignado.

### Gestión de Incidentes
- `https://sgi-web-api.herokuapp.com/gestion-incidentes/{incidenteId}` `PUT` actualizar un registro de incidente (añadir comentarios, cambiar estado, actualizar descripción).

### Lecciones

- `https://sgi-web-api.herokuapp.com/lecciones` `GET` traer  todas lecciones aprendidas.
- `https://sgi-web-api.herokuapp.com/lecciones` `POST` agregar una lección aprendida.
