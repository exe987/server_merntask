//RUTA PARA TAREAS
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check } = require("express-validator");
const tareasControllers = require("../controllers/tareasControllers");

//CREA UN USUARIO
//api/tareas
router.post(
  "/",
  auth,
  //EXPRESS VALIDATOR PARA VALIDACION DE CAMPOS
  [
    check("nombre", "El nombre de la tarea es obligatorio").not().isEmpty(),
    check("proyecto", "El proyecto es obligatorio").not().isEmpty(),
  ],
  tareasControllers.crearTarea
);

//OBTENER TAREAS
router.get("/", auth, tareasControllers.obtenerTarea);

//ACTUALIZAR TAREAS
router.put("/:id", auth, tareasControllers.actualizarTarea);

//ELIMINAR TAREA
router.delete("/:id", auth, tareasControllers.eliminarTarea);

module.exports = router;
