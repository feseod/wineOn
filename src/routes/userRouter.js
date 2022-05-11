const express = require("express");
const router = express.Router();

// ************ Controlador ************ 
const userController = require("../controllers/userController")


// ************ Middlewares ************ 
const upload = require("../middlewares/multerUsersMiddleware")
const validacionesUsuario = require ("../middlewares/validacionesUsuario");
const guestMiddleware = require ("../middlewares/guestMiddleware");
const authMiddleware = require ("../middlewares/authMiddleware");
const validacionLogin = require ("../middlewares/validacionLogin");
const validacionesEditUser = require ("../middlewares/validacionesEditUser");
const validacionesEditarImagenUser = require ("../middlewares/validacionesEditarImagenUser")

//ruta que muestra el register y procesar el registro
//router.get("/register", guestMiddleware, userController.formularioRegistro);
router.get("/register", userController.formularioRegistro);
router.post('/register', upload.single("imagen"), validacionesUsuario, userController.procesoRegistro); 

//formulario de login
router.get("/login",  guestMiddleware, userController.login);
//procesar el login
router.post("/login", validacionLogin, userController.procesoLogin);

router.get("/profile", authMiddleware, userController.profile);
router.get("/:id/profile", userController.profile);

router.get("/list", userController.list);

router.get("/:id/profile/edit", authMiddleware, userController.formEdit);
router.put("/:id/profile/edit", validacionesEditUser, userController.edit);

//editar imagen
router.get("/:id/profile/edit/imagen", authMiddleware, userController.formularioImagen);
router.put("/:id/profile/edit/imagen", upload.single("imagen"), validacionesEditarImagenUser, userController.editarImagen);

router.get("/logout", userController.logout);

module.exports = router;