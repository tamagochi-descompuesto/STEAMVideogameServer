// Importando el módulo para realizar la conexión con la base de datos
const Sequelize = require('sequelize');

const Jugador = (sequelize)=>{
    sequelize.define('Jugador',{
        username:{
            type: Sequelize.STRING(50),
            allowNull: false,
            primaryKey: true
        },
        password:{
            type: Sequelize.STRING(1000),
            allowNull: false
        },
        genero:{
            type: Sequelize.STRING(20),
            allowNull: false, //cambiar despues de asesoria
        },
        estadoResidencia:{
            type: Sequelize.STRING(50),
            allowNull: false, //cambiar despues de asesoria
        },
        escolaridad:{
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        correo:{
            type: Sequelize.STRING(150),
            allowNull: false,
            unique: true
        },
        fechaNacimiento:{
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        fechaRegistro:{
            type: Sequelize.DATEONLY,
            allowNull: false,
            defaultValue: Sequelize.fn('GETDATE')
        }
    })
}

// Exportamos el modelo
module.exports = Jugador;