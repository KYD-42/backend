const router = require("express").Router();
const Place = require("../models/Places.model");

router.get("/places", async (req, res, next) => {
  try {
    const places = await Place.find();
    res.status(200).json(places);
  } catch (error) {
    next(error);
  }
});

router.get("/places/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const place = await Place.findById(id);

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    res.status(200).json(place);
  } catch (error) {
    next(error);
  }
});

router.post("/places", async (req, res, next) => {
  try {
    const { name, phone, location, image } = req.body;
    const newPlace = new Place({ name, phone, location, image });
    await newPlace.save();
    res.status(200).json(newPlace);
  } catch (error) {
    next(error);
  }
});

router.put("/places/:id", async (req, res, next) => {
  try {
    const updatedPlace = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
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



/* const router = require("express").Router();
const Place = require("../models/Places.model");
const data = require("../db/index");

router.get("/places", async (req, res, next) => {
  try {
    res.status(200).json(data.places);
  } catch (error) {
    next(error);
  }
});

router.get("/places/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const place = data.places.find(place => place.id === id);

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    res.status(200).json(data.places); //alterei apenas para data.places - estava place
  } catch (error) {
    next(error);
  }
});

router.post("/places", async (req, res, next) => {
  try {
    const { name, phone, location, image } = req.body;
    const newPlace = {
      id: data.places.length + 1,
      name,
      phone,
      location,
      image,
    };
    data.places.push(newPlace);
    res.status(200).json(newPlace);
  } catch (error) {
    next(error);
  }
});

router.put("/places/:id", async (req, res, next) => {
  Place.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedPlace) => {
      res.status(200).json(updatedPlace);
    })
    .catch((error) => {
      next(error);
    });
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

module.exports = router; */