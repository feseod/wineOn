module.exports = function(sequelize, dataTypes) {
    let alias = "Vino"; //como llamaremos al modelo en el codigo

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
        },
        precio:{
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        cuotas:{
            type: dataTypes.INTEGER,
            allowNull: false
        },
        descuento:{
            type: dataTypes.INTEGER,
            allowNull: false
        },
        descripcion:{
            type: dataTypes.TEXT,
            allowNull: false,
        },
        imagen:{
            type: dataTypes.STRING,
            allowNull: true,
        },
        stock:{
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        cepaid:{
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        bodegaid:{
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }

    let config = {
        tableName: "vinos", //el nombre de la base de datos
        timestamps: false
    }

    let Vino = sequelize.define(alias, cols, config);

    Vino.associate = function(models) {
        Vino.belongsTo(models.Bodega, {
            as: "unaBodega",
            foreignKey: "bodegaid"
        });

        Vino.belongsTo(models.Cepa, {
            as: "unaCepa",
            foreignKey: "cepaid"
        });

        Vino.belongsToMany(models.Pedido, {
            as: "muchospedidos",
            through: "pedidos_vinos",
            foreignKey: "vinoid",
            otherKey: "pedidoid",
            timestamps: false
        });
    }
    return Vino;
}