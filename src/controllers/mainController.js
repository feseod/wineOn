const db = require("../../database/models");
const { Op } = require("sequelize");


//Muestra en el home los ultimos agregados y los productos con descuento
const mainController = {
    index: async function (req, res) {
		    
            let ultimosAgregados = await db.Vino.findAll({order:[["id", "DESC"]], limit:9 })
            let conDescuento = await db.Vino.findAll({where: {descuento: {[Op.gt]: 0}}, limit:9 })

           
            
            
            await res.render("index", {ultimosAgregados, conDescuento})
            
    },

    //Buscador de productos
    buscador: function (req, res) {
        db.Vino.findAll({
            where: {
                [Op.or]: [ 
                    {nombre: {[Op.like]: "%" + req.query.buscador + "%"} },
                    {precio: {[Op.like]: "%" + req.query.buscador + "%"} },
                ]
            }
        }).then(vinos => {
            let search = req.query.buscador
            res.render('busqueda',{
                search,
                vinos:vinos
            })
        })
        
    },


    carrito: function (req, res) {
        res.render("productCart")
    },

    finalizado: function (req, res){
        res.render("finalizar")
    },

    contacto: function (req, res){
        res.render("contacto")
    },
    
    nosotros: function (req, res){
        res.render("nosotros")
    }
}


module.exports = mainController;



