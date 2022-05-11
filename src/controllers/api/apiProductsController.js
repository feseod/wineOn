const db = require('../../../database/models');
//const sequelize = db.sequelize;

const apiProductsController = {
    list:(req,res)=>{
       db.Vino.findAll({
            include: [{association: "unaBodega"}, {association: "unaCepa"}]
        })
        .then(vinos=> {
                let arrayVinos = vinos.map(vino=> {
                    return {
                        id: vino.id,
                        name: vino.nombre,
                        price: vino.precio,
                        fee: vino.cuotas,
                        discount: vino.descuento,
                        description: vino.descripcion,
                        urlImage: "http://localhost:3500/images/products/" + vino.imagen,
                        stock: vino.stock,
                        cepa: vino.unaCepa.nombre,
                        bodega: vino.unaBodega.nombre  
                    }
                })
                let santaJulia = vinos.filter(vino =>{ return vino.bodegaid == 1});
                let norton = vinos.filter(vino =>{ return vino.bodegaid == 2});
                let rutini = vinos.filter(vino =>{ return vino.bodegaid == 3});
                let tintos = vinos.filter(vino =>{ return vino.cepaid == 1 || vino.cepaid == 2});
                let blancos = vinos.filter(vino =>{ return vino.cepaid == 3 || vino.cepaid == 4});
               
                return res.json({
                    totalWines: vinos.length,
                        santaJulia: santaJulia.length,
                        norton: norton.length,
                        rutini: rutini.length ,
                        tintos: tintos.length,
                        blancos: blancos.length
                    ,
                    wines: arrayVinos,
                    detail: "/api/products" 
                })
        })
        .catch(function(error){
            res.json({status:800})
        })
    },

    detail:(req,res)=>{
        let elVino = db.Vino.findByPk(req.params.id, {
            include: [{association: "unaBodega"}, {association: "unaCepa"}]
        })

       let lasBodegas = db.Bodega.findAll();
       let lasCepas = db.Cepa.findAll();

       Promise.all([elVino, lasBodegas, lasCepas])
        .then(([vino, bodegas, cepas])=>{
            return res.json({
                wine: {
                    id: vino.id,
                    name: vino.nombre,
                    price: vino.price,
                    fee: vino.cuotas,
                    discount: vino.descuento,
                    description: vino.descripcion,
                    image: "/images/products" + vino.imagen,
                    stock: vino.stock,
                    cepa: vino.unaCepa.nombre,
                    bodega: vino.unaBodega.nombre
                },
                cepas: cepas,
                bodegas: bodegas
            })
        })
        .catch(function(error){
            res.json({status:800})
        })
    },

    ultimo: (req, res) => {
        db.Vino.findAll({order:[["id", "DESC"]], limit:1 }, {include: [{association: "unaBodega"}, {association: "unaCepa"}]})
        
        
        .then(function (vino) {
            //product[0].setDataValue("endpoint", "/api/products/lastProduct/" + vino.length)
            return res.json({
                wine: {
                    id: vino.id,
                    name: vino.nombre,
                    price: vino.price,
                    fee: vino.cuotas,
                    discount: vino.descuento,
                    description: vino.descripcion,
                    image: "/images/products" + vino.imagen,
                    stock: vino.stock,
                    cepa: vino.unaCepa.nombre,
                    bodega: vino.unaBodega.nombre
                },
                url: "/api/products/lastProduct"
            })
        })
        
    }


}

module.exports = apiProductsController;