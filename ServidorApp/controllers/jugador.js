const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Jugador = require('../util/database').models.Jugador;
const { encrypt, decrypt } = require('../util/crypto');

//Crea el registro del jugador y redirecciona para crear el registro de su formulario
exports.postRegistroJugador = (req,res)=>{
    //El body del JSON lo asigna a la variable object.
    var object = req.body
    //Se encripta la contraseña que el jugador eligió
    var hashedPassword = encrypt(object.password);
    //Concatena el iv y la contraseña encriptada separados por un "|".
    var pass = hashedPassword.iv+ '|' + hashedPassword.content
    //Se crea el registro del jugador
    Jugador.create({
        username: object.username,
        password: pass,
        genero: object.genero,
        estadoResidencia: object.estadoResidencia,
        escolaridad: object.escolaridad,
        correo: object.correo,
        fechaNacimiento: object.fechaNacimiento,
    }).then(resultado=>{
        //Crea la url de redireccionamiento para crear el registro del formulario
        var url = "/formulario/registro?username=" + object.username + "&carreraInteresInicial=" + object.carreraInteresInicial + "&familiarIngeniero=" + object.familiarIngeniero + "&sabesSTEAM=" + object.sabesSTEAM + "&estudiarIngenieria=" + object.estudiarIngenieria;
        //redirige para realizar el registro del formulario
        res.redirect(url);
        })
      .catch(error=>{
          /*Si hay un error, nos redirige a la misma página de registro
          pero con un código de error (1) para desplegar la alerta
          de que el usuario o correo electrónico ya están en uso*/
          res.redirect("formularioRegistro?error=1")
        });
};

// Muestra la página de confirmación
exports.getConfirmacion = (req,res)=>{
    //Busca la información del jugador.
    Jugador.findByPk(req.query.username)
    .then(resultado => {
        //Genera el JSON para desencriptar la contraseña y mostrarla en la página web
        var jsonDecrypt = {
            iv: resultado.password.split('|')[0],
            content: resultado.password.split('|')[1]
        };
        //Se renderiza la página de confirmación y se envían las variables necesarias
        res.render('confirmacion.html', {
            username: resultado.dataValues.username,
            password: decrypt(jsonDecrypt),//Se desencripta la contraseña.
            genero: resultado.dataValues.genero,
            estadoResidencia: resultado.dataValues.estadoResidencia,
            escolaridad: resultado.dataValues.escolaridad,
            correo: resultado.dataValues.correo,
            fechaNacimiento: resultado.dataValues.fechaNacimiento,
            fechaRegistro: resultado.dataValues.fechaRegistro
        })
    });
}

// Muestra el formulario de registro
exports.getFormularioRegistro = (req,res)=>{
    //Si no hay ningun query quiere decir que no hay errores
    if(req.query == {})
    {
        res.render('registro.html', {
            error: 0
        });
    }
    else
    {
        //renderiza la pagina de registro con un código de error para mostrar el error
        res.render('registro.html', {
            error: req.query.error
        });
    }
}

//Permite que el jugador inicie sesión a través del cliente
exports.postIniciarSesion = (req,res) => {
    //asignamos los datos del jugador a la variable object
    var object = JSON.parse(req.body.datosJSON)
    //Buscamos en los registros que efectivamente el jugador exista.
    Jugador.findByPk(object.username)
        .then(jugador => {
            //Si el jugador existe
            if(jugador){
                //Creamos el JSON para desencriptar la contraseña
                var jsonDecrypt = {
                    iv: jugador.password.split('|')[0],
                    content: jugador.password.split('|')[1]
                };
                /*Si el usuario es exactamente igual al ingresado y la contraseña
                es exactamente igual a la ingresada*/
                if(jugador.username == object.username && decrypt(jsonDecrypt) == object.password){
                    //Entonces buscamos su última partida que esté "En progreso"
                    sequelize.query("select TOP 1 * from partida Where JugadorUsername = '"+ object.username + "' AND estatus = 'En progreso' order by idPartida DESC",{
                        type: Sequelize.QueryTypes.SELECT
                    }).then(ultimaPartida => {
                        //Si tiene una última partida devuelto el array debe tener al menos un índice
                        if(ultimaPartida.length > 0)
                        {
                            /*Igualamos la última partida contenida en el índice 0 del array
                            en a la variable partida
                            */
                            var partida = ultimaPartida[0];
                            /*Se crea el JSON para enviarle al cliente y 
                            hacerle saber que tiene una partida*/
                            var datosUsuario = {
                                username: jugador.username,
                                correo: jugador.correo,
                                idPartida: partida.idPartida
                            }
                            //Se envían los datos al cliente
                            res.send(datosUsuario);
                        }
                        else//Si no tiene una partida creada
                        {
                            //se redirige a la ruta con los datos del jugador para crearle una partida
                            res.redirect('/partida/agregarPartida?username='+ jugador.username + '&correo=' + jugador.correo);
                        }

                    }).catch(err=>{
                        //Si no tiene, manda un 0 que indique que no tiene partidas.
                        var datosUsuario = {
                            username: jugador.username,
                            correo: jugador.correo,
                            idPartida: 0
                        }
                        res.send(JSON.parse(datosUsuario));
                    })
                }
                else{
                    /*Si el usuario o la contraseña no son iguales a los almacenados
                    entonces se envía el estatus "failed"*/
                    res.send('failed');
                }
            }
            else{
                //Si no existe el usuario, se envía el estatus "failed"
                res.send("failed")
            }
        })
}

//Modifica los datos del Jugador especificado;
exports.postEditarPerfil = (req,res) => {
    //Se igualan los datos nuevos del usuario a la variable object
    var object = JSON.parse(req.body.datosJSON);
    //se encripta la nueva contraseña
    var hashedPassword = encrypt(object.password);
    //se crea la cadena que contiene la contraseña encriptada
    var pass = hashedPassword.iv+ '|' + hashedPassword.content
    //se hace el update al registro del jugador.
    Jugador.update({
        password: pass,
        correo: object.correo
        },{
        where: {
            username: object.username
        }
    }).then(resultado=>{
        //se envía el estatus "success" cuando todo se hace correctamente
        res.send("success");
    }).catch(error=>{
        //se envía el estatus "error" si sucede algún error.
        res.send("error");
    })
};

//Envía la página principal del jugador para visualizar en el navegador
exports.getPaginaPrincipal = (req, res) => {
    res.sendFile(path.join(__dirname,'..','views','principal.html'));
}

//Descarga el instalador del juego
exports.getDescargarJuego = (req, res) =>{
    if(req.query.plataforma == "Windows"){
        res.download(path.join(__dirname,'..','public','resources','IT.zip'));
    }
    if(req.query.plataforma == "MacOS"){
        res.download(path.join(__dirname,'..','public','resources','IT.app.zip'));
    }
}
