// Se importa el módulo express
const express = require('express');

// Se declara un objeto de tipo router
const router = express.Router();

//Trae los controladores dle jugador
const formularioController = require('../controllers/formulario')

// Crear el registro con la información del usuario en la tabla formulario
router.get('/registro',formularioController.getRegistroFormulario);

// Se exporta el router
module.exports = router;