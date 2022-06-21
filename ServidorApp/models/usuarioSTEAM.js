// Importando el módulo para realizar la conexión con la base de datos
const Sequelize = require('sequelize');
// Definir el modelo de la entidad Jugadas
const STEAM = (sequelize)=>{
    sequelize.define('STEAM',{
        correoElectronico:{
            type: Sequelize.STRING(50),
            allowNull: false,
            primaryKey: true
        },
        contrasena: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        nombre: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        apellidoPaterno: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        apellidoMaterno: {
            type: Sequelize.STRING(50),
            allowNull: false
        }, 
        puesto: {
            type: Sequelize.STRING(50),
            allowNull: false
        }
    })
}

// Exportamos el modelo
module.exports = STEAM;