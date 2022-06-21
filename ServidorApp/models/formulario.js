// Importando el módulo para realizar la conexión con la base de datos
const Sequelize = require('sequelize');

const Formulario = (sequelize)=>{
    sequelize.define('Formulario',{
        idFormulario:{
            type: Sequelize.INTEGER,
            allownull: false,
            primaryKey: true,
            autoIncrement: true
        },
        carreraInteresInicial:{
            type: Sequelize.STRING(30),
            allowNull: false
        },
        familiarIngeniero:{
            type: Sequelize.STRING(2),
            allowNull: false, //cambiar despues de asesoria
        },
        sabesSTEAM:{
            type: Sequelize.STRING(8),
            allowNull: false, //cambiar despues de asesoria
        },
        estudiarIngenieria:{
            type: Sequelize.STRING(2),
            allowNull: false,
        }
    })
}
// Exportamos el modelo
module.exports = Formulario;