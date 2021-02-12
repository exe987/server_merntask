const express = require("express");
const conectarDB = require("./config/db");
const cors = require('cors');


//CREAMOS SERVIDOR
const app = express();

//CONEXION A BASE DE DATOS
conectarDB();

//HABILITAR CORS PARA CONEXION BACK/FRONT EXITOSA
app.use(cors());

//HABILITAR EXPRESS.JSON PARA LEER DATOS Q INGRESA EL USUARIO
//EN POSTMAN CONFIGURAR HEADERS PARA QUE RECONOZCA LOS JSON. Y EN RAW ESCRIBIR CODIGO JSON PARA PROBAR
app.use(express.json({ extended: true }));

//PUERTO DE LA APP
const PORT = process.env.PORT || 4000;

//IMPORTAR RUTAS - MIDDLEWARES
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));
app.use("/api/tareas", require("./routes/tareas"));


//DEFINIR LA PAGINA PRINCIPAL
app.get("/", (req, res) => {
  res.send("hello world");
});

//SERVIDOR ARRANQUE
app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto N° ${PORT}`);
});
