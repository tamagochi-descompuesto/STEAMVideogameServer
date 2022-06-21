const Formulario = require('../util/database').models.Formulario;
const path = require('path');

//Se crea el registro del formulario con los datos proporcionados por el usuario
exports.getRegistroFormulario = (req,res)=>{
    //Se crea el registro del formulario
    Formulario.create({
        JugadorUsername: req.query.username,
        carreraInteresInicial: req.query.carreraInteresInicial,
        familiarIngeniero: req.query.familiarIngeniero,
        sabesSTEAM: req.query.sabesSTEAM,
        estudiarIngenieria: req.query.estudiarIngenieria,
    }).then(resultado=>{
        //Una vez realizado, se redirige a la página de confirmacion
        res.redirect("/jugador/confirmacion?username=" + req.query.username);
    }).catch(error=>{
        //En caso de error, se envía el error.
        res.send(error);
    });
};