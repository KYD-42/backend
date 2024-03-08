const BusinessUser = require("../models/Business.model");
const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/business-users", async (req, res, next) => {
  try {
    const businessUsers = await BusinessUser.find();
    res.status(200).json(businessUsers);
  } catch (error) {
    next(error);
  }
});

router.get("/business-users/:id", isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.params.id;
    const businessUser = await BusinessUser.findById(userId);

    if (!businessUser) {
      return res.status(404).json({ message: "Business user not found." });
    }

    res.status(200).json({ businessUser });
  } catch (error) {
    next(error);
  }
});

router.post("/business-users", async (req, res, next) => {
  try {
    const {
      logo, companyName, email, password, phone
    } = req.body;

    const newBusinessUser = await BusinessUser.create({
      logo, companyName, email, password, phone
    });

    res.status(200).json(newBusinessUser);
  } catch (error) {
    next(error);
  }
});

router.put("/business-users/:id", async (req, res, next) => {
  try {
    const updatedBusinessUser = await BusinessUser.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedBusinessUser) {
      return res.status(404).json({ message: "Business user not found." });
    }

    res.status(200).json(updatedBusinessUser);
  } catch (error) {
    next(error);
  }
});

router.delete("/business-users/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBusinessUser = await BusinessUser.findByIdAndDelete(id);

    if (!deletedBusinessUser) {
      return res.status(404).json({ message: "Business user not found." });
    }

    res.status(200).json({ message: "Business user was deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;







/* const BusinessUser = require("../models/Business.model");
const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");


router.get("/business-users", async (req, res, next) => {
  try {
    const businessUsers = await BusinessUser.find();
    res.status(200).json(businessUsers);
  } catch (error) {
    next(error);
  }
});

router.get("/business-users/:id", isAuthenticated, (req, res, next) => {
  const userId = req.params.id;

  BusinessUser.findById(userId)
    .then((foundUser) => {
      if (foundUser) {
        res.status(200).json({ businessUser: foundUser });
      } else {
        res.status(404).json({ message: "Business user not found." });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

router.post("/business-users", async (req, res, next) => {
  const {
    logo , companyName, email, password, phone
  } = req.body;

  try {
    const newBusinessUser = await BusinessUser.create({
      logo , companyName, email, password, phone
    });
    res.status(200).json(newBusinessUser);
  } catch (error) {
    next(error);
  }
});

router.put("/business-users/:id", async (req, res, next) => {
  BusinessUser.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedBusinessUser) => {
      res.status(200).json(updatedBusinessUser);
    })
    .catch((error) => {
      next(error);
    });
});

router.delete("/business-users/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await BusinessUser.findByIdAndDelete(id);
    res.status(200).json({ message: "Business user was deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
 */