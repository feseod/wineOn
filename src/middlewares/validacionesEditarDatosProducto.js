const {body} = require ("express-validator");
const path = require('path')

const validacionesEditarDatosProducto = [
    body("name").notEmpty().withMessage("Debes ingresar el nombre del producto").bail()
                .isLength({ min: 5 }).withMessage("El nombre debe tener al menos 5 caracteres"),
    body("price").notEmpty().withMessage("Debes ingresar el precio del producto"),
    body("discount").notEmpty().withMessage("Debes ingresar el descuento del producto").bail()
                 .isNumeric().withMessage("Solo podés ingresar valores numericos"),
    body("unidades").notEmpty().withMessage("Debes ingresar la cantidad de unidades del producto"),
    body("cuotas").notEmpty().withMessage("Ingresá las cuotas del producto"),
    body("descripcion").notEmpty().withMessage("Ingresá una descripcion del producto").bail()
                      .isLength({ min: 20 }).withMessage("La descripción debe tener al menos 20 caracteres"),
    
];

module.exports = validacionesEditarDatosProducto;