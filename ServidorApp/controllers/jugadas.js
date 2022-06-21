const Jugadas = require('../util/database').models.Jugadas;
const path = require('path');

// Se crea el registro de una nueva jugada
exports.postAgregarJugada = (req,res) => {
    //se asignan los datos del jugador a la variable object
    var object = JSON.parse(req.body.datosJSON);
    //se crea el registro de la jugada con los datos de object
    Jugadas.create(object)
        .then(resultado =>{
            //se envía el estatus "success"
            res.send("success")
        }).catch(error=>{
            //se envía el estatus "error"
            res.send("error")
        });
};


