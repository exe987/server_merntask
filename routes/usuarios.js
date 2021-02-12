//RUTAS PARA CREAR USUARIOS
const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioControllers");
const { check } = require("express-validator");

//CREA UN USUARIO
//api/usuarios
router.post("/", 
//EXPRESS VALIDATOR PARA VALIDACION DE CAMPOS
[
     check('nombre', 'El nombre es obligatorio').not().isEmpty(),
     check('email', 'Agregar un email válido').isEmail(),
     check('password', 'El password debe ser de un mínimo de 6 caracteres').isLength({min: 6})
],


usuarioController.crearUsuario);
module.exports = router;
