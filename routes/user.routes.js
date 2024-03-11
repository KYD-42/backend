const User = require("../models/User.model");
const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.use(isAuthenticated);

// Get All Users
router.get("/users", async (req, res, next) => {
  try {
    const usersAll = await User.find();
    res.status(200).json(usersAll);
  } catch (error) {
    next(error);
  }
});

// Get Users by ID
router.get('/users/:id', isAuthenticated, (req, res, next) => {
  // Get the user id from the request parameters
  const userId = req.params.id;
  
  // Find the user by id in the database
  User.findById(userId)
    .then((foundUser) => {
      // If the user is found, return it as the response
      if (foundUser) {
        res.status(200).json({ user: foundUser });
      }
      // If the user is not found, send an error response
      else {
        res.status(404).json({ message: "User not found." });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

/* router.post("/users", async (req, res, next) => {
  const {
    email,
    password,
    userName,
    firstName,
    lastName,
    phone,
    age,
    photo,
    bio,
    petPhoto,
    petName,
    petType,
    petAge,
    petBreed,
  } = req.body;

  try {
    const newUser = await User.create({
      email,
      password,
      userName,
      firstName,
      lastName,
      phone,
      age,
      photo,
      bio,
      petPhoto,
      petName,
      petType,
      petAge,
      petBreed,
    });
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
}); */

router.put("/users/:id", async (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
    })
    .catch((error) => {
      next(error);
    });
});

router.delete("/users/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User was deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;