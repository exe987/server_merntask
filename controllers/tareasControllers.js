const Tareas = require("../models/Tareas");
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

//CREAR UNA NUEVA TAREA
exports.crearTarea = async (req, res) => {
  //REVISAR SI HAY ERRORES EN LOS DATOS INGRESADOS Y METERLOS EN UN ARRAY
  const errores = validationResult(req);
  //SI LOS HAY RETORNAR LOS MENSAJES DE ERROR
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //CREAR TAREA Y ASIGNARSELA AL PROYECTO PARA GUARDARLA
  try {
    //EXTRAER PROYECTO CON EL QUE EL USUARIO ELIGIO TRABAJAR
    const { proyecto } = req.body;
    //AGUARDAMOS QUE EL USUARIO ELIJA PROYECTO
    const existeProyecto = await Proyecto.findById(proyecto);
    //VERIFICAR SI EXISTE ESE PROYECTO
    if (!existeProyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    //REVISAR SI EL PROYECTO ACTUAL PERTENECE AL USUARIO AUTENTICADO
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }
    //CREAR TAREA
    const tarea = new Tareas(req.body);
    await tarea.save();
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//OBTENER TAREAS DE PROYECTO
exports.obtenerTarea = async (req, res) => {
  try {
    //EXTRAER PROYECTO CON EL QUE EL USUARIO ELIGIO TRABAJAR
    const { proyecto } = req.query;
    //AGUARDAMOS QUE EL USUARIO ELIJA PROYECTO
    const existeProyecto = await Proyecto.findById(proyecto);
    //VERIFICAR SI EXISTE ESE PROYECTO
    if (!existeProyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    //REVISAR SI EL PROYECTO ACTUAL PERTENECE AL USUARIO AUTENTICADO
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }
    //OBTENER TAREAS POR PROYECTO
    const tareas = await Tareas.find({ proyecto }).sort({ creado: -1 });
    res.json({ tareas });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.actualizarTarea = async (req, res) => {
  try {
    //EXTRAER PROYECTO CON EL QUE EL USUARIO ELIGIO TRABAJAR
    const { proyecto, nombre, estado } = req.body;

    //VERIFICAR SI EXISTE LA TAREA
    let tarea = await Tareas.findById(req.params.id); //BUSCA EL ID QUE SE INGRESA EN URL

    if (!tarea) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }

    //AGUARDAMOS QUE EL USUARIO ELIJA PROYECTO
    const existeProyecto = await Proyecto.findById(proyecto);

    //REVISAR SI EL PROYECTO ACTUAL PERTENECE AL USUARIO AUTENTICADO
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //CREAR UN OBJETO CON NUEVA INFORMACION
    const nuevaTarea = {};

    nuevaTarea.nombre = nombre;

    nuevaTarea.estado = estado;

    //GUARDAR TAREA
    tarea = await Tareas.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, {
      new: true,
    });
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.eliminarTarea = async (req, res) => {
  try {
    //EXTRAER PROYECTO CON EL QUE EL USUARIO ELIGIO TRABAJAR
    const { proyecto } = req.query;
    //VERIFICAR SI EXISTE LA TAREA
    let tarea = await Tareas.findById(req.params.id); //BUSCA EL ID QUE SE INGRESA EN URL

    if (!tarea) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }

    //AGUARDAMOS QUE EL USUARIO ELIJA PROYECTO
    const existeProyecto = await Proyecto.findById(proyecto);

    //REVISAR SI EL PROYECTO ACTUAL PERTENECE AL USUARIO AUTENTICADO
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //ELIMINAR
    await Tareas.findByIdAndRemove({ _id: req.params.id });
    res.json({ msg: "Tarea eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
