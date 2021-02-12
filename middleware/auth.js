const jwt = require('jsonwebtoken');

//MIDDLWARE PARA VER SI EL USUARIO ESTA LOGUEADO PARA CREAR PROYECTO
module.exports = function(req, res, next){
    //LEER EL TOKEN DEL HEADER PARA ASIGNAR EL NUEVO PROYECTO AL USUARIO LOGUEADO
    const token = req.header('x-auth-token');
    //REVISAR SI NO HAY TOKEN
    if(!token){
        return res.status(401).json({msg: 'No hay token, permiso no válido'})
    }
    //VALIDAR EL TOKEN
    try {
        //SEGUN EL TOKEN ACCEDEMOS AL USUARIO
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        //PASAMOS AL SIGUIENTE MIDDLEWARE
        next();
    } catch (error) {
        res.status(400).json({msg: 'Token no válido'});
    }
}