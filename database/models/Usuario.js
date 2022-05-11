module.exports = function(sequelize, dataTypes) {
    let alias = "Usuario";

    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        first_name:{
            type: dataTypes.STRING,
            allowNull: false
        },
        last_name:{
            type: dataTypes.STRING,
            allowNull: false
        },
        mail:{
            type: dataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        dni:{
            type: dataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        imagen:{
            type: dataTypes.STRING,
            allowNull: true,
        },
        contrasenia:{
            type: dataTypes.STRING,
            allowNull: false,
        },
        domicilio:{
            type: dataTypes.STRING,
            allowNull: false,
        },
        nacimiento:{
            type: dataTypes.DATE,
            allowNull: false,
        },
        enabled:{
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1,
        },
        admin:{
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0,
        },
    }

    let config = {
        tableName: "usuarios", //el nombre de la base de datos
        timestamps: false
    }

    let Usuario = sequelize.define(alias, cols, config);

    Usuario.associate = function(models) {
        Usuario.hasMany(models.Pedido, {
            as: "muchosPedidos",
            foreignKey: "usuarioid"
        });
    }

    return Usuario;
}