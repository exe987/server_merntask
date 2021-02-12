//RUTAS PARA CREAR USUARIOS
const express = require("express");
const router = express.Router();
const proyectoControllers = require("../controllers/proyectoControllers");
const auth = require('../middleware/auth');
const { check } = require("express-validator");

//CREA UN PROYECTO
//api/proyectos
router.post("/", 
//VERIFICA SI HAY UN TOKEN CON EL MIDDLEWARE DE AUTH
auth,
[
    check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty(),

],
proyectoControllers.crearProyecto);

//OBTENER LOS PROYECTOS DEL USUARIO LOGUEADO
router.get("/", 
//VERIFICA SI HAY UN TOKEN CON EL MIDDLEWARE DE AUTH
auth,
proyectoControllers.obtenerProyectos
);


//ACTUALIZAR LOS PROYECTOS DEL USUARIO LOGUEADO
router.put("/:id", 
//VERIFICA SI HAY UN TOKEN CON EL MIDDLEWARE DE AUTH
auth,
[
    check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty(),

],
proyectoControllers.actualizarProyectos
);

//ELIMINAR PROYECTOS
router.delete("/:id",
//VERIFICA SI HAY UN TOKEN CON EL MIDDLEWARE DE AUTH
auth,
proyectoControllers.eliminarProyectos
)



module.exports = router;
