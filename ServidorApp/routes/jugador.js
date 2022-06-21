// Se importa el módulo express
const express = require('express');
// Se declara un objeto de tipo router
const router = express.Router();
//Trae los controladores del jugador
const JugadorController = require('../controllers/jugador');

//Registra un nuevo usuario en la base de datos desde el juego
router.post('/registro', JugadorController.postRegistroJugador);

//Muestra el html de formulario de registro
router.get('/formularioRegistro', JugadorController.getFormularioRegistro);

//Redirigir a la página de confirmación
router.get('/confirmacion', JugadorController.getConfirmacion);


//Inicia la sesión de un jugador
router.post('/iniciarSesion',JugadorController.postIniciarSesion);

// Cambia los datos del jugador
router.post('/editarPerfil', JugadorController.postEditarPerfil)
// Se exporta el router
//Página principal
router.get('/principal', JugadorController.getPaginaPrincipal);

// Descargar juego
router.get('/descargarJuego', JugadorController.getDescargarJuego);

//Se exporta el router
module.exports = router;