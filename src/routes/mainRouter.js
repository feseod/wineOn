const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController")
const productController = require("../controllers/productController")


// ************ middlewares ************
const canBuyMiddleware = require("../middlewares/canBuyMiddleware");
const authMiddleware = require ("../middlewares/authMiddleware");
 

router.get("/", mainController.index)

/* router.get("/productos", productController.products) */
router.get("/buscar", mainController.buscador)


router.get("/carrito", authMiddleware, mainController.carrito)

router.get("/finalizado", canBuyMiddleware, mainController.finalizado)

router.get("/contacto", mainController.contacto)

router.get("/nosotros", mainController.nosotros) 

module.exports = router;