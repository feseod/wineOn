const express = require('express');
const router = express.Router();
const apiProductsController = require('../../controllers/api/apiProductsController');

//Rutas
//Lista de todos los productos
router.get('/', apiProductsController.list)

//Detalle producto
router.get('/:id', apiProductsController.detail);

//Ulitmo Producto
router.get('/lastProduct', apiProductsController.ultimo);

module.exports = router;