const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
  ruta: String,
  password: String,
});

const Login = mongoose.model("trabajadores", LoginSchema);

router.post("/userLogin", async (req, res) => {
  const { ruta, password } = req.body;

  const userLogin = await Login.findOne({ ruta, password });

  if (userLogin) {
    res.send("Bienvenido!");
  } else {
    res.status(400).send("Credenciales invalidas");
  }
});

module.exports = router;
