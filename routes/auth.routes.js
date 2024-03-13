const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const saltRounds = 10;

router.post("/signup", (req, res, next) => {
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

  if (
    email === "" ||
    password === "" ||
    userName === "" ||
    firstName === "" ||
    lastName === "" ||
    phone === ""
  ) {
    res
      .status(400)
      .json({
        message:
          "Provide email, password, username, first name, last name and phone number",
      });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }

  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      return User.create({
        email,
        password: hashedPassword,
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
    })
    .then((createdUser) => {
      const {
        email,
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
      } = createdUser;

      const user = {
        email,
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
      };

      res.status(201).json({ user: user });
    })
    .catch((err) => next(err));
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        res.status(401).json({ message: "User not found." });
        return;
      }
      /*  */

      // Log the found user and password provided by the user
      console.log("Found User:", foundUser);
      console.log("Password provided:", password);
      /*  */

      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
      console.log(passwordCorrect);

      if (passwordCorrect) {
        console.log(foundUser);
        const { _id, email, userName, firstName, lastName, phone, age, photo, bio, petPhoto, petName, petType, petAge, petBreed } = foundUser;
        const payload = { _id, email, userName, firstName, lastName, phone, age, photo, bio, petPhoto, petName, petType, petAge, petBreed};

        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "144h",
        });

        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => next(err));
});

router.get("/verify", isAuthenticated, (req, res, next) => {
  res.status(200).json(req.payload);
});

module.exports = router;