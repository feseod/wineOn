const db = require("../../database/models");
const {validationResult} = require("express-validator");
const { Op } = require("sequelize");

//const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productController = {

    products: function(req, res) {
		db.Vino.findAll()
			.then(function(vinos) {
				 res.render("products", {vinos: vinos})
			})

			
    },

	//Muestra los vinos tintos
	vinosTintos: (req, res) => {
		db.Vino.findAll({ 
			where: {
				cepaid: [1, 2]
			}, include: [{association: "unaBodega"}, {association: "unaCepa"}]
	    })
	   .then(tintos=>{
		   
		   res.render("tintos", {tintos})
	   } )
	},

	//Muestra los vinos blancos
	vinosBlancos: (req, res) => {
		db.Vino.findAll({ 
			where: {
				cepaid: [3, 4]
			}, include: [{association: "unaBodega"}, {association: "unaCepa"}]
	    })
	   .then(blancos=>{
		   
		   res.render("blancos", {blancos})
	   } )
	},

    //muestra el detalle de producto
    detail:  (req, res) =>{
        db.Vino.findByPk(req.params.id, {
			include: [{association: "unaBodega"}, {association: "unaCepa"}, {association: "muchospedidos"}]
		})
			.then(function(vino) {
				res.render("productDetail", {vino:vino})
			})
    },

    //se muestra el formulario para agregar un producto
    showAdd: async function(req, res) {
		let cepas = await db.Cepa.findAll();
		let bodegas = await db.Bodega.findAll();

				
		await res.render("addProduct", {cepas, bodegas})
				
    },
    	
	addProduct: async (req, res) => {
		const resultadoValidacion = validationResult(req);

		let cepas = await db.Cepa.findAll();
		let bodegas = await db.Bodega.findAll();
		
		
		//validacion de campos del registro del producto (si estan o no completos) Me daba error de invalid value
		if (resultadoValidacion.errors.length > 0){
			
			
			return res.render("addProduct", {
				errors: resultadoValidacion.mapped(), //mapped toma un array y lo convierte en objeto literal
				oldData: req.body,
				cepas, 
				bodegas
			}  );
		}
		
		 //validacion de producto existente
		  db.Vino.findOne({
				where: {
					nombre: req.body.name
				}, include: [{association: "unaBodega"}, {association: "unaCepa"}]
		   })
		  .then(function(nombreVino) {
				if (nombreVino) {
					return res.render("addProduct",  {
						errors: {
							name: {
								msg: "El producto con ese nombre ya está registrado"
							}
						},
						oldData: req.body, cepas, bodegas,
					})
				
				} else {
		let img;
		if (!req.file) {
			img = null
		} else {
			img = req.file.filename
		} 
		 db.Vino.create({
			nombre: req.body.name,
			precio: req.body.price,
			cuotas: req.body.cuotas,
			descuento: req.body.discount,
			descripcion: req.body.descripcion,
			imagen: req.file.filename,
			bodegaid: req.body.bodega,
			cepaid: req.body.cepa,
			stock: req.body.unidades
		});
	  }
		     res.redirect("/productos");
		 })
	},

    //se muestra el formulario para edicion de productos
    formProduct: function (req, res){
		let elVino = db.Vino.findByPk(req.params.id, {
			include: [{association: "unaBodega"}, {association: "unaCepa"}, {association: "muchospedidos"}]
		})

		let lasBodegas = db.Bodega.findAll();
		let lasCepas = db.Cepa.findAll();

		Promise.all([elVino, lasBodegas, lasCepas])
			.then(function([vino, bodegas, cepas]) {
				res.render("editProduct", {vino:vino, bodegas: bodegas, cepas: cepas})
			})
    },

    //se edita el producto
    editProduct: async function (req, res) {
		const resultadoValidacion = validationResult(req);
		let vino = await db.Vino.findByPk(req.params.id);
		let cepas = await db.Cepa.findAll();
		let bodegas = await db.Bodega.findAll();
		
		//validacion de campos del registro del producto (si estan o no completos) Me daba error de invalid value
		if (resultadoValidacion.errors.length > 0){
			
			return res.render("editProduct", {
				errors: resultadoValidacion.mapped(), //mapped toma un array y lo convierte en objeto literal
				oldData: req.body,
				vino,
				cepas, 
				bodegas
			}  );
		}
		await db.Vino.update({
			nombre: req.body.name,
			precio: req.body.price,
			cuotas: req.body.cuotas,
			descuento: req.body.discount,
			descripcion: req.body.descripcion,
			bodegaid: req.body.bodega,
			cepaid: req.body.cepa,
			stock: req.body.unidades
		}, {where: {
			id: req.params.id
		}
		});
	
		res.redirect("/productos/detail/" + req.params.id);
    },

	formularioImagen: (req,res)=>{
		db.Vino.findByPk(req.params.id)
			.then(function(vino){
				res.render("editar-imagenProducto", {vino: vino})
			})			
	},

	editarImagen: async (req,res)=>{
		let vino = await db.Vino.findByPk(req.params.id);
		const resultadoValidacion = validationResult(req);
		
		//validacion de campos del registro del producto (si estan o no completos) Me daba error de invalid value
		if (resultadoValidacion.errors.length > 0){
			return res.render("editar-imagenProducto", {
				errors: resultadoValidacion.mapped(), //mapped toma un array y lo convierte en objeto literal
				vino
			});
		}

			await db.Vino.update({
			imagen: req.file.filename
			}, {
			where: {
				id: req.params.id
			}
			});	
		
		
		await res.redirect("/productos/detail/" + req.params.id);

	},


    //se elimina un producto
    deleteProduct: function (req, res){
		db.Vino.destroy({
			where: {
				id: req.params.id
			}
		})
		res.redirect("/productos")
    },

}

module.exports = productController;