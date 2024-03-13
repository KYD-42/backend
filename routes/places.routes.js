const express = require("express");
const router = express.Router();
const Place = require("../models/Places.model");
const populate = require("mongoose");
const {isAuthenticated} = require("../middleware/jwt.middleware");
const BusinessUser = require("../models/Business.model")

router.get("/places", async (req, res, next) => {
  try {
    const places = await Place.find().populate("comments");
    res.status(200).json(places);
  } catch (error) {
    next(error);
  }
});

router.get("/places/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const place = await Place.findById(id).populate("comments");

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    res.status(200).json(place);
  } catch (error) {
    next(error);
  }
});

// ADICIONEI O QUE ESTÁ COMENTADO AGORA ABAIXO PARA TESTARMOS. ISTO SÃO AS PERMISSÕES PARA VERIFICAR O USER DURANTE A CRIAÇAO DO PLACE

router.post("/places", async (req, res, next) => {
  try { 
    const {
      logo,
      name,
      type,
      address,
      rating,
      priceLevel,
      phone,
      email,
      comments,
    } = req.body;

    const newPlace = await Place.create({
      logo,
      name,
      type,
      address,
      rating,
      priceLevel,
      phone,
      email,
      comments,
    });
    res.status(200).json(newPlace);
  } catch (error) {
    console.log(error);
    }
});

router.put("/places/:id", async (req, res, next) => {
  try {
    const updatedPlace = await Place.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedPlace);
  } catch (error) {
    next(error);
  }
});

router.delete("/places/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Place.findByIdAndDelete(id);
    res.status(200).json({ message: "This place was deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;