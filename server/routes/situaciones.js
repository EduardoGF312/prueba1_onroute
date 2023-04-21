const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const SituacionSchema = new mongoose.Schema({
    descripcion: String,
    fecha: String,
    ruta: String,
    situacion: String,
});

const Situacion = mongoose.model("situaciones", SituacionSchema);

//RUTA PARA SUBIR UNA NUEVA SITUACION
router.post("/situaciones", async (req, res) => {
    const { descripcion, fecha, ruta, situacion } = req.body;

    const nuevaSituacion = new Situacion({
        descripcion,
        fecha,
        ruta,
        situacion,
    });

    try {
        const situacionGuardada = await nuevaSituacion.save();

        res.status(201).json(situacionGuardada);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

//RUTA PARA OBTENER LAS SITUACIONES
router.get("/situaciones", async (req, res) => {
    const {ruta} = req.query;

    if(!ruta) {
        res.status(400).json({error: "Se requiere el parametro ruta"})
        return;
    }

    try{
        const situaciones = await Situacion.find({ ruta: ruta });
        res.status(200).json(situaciones);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

//RUTA PARA EDITAR SITUACIONES
router.put("/situaciones/:id", async (req, res) => {
    const { id } = req.params;
    const {descripcion, fecha, situacion} = req.body;

    if(!id) {
        res.status(400).json({error: "Se requiere el parametro id"})
        return;
    }

    try{
        const situacionActualizada = await Situacion.findByIdAndUpdate(
            id,
            {
                descripcion,
                fecha,
                situacion,
            },
            {new: true}
        );

        if(!situacionActualizada) {
            res.status(404).json({error: "No se encontro la situacion con el id proporcionado"});
            return;
        }

        res.status(200).json(situacionActualizada);
    } catch(error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = router;