const path = require('path');
const Partida = require('../util/database').models.Partida;
const sequelize = require('../util/database');
const Sequelize = require('sequelize');

/*
*Controladores que permiten llevar un control de las partidas
*Autor: Erick Hernández Silva
*/

// Se crea una nueva partida
exports.getCrearNuevaPartida = (req, res) => {
    //Se crea un registro de partida usando el username del jugador como llave foránea
    Partida.create({
        JugadorUsername: req.query.username
    }).then(resultado => {
        //Se encapsulan los datos importantes del usuario en un JSON
        var datosUsuario = {
            username: req.query.username,
            correo: req.query.correo,
            idPartida: resultado.dataValues.idPartida
        }
        //Se envían los datos del usuario para que el cliente pueda usarlos.
        res.send(datosUsuario);
        }).catch(error => {
            //Si sucede un error, se envía el mensaje "error"
            res.send("error")
        });
};

//Guarda la partida actual del jugador
exports.postGuardarPartida = (req,res) => {
    //Se parsea un JSON con los datos del jugador
    var object = JSON.parse(req.body.datosJSON);
    /* Se realiza el query para hacer un update a la base de datos con los nuevos 
        datos obtenidos desde el juego*/
    sequelize.query("UPDATE Partida SET puntuacionAcumulada=" + object.puntuacionAcumulada + ", vidas= "+object.vidas + ", inventario=" + object.inventario + " WHERE idPartida=(select TOP 1 idPartida from partida Where JugadorUsername = '"+ object.username + "' AND estatus = 'En progreso' order by idPartida DESC)")
    .then(resultado => {
        //Cuando es exitoso, se envía el mensaje "success" al cliente
        res.send("success");
    }).catch(error =>{
        //En caso contrario se envían los detalles del error.
        res.send(error)
    })
};

//Finaliza la partida actual del jugador.
exports.postFinalizarPartida = (req,res) => {
    //Se parsea un JSON con los datos del jugador
    var object = JSON.parse(req.body.datosJSON);
    /* Se realiza el query para hacer un update a la base de datos con los nuevos 
        datos obtenidos desde el juego*/
    sequelize.query("UPDATE Partida SET puntuacionAcumulada=" + object.puntuacionAcumulada + ", vidas= "+object.vidas + ", inventario=" + object.inventario + ", estatus='" + object.estatus +"', fechaFinal= GETDATE() WHERE idPartida=(select TOP 1 idPartida from partida Where JugadorUsername = '"+ object.username + "' AND estatus = 'En progreso' order by idPartida DESC)")
    .then(resultado => {
        //Cuando es exitoso, se envía el mensaje "success" al cliente
        res.send("success");
    }).catch(error =>{
        //En caso contrario se envían los detalles del error.
        res.send(error)
    })
};

//Envia el TOP 10 de mejores puntuaciones
exports.getMejoresPuntuaciones = (req,res) => {
    //Se realiza el query para obtener el TOP 10 de jugadores con mejores puntuaciones
    sequelize.query("SELECT TOP 10 JugadorUsername, puntuacionAcumulada FROM Partida WHERE puntuacionAcumulada > 0 AND estatus = 'Finalizada' ORDER BY puntuacionAcumulada DESC")
    .then(resultado => {
        //Se inicializa una variable top para guardar el top 10
        var top = "";
        /*Se itera la lista del top 10 para concatenarlos en un string 
        separados por el caracter "|" para que el cliente lo procese*/
        for (const jugador of resultado[0]){
            top += jugador.JugadorUsername + "|" + jugador.puntuacionAcumulada + "|"
        }
        //Se envía el string concatenado
        res.send(top);
    }).catch(error =>{
        //En caso de error, se envían los detalles del error.
        res.send(error)
    })
};
