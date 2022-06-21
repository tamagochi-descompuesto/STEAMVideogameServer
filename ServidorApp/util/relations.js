// Función que recibe el objeto de conexión
function applyRelations(sequelize){
    console.log(sequelize.models)
    const Jugador = sequelize.models.Jugador;
    const Formulario = sequelize.models.Formulario;
    const Jugadas = sequelize.models.Jugadas;
    const Partida = sequelize.models.Partida;

    //Un jugador puede tener un solo formulario
    //Jugador.belongsTo(Formulario);
    //Un formulario puede ser contestado solo por un jugador
    Formulario.belongsTo(Jugador);
    //Una partida puede ser asignada solo a un jugador
    Partida.belongsTo(Jugador);
    //Un jugador puede tener muchas partidas
    Jugador.hasMany(Partida);
    //Una jugada pertenece a una sola partida
    Jugadas.belongsTo(Partida);
    //Una partida puede tener muchas jugadas
    Partida.hasMany(Jugadas);
}

module.exports = {applyRelations};