/*
*Servidor web para el proyecto
*Autores: Erick Hernández Silva, Jacqueline Zavala, Israel Sánchez, 
*Erick Bustos, David Rodriguez
*/

//Biblioteca para definir lo que es un JSON
const bodyParser = require("body-parser");

//Biblioteca para generar las rutas de acuerdo al sistema operativo
const path = require("path");

//Importar la biblioteca express para la creación de servidores
const express = require('express');

//Traer la conexión de la base de datos
const sequelize = require('./util/database');

//Traer las rutas de usuario
const jugadorRoutes = require('./routes/jugador');

//Traer las rutas de formulario
const formularioRoutes = require('./routes/formulario');

const partidaRoutes = require('./routes/partida');

//Traer las rutas de usuarioSTEAM
const usuarioSTEAMRoutes = require('./routes/usuarioSTEAM');

// Traer las rutas de jugadas
const jugadasRoutes = require('./routes/jugadas');

//Crear el servidor
const app = express();

//Establecer un middleware para configura la ubicación de nuestros elementos públicos
app.use(express.static(path.join(__dirname, 'public')));

//Middleware para configura la definicion de un JSON
app.use(bodyParser.json());

//Middleware para configurar la recepción de formularios
app.use(bodyParser.urlencoded({ extended: true }));

//Configurar visualización de plantills
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//Trae las rutas de Jugador
app.use('/jugador', jugadorRoutes);

//Trae las rutas de Jugador
app.use('/formulario', formularioRoutes);

app.use('/partida', partidaRoutes);

//Traae las rutas de usuarioSTEAM
app.use('/usuarioSTEAM', usuarioSTEAMRoutes);


// Trae las rutas de Jugadas
app.use('/jugadas', jugadasRoutes);

//puerto
let puerto = 8080;

//Corre el servidor
sequelize.sync({force: false})
    .then(resultado => {
        console.log('Conexión exitosa');
        //Lanza el servidor para escuchar peticiones
        app.listen(puerto, () => console.log("Servidor en línea en el puerto 8080"));
    })
    .catch(error => console.log(error));
