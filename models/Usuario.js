const mongoose = require('mongoose');

const UsuariosSchema = mongoose.Schema({
    nombre: {
        type: String, // DE TIPO STRING
        required: true, // OBLIGATORIO
        trim: true, // SE LE SACA LOS ESPACIOS EN BLANCO
    },
    email: {
        type: String, // DE TIPO STRING
        required: true, // OBLIGATORIO
        trim: true, // SE LE SACA LOS ESPACIOS EN BLANCO
        unique: true // PARA QUE NO SE REPITA EL MAIL DEL USER
    },
    password: {
        type: String, 
        required: true, 
        trim: true
    },
    registro: {
        type: Date, // DE TIPO FECHA
        default: Date.now() //FECHA DE REGISTRO
    }

});

module.exports= mongoose.model('Usuario', UsuariosSchema);