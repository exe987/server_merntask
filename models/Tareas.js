const mongoose = require('mongoose');

const TareasSchema = mongoose.Schema({
    nombre: {
        type: String, // DE TIPO STRING
        required: true, // OBLIGATORIO
        trim: true, // SE LE SACA LOS ESPACIOS EN BLANCO
    },
    estado: {
        type: Boolean,
        default: false
    },
    creado: {
        type: Date, //DE TIPO FECHA
        default: Date.now() //FECHA DE REGISTRO
    },
    proyecto: {
        type: mongoose.Schema.Types.ObjectId, //EL ID DEL USUARIO PARA QUE SE GUARDE DENTRO DE SUS DATOS
        ref: 'Proyecto'
    }
  

});

module.exports= mongoose.model('Tareas', TareasSchema);