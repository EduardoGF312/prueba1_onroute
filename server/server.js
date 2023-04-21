const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

//Configurar servidor básico

//Importar conexión de mongoDB
const archivoBD = require("./conexion");

//Importacion de archivo de rutas y modelo
const loginRoutes = require("./routes/login");
app.use("/", loginRoutes);

//Situaciones
const situacionRoutes = require("./routes/situaciones");
app.use("/", situacionRoutes);

//Peticion
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Configurar puerto :>
app.listen(port, function () {
  console.log("El servidor está arriba en el puerto", port);
});
