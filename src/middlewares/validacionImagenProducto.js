const {body} = require ("express-validator");
const path = require('path')

const validacionImagenProducto = [
body("imagen").custom((value, {req}) => {
    let file = req.file
    if (!file) {
        throw new Error("No elegiste ninguna imagen");
       
    } 
    let extensionesAceptadas = [".jpeg", ".png", ".jpg", ".gif"]
     if (!extensionesAceptadas.includes(path.extname(req.file.originalname))){ 
    
          {
            throw new Error("Las extensiones del archivo permitidas son '.jpeg', '.jpg', '.png' y '.gif'");
        } 
     }
  return true
})
];

module.exports = validacionImagenProducto;