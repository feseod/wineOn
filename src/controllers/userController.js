const fs = require('fs');
const path = require('path'); 
const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator");
const db = require('../../database/models');


const userController = {
//Se muestra el formulario de registro
    
	formularioRegistro: function(req, res) {
        res.render("register");
    },


	procesoRegistro: function(req, res) {
		const resultadoValidacion = validationResult(req);
		//console.log(req.file.filename);
		//validacion de campos de registro (si estan o no completos)
		if (resultadoValidacion.errors.length > 0){
			return res.render("register", {
				errors: resultadoValidacion.mapped(), //mapped toma un array y lo convierte en objeto literal
				oldData: req.body
			});
		}
            //validacion de email existente
			db.Usuario.findOne({
				where: {
					mail: req.body.email
				}
			})
				.then(function(email) {
					if (email) {
						return res.render("register", {
							errors: {
								email: {
									msg: "Este email ya está registrado"
								}
							},
							oldData: req.body
						})
					
					} else { 
						//creacion de usuario
						let img;
						if (!req.file) {
							img = null
						} else {
							img = req.file.filename
						}
						db.Usuario.create({
							first_name: req.body.first_name,
							last_name: req.body.last_name,
							mail: req.body.email,
							nacimiento: req.body.nacimiento,
							domicilio: req.body.domicilio,
							dni: req.body.dni,
							contrasenia: bcrypt.hashSync(req.body.contraseña, 10),
							imagen: img
						});	
        			}

					res.redirect("login");
        		
						
				})
 	
    },

	login: function (req, res){
        res.render("login")
    },

	procesoLogin: (req,res) =>{
		const resultadoValidacion = validationResult(req)
		if (resultadoValidacion.errors.length > 0){
			return res.render("login", {
				errors: resultadoValidacion.mapped(), //mapped toma un array y lo convierte en objeto literal
				oldData: req.body
			});
		}
		//validacion de email existente
		db.Usuario.findOne({
			where: {
				mail: req.body.email
			}
		})
			.then(function(usuarioEmail) {
				if (usuarioEmail) {
					let passwordOk = bcrypt.compareSync(req.body.password, usuarioEmail.contrasenia);
					if (passwordOk){
						/* delete usuarioLoguearse.contraseña */
						req.session.usuarioLogueado = usuarioEmail; //seteado de SESSION
						
						if(req.body.remember_me){
							res.cookie("emailUsuario", req.body.email, { maxAge: 72000 * 10}) /* seteado de COOKIE */
						}
		
						return res.redirect("/user/" + req.session.usuarioLogueado. id + "/profile")
					}
							return res.render("login", {
								errors: {
									email: {
										msg: "el email o la contraseña son inválidos"
									}
								}
							});
				} 

					return res.render("login", {
						errors: {
							email: {
								msg: "No se encuentra este email"
							}
						}
					});

					


			})
    },

	list:(req,res) =>{
		db.Usuario.findAll()
		.then(function (usuarios){
			res.render('user_list', {usuarios: usuarios})
		})
	},
	
	profile: (req, res) => {
		
		return res.render("profile", {
			user: req.session.usuarioLogueado
			
		} );
		
	},

	formEdit: (req,res)=>{
		db.Usuario.findByPk(req.params.id)
			.then(function(usuario){
				res.render("user_edit", {usuario: usuario})
			})			
	},


	edit: async (req,res)=>{

		let usuario =  await db.Usuario.findByPk(req.params.id)
		const resultadoValidacion = validationResult(req)

		if (resultadoValidacion.errors.length > 0){
			return res.render("user_edit", {
				errors: resultadoValidacion.mapped(), //mapped toma un array y lo convierte en objeto literal
				oldData: req.body,
				usuario: usuario
			});
		}
		
		await db.Usuario.update({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			mail: req.body.email,
			nacimiento: req.body.nacimiento,
			domicilio: req.body.domicilio,
			dni: req.body.dni,
		}, {
			where: {
				id: req.params.id
			}
		});	
		console.log('%c⧭ ANTES', 'color: #00ff03;', req.session.usuarioLogueado)
		req.session.usuarioLogueado =  await db.Usuario.findByPk(req.params.id)
		console.log('%c⧭ DESPUES', 'color: #00ff03;', req.session.usuarioLogueado)
		await res.redirect("/user/" + req.params.id + "/profile")

	},

	formularioImagen: (req,res)=>{
		db.Usuario.findByPk(req.params.id)
			.then(function(usuario){
				res.render("editar-imagen", {usuario: usuario})
			})			
	},

	editarImagen: async (req,res)=>{
		let usuario =  await db.Usuario.findByPk(req.params.id);
		const resultadoValidacion = validationResult(req)

		if (resultadoValidacion.errors.length > 0){
			return res.render("editar-imagen", {
				errors: resultadoValidacion.mapped(), //mapped toma un array y lo convierte en objeto literal
				usuario: usuario
			});
		}
		
		await db.Usuario.update({
			imagen: req.file.filename
		}, {
			where: {
				id: req.params.id
			}
		});	
		
		req.session.usuarioLogueado =  await db.Usuario.findByPk(req.params.id)
		
		await res.redirect("/user/" + req.params.id + "/profile")

	},
	
	logout: (req, res) => {
		res.clearCookie("emailUsuario");
		req.session.destroy();
		return res.redirect("login");
	}


}




module.exports = userController;