module.exports = function(sequelize, dataTypes) {
    let alias = "Cepa"; //como llamaremos al modelo en el codigo

    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre:{
            type: dataTypes.STRING,
            allowNull: false
        }
    }

    let config = {
        tableName: "cepas", //el nombre de la base de datos
        timestamps: false
    }

    let Cepa = sequelize.define(alias, cols, config);

    Cepa.associate = function(models) {
        Cepa.hasMany(models.Vino, {
            as: "muchosVinos",
            foreignKey: "cepaid"
        });
    }

    return Cepa;
}