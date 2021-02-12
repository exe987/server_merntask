const mongoose = require('mongoose');

const ProyectoSchema = mongoose.Schema({
    nombre: {
        type: String, // DE TIPO STRING
        required: true, // OBLIGATORIO
        trim: true, // SE LE SACA LOS ESPACIOS EN BLANCO
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId, //EL ID DEL USUARIO PARA QUE SE GUARDE DENTRO DE SUS DATOS
        ref: 'Usuario'
    },
    creado: {
        type: Date, //DE TIPO FECHA
        default: Date.now() //FECHA DE REGISTRO
    }

});

module.exports= mongoose.model('Proyecto', ProyectoSchema);