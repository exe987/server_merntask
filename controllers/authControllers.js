//IMPORTAMOS MODELO DE DATOS DE USUARIO
const Usuario = require("../models/Usuario");
//IMPORTAMOS BCRYPT PARA HASHEAR PASSWORDS
const bcryptjs = require("bcryptjs");
//PARA UTILIZAR LOS MENSAJES QUE CREAMOS PARA VALIDAR CAMPOS QUE HAY EN LAS RUTAS DE USUARIOS
const { validationResult } = require("express-validator");
//JSON WEB TOKENS
const jwt = require("jsonwebtoken");

exports.autenticarUsuario = async (req, res) => {
  //REVISAR SI HAY ERRORES EN LOS DATOS INGRESADOS Y METERLOS EN UN ARRAY
  const errores = validationResult(req);
  //SI LOS HAY RETORNAR LOS MENSAJES DE ERROR
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //EXTRAER EMAIL Y PASSWORD INGRESADOS POR USUARIO
  const { email, password } = req.body;

  try {
    //REVISAR QUE SEA UN USUARIO YA REGISTRADO
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: "EL USUARIO NO EXISTE" });
    }
    /*SI EL USUARIO EXISTE, PROCEDEMOS A REVISAR PASSWORD, COMPARANDO EL INGRESADO CON
    EL PASSWORD DEL USUARIO QUE PASO LA VALIDACION ANTERIOR*/
    const passCorrecto = await bcryptjs.compare(password, usuario.password);
    //SI EL PASSWORD ES INCORRECTO...
    if (!passCorrecto) {
      return res.status(400).json({ msg: "PASSWORD INCORRECTO" });
    }
    //SI TODO ES CORRECTO...CREAR Y FIRMAR EL JWT PARA INICIAR SESION Y NAVEGAR
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };
    //FIRMAR
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        //1 HORA DE SESION
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;
        //MENSAJE DE CONFIRMACION
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.usuarioAutenticado = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select('-password'); //EL GUION PASSWORD ES PARA QUE NO NOS MUESTRE EL PASSWORD POR MAS QUE ESTE HASHEADO NO ES BUENA IDEA
    res.json({usuario});
  } catch (error) {
    console.log(error);
    res.status(500).json({msg: 'Hubo un error'})
  }
}