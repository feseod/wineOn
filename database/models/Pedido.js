module.exports = function(sequelize, dataTypes) {
    let alias = "Pedido"; //como llamaremos al modelo en el codigo

    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        usuarioid:{
            type: dataTypes.INTEGER,
            allowNull: false
        },
        cantidad:{
            type: dataTypes.INTEGER,
            allowNull: false
        },
        fecha_pedido:{
            type: dataTypes.DATE,
            allowNull: false
        }
    }

    let config = {
        tableName: "pedidos", //el nombre de la base de datos
        timestamps: false
    }

    let Pedido = sequelize.define(alias, cols, config);

    Pedido.associate = function(models) {
        Pedido.belongsTo(models.Usuario, {
            as: "unUsuario",
            foreignKey: "usuarioid"
        });

        Pedido.belongsToMany(models.Vino, {
            as: "muchosvinos",
            through: "pedidos_vinos",
            foreignKey: "pedidoid",
            otherKey: "vinoid",
            timestamps: false
        });
    }

    return Pedido;
}