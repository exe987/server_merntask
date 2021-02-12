//IMPORTAMOS MODELO DE DATOS DE USUARIO
const Usuario = require("../models/Usuario");
//IMPORTAMOS BCRYPT PARA HASHEAR PASSWORDS
const bcryptjs = require("bcryptjs");
//PARA UTILIZAR LOS MENSAJES QUE CREAMOS PARA VALIDAR CAMPOS QUE HAY EN LAS RUTAS DE USUARIOS
const {validationResult} = require('express-validator');
//JSON WEB TOKENS
const jwt = require('jsonwebtoken');


exports.crearUsuario = async (req, res) => {

  //REVISAR SI HAY ERRORES EN LOS DATOS INGRESADOS Y METERLOS EN UN ARRAY
  const errores = validationResult(req);
  //SI LOS HAY RETORNAR LOS MENSAJES DE ERROR
  if(!errores.isEmpty()){
    return res.status(400).json({errores: errores.array() });
  }

  //EXTRAER EMAIL Y PASSWORD INGRESADOS POR USUARIO
  const { email, password } = req.body;

  try {
    //REVISAR QUE EL USUARIO ESTABA REGISTRADO
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ msg: "EL USUARIO YA EXISTE" });
    }
    //CREA USUARIO
    usuario = new Usuario(req.body);
    //HASHEAR PASSWORD
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);
    //GUARDAR USUARIO
    await usuario.save();

    //CREAR Y FIRMAR EL JWT PARA INICIAR SESION Y NAVEGAR
    //CREAR
    const payload = {
      usuario:{
        id: usuario.id,
      }
    }
    //FIRMAR
    jwt.sign(payload, process.env.SECRETA, {
      //1 HORA DE SESION
      expiresIn: 10800 
    }, (error, token)=>{
      if(error) throw error;
      //MENSAJE DE CONFIRMACION
      res.json({token})
    })
  
    
  } catch (error) {
    console.log(error);
    res.status(400)({ msg: "USUARIO NO CREADO" });
  }
};
