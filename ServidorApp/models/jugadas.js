// Importando el módulo para realizar la conexión con la base de datos
const Sequelize = require('sequelize');
// Definir el modelo de la entidad Jugadas
const Jugadas = (sequelize)=>{
    sequelize.define('Jugadas',{
        idJugadas:{
            type: Sequelize.INTEGER,
            allownull: false,
            primaryKey: true,
            autoIncrement:true,
        },
        minijuego:{
            type: Sequelize.STRING(30),
            allownull: false
        },
        fechaInicio: {
            type: Sequelize.DATE,
            allownull: false,
        },
        fechaFinal: {
            type: Sequelize.DATE,
            allownull: true
        },
        puntaje: {
            type: Sequelize.INTEGER,
            allownull: false
        }
    })
}
// Exportamos el modelo
module.exports = Jugadas;