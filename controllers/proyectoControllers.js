const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

//CREAR PROYECTOS
exports.crearProyecto = async (req, res) => {
  //REVISAR SI HAY ERRORES EN LOS DATOS INGRESADOS Y METERLOS EN UN ARRAY
  const errores = validationResult(req);
  //SI LOS HAY RETORNAR LOS MENSAJES DE ERROR
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    //CREAR UN NUEVO PROYECTO
    const proyecto = await new Proyecto(req.body);
    //SI ESTA EL TOKEN ACTIVADO ASIGNAMOS COMO CREADOR AL ID DEL USUARIO
    proyecto.creador = req.usuario.id;
    //GUARDAMOS PROYECTO
    proyecto.save();
    res.json(proyecto);
  } catch (error) {
    res.status(500).send("Hubo un error");
  }
};

//OBTENER LOS PROYECTOS DEL USUARIO LOGUEADO (PARA RUTA GET)
exports.obtenerProyectos = async (req, res) => {
  try {
    //OBTENERLOS ORDENADOS POR CREACION
    const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({
      creado: -1,
    });
    res.json({ proyectos });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//ACTUALIZAR PROYECTO
exports.actualizarProyectos = async (req, res) => {
  //REVISAR SI HAY ERRORES EN LOS DATOS INGRESADOS Y METERLOS EN UN ARRAY
  const errores = validationResult(req);
  //SI LOS HAY RETORNAR LOS MENSAJES DE ERROR
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //EXTRAER LA INFORMACION DEL PROYECTO
  const { nombre } = req.body;

  const nuevoProyecto = {};

  if (nombre) {
    nuevoProyecto.nombre = nombre;
  }

  try {
    //REVISAR ID
    let proyecto = await Proyecto.findById(req.params.id);
    //SI EL PROYECTO EXISTE O NO
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    //VERIFICAR CREADOR DE PROYECTO
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }
    //ACTUALIZAR
    proyecto = await Proyecto.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevoProyecto },
      { new: true }
    );
    res.json(proyecto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};

//ELIMINAR PROYECTOS POR ID
exports.eliminarProyectos = async (req, res) => {
  try {
    //REVISAR ID
    let proyecto = await Proyecto.findById(req.params.id);
    //SI EL PROYECTO EXISTE O NO
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    //VERIFICAR CREADOR DE PROYECTO
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }
    //ELIMINAR EL PROYECTO
    await Proyecto.findByIdAndRemove({ _id: req.params.id });
    res.json({ msg: "Proyecto eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};
