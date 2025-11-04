Estoy por hacer un sistema lo más simple posible en Node.js con Express. Postgres en la base de datos (conectado con node-postgres) y vanilla JS en el frontend (conectado con el fetch que provee el JS). Quiero programar todo en Typescript, que la API sea REST. No necesito autenticación (supongo que existe una y que tengo una función de la base de datos que me devuelve el nombre de usuario en la aplicación y el grupo de usuarios (o rol) en la aplicación. 

Necesito un ejemplo de la tabla de Alumnos que tenga número de libreta (texto y PK), apellido, nombre (también textos) fecha de inscripción, edad a la fecha de inscripción (entero). 

Partes: 
1. script de creación de la tabla.
2. backend con los endpoints de GET /alumno/{pk} y /alumno (la lista), POST /alumno, PUT /alumno/{pk}, DEL /alumno/{pk} que hagan SELECT, INSERT, UPDATE y DELETE en la base
3. un menú simple que ofresca: agregar, modificar, borrar y ver (ver es una tabla que tiene los botones editar y borrar en cada fila) y abajo de todo hay un botón agregar, esos 3 botones van a la pantalla de alumno (tipo ficha, o sea un campo bajo el otro) y según por donde se entró hará nuevo, edición o borrado.

https://chat.deepseek.com/share/pkzne3i0luhufqkb3y
