const db = require('../../../database/models');
const sequelize = db.sequelize;

const apiUsersController = {
    list:(req,res)=>{
        db.Usuario.findAll()
        .then(users=>{
            let usuarios = users.map(user=>{
              return {   
                id: user.id,
                name: user.first_name,
                email: user.mail
                 }   
            })
            
            return res.json({
                count: users.length,
                users: usuarios,
                detail: "/api/users"
            })
        })
    },

    detail:(req,res)=>{
        db.Usuario.findByPk(req.params.id)
        .then(user=>{
            return res.json({
                users: {
                    id: user.id,
                    name: user.fisrt_name,
                    lastName: user.last_name,
                    email: user.mail,
                    dni: user.dni,
                    addres: user.domicilio,
                    birthDate: user.nacimiento,
                    image: "/images/users" + user.imagen,
                    detail: "/api/user/" + user.id
                }
            })
        })
    }

}

module.exports = apiUsersController;