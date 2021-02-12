//RUTA PARA AUTENTICAR USUARIOS
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authControllers = require('../controllers/authControllers')
const auth = require('../middleware/auth');
//CREA UN USUARIO
//api/auth

//INICIO DE SESION
router.post("/", 

    authControllers.autenticarUsuario
);

//OBTIENE EL USUARIO AUTENTICADO
router.get("/", 
auth,
    authControllers.usuarioAutenticado
);




module.exports = router;
