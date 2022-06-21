// Se importa el módulo express
const express = require('express');

// Se declara un objeto de tipo router
const router = express.Router();

//Trae los controladores del jugador
const usuarioSTEAMController = require('../controllers/usuarioSTEAM');

//Registra un nuevo usuario en la base de datos desde el juego
router.post('/agregarUsuarioSTEAM', usuarioSTEAMController.postRegistroUsuarioSTEAM);

//Muestra el html del formulariod e registro
router.get('/formularioRegistro', usuarioSTEAMController.getFormularioRegistro);

//Página principal
router.get('/principal', usuarioSTEAMController.getPaginaPrincipal);

//Muestra el formulario de inicio de sesión
router.get('/iniciarSesion', usuarioSTEAMController.getLogin);

//inicio de sesión
router.post('/postIniciarSesion', usuarioSTEAMController.postIniciarSesion);

//Redirigir a la página de confirmación
router.get('/confirmacion', usuarioSTEAMController.getConfirmacion);

//Redirigir a tablero de datos
router.get('/tablero',usuarioSTEAMController.getTablero);

// Se exporta el router
module.exports = router;