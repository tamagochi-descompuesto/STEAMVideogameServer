const path = require('path');
const STEAM = require('../util/database').models.STEAM;
const { encrypt, decrypt } = require('../util/crypto');

//Se hace el registro del usuario steam
exports.postRegistroUsuarioSTEAM = (req, res) => {
    //Si la contraseña de administrador es correcta
    if(req.body.adminPass == 'ea9a2bc36f8d4ac63d5771b25302f5835381477d29eb9728a2d6efd75c6695550680c243ec8b8d7e3ef5f0fde720c1111784'){
        //se encripta la contraseña del usuario STEAM
        var hashedPassword = encrypt(req.body.contrasena);
        //Se crea el string de la contraseña encriptada
        var pass = hashedPassword.iv+ '|' + hashedPassword.content
        //Se crea el registro del usuario STEAM
        STEAM.create({
            correoElectronico: req.body.correoElectronico,
            contrasena: pass,
            nombre: req.body.nombre,
            apellidoPaterno: req.body.apellidoPaterno,
            apellidoMaterno: req.body.apellidoMaterno,
            puesto: req.body.puesto
        }).then(resultado=>{
            //Se redirige a la pagina de confirmación
            res.redirect("confirmacion?correoElectronico="+resultado.dataValues.correoElectronico)
        }).catch(error=>{
            //Envía el error en caso de que haya sucedido un error
            res.redirect("formularioRegistro?error=2");
        })
    }else{
        res.redirect("formularioRegistro?error=1");
    }
    
};
//Permite iniciar sesión al usuario STEAM
exports.postIniciarSesion = (req,res) => {
        //encuentra al usuario STEAM con su correo
        STEAM.findByPk(req.body.correoElectronico)
        .then(usuario => {
            //crea el JSON para desencriptar la contraseña
            var jsonDecrypt = {
                iv: usuario.dataValues.contrasena.split('|')[0],
                content: usuario.dataValues.contrasena.split('|')[1]
            };
            //Si el correo y la contraseña son iguales
            if(usuario.username == req.body.username && decrypt(jsonDecrypt) == req.body.contrasena){
                //redirige al tablero
                res.redirect("tablero")
            }
            else{
                //si no, envía que la contraseña es incorrecta.
                res.redirect("iniciarSesion?error=1");
            }
        }).catch(error=>{
            //Envía que el correo no está registrado
            res.redirect("iniciarSesion?error=2");
        })
}

//Envía la página principal de STEAM
exports.getPaginaPrincipal = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/views', '/principalSTEAM.html'));
}

//Muestra el formulario de registro
exports.getFormularioRegistro = (req, res) => {
    //res.sendFile(path.join(__dirname, '..', '/views', '/registroSTEAM.html'));
    if(req.query == {})
    {
        res.render('registroSTEAM.html', {
            error: 0
        });
    }
    else
    {
        res.render('registroSTEAM.html', {
            error: req.query.error
        });
    }
}

//Muestra la página del login
exports.getLogin = (req, res) => {
    //res.sendFile(path.join(__dirname, '..', '/views', '/loginSTEAM.html'));
    if(req.query == {})
    {
        res.render('loginSTEAM.html', {
            error: 0
        });
    }
    else
    {
        res.render('loginSTEAM.html', {
            error: req.query.error
        });
    }
}

//Muestra el tablero
exports.getTablero = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/views', '/tableu.html'));
}

//Muestra la confirmación del registro del usuario STEAM
exports.getConfirmacion = (req, res) => {
    //Busca el registro
    STEAM.findByPk(req.query.correoElectronico)
    .then(resultado => {
        //Genera el JSON para desencriptar la contraseña
        var jsonDecrypt = {
            iv: resultado.contrasena.split('|')[0],
            content: resultado.contrasena.split('|')[1]
        };
        //renderiza la pagina con los datos del usuario STEAM
        res.render('confirmacionSTEAM.html', {
            correoElectronico: resultado.dataValues.correoElectronico,
            contrasena: decrypt(jsonDecrypt), //desencripta la contraseña
            nombre: resultado.dataValues.nombre,
            apellidoPaterno: resultado.dataValues.apellidoPaterno,
            apellidoMaterno: resultado.dataValues.apellidoMaterno,
            puesto: resultado.dataValues.puesto
        })
    });
}