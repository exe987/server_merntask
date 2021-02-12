const mongoose = require("mongoose");

require("dotenv").config({ path: "variables.env" });

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
    console.log(`DB esta conectada`)
  } catch (error) {
    console.log(error);
    process.exit(1); //EN CASO DE NO HACER CONEXION SE DETIENE LA APP
  }
};

module.exports = conectarDB;
