const {body} = require ("express-validator");

const validacionLogin = [
    body("email").notEmpty().withMessage("Debes ingresar un email").bail()
                 .isEmail().withMessage("ingresá un formato de correo válido. Ej.: tucorreo@email.com"),
    body("password").notEmpty().withMessage("Debes ingresar una contraseña"),
    
];

module.exports = validacionLogin;