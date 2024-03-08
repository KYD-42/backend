// ℹ️ Gets access to environment variables/settings
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { isAuthenticated } = require("./middleware/jwt.middleware");

const app = express();

// Use cors middleware
app.use(cors({origin: ['http://localhost:5173', 'http://example.com']}));

// Use morgan middleware for logging
app.use(morgan('dev'));

// Use cookieParser middleware
app.use(cookieParser());

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/api", isAuthenticated, userRoutes);

const businessUserRoutes = require("./routes/businessUser.routes");
app.use("/api", isAuthenticated, businessUserRoutes);

const placeRoutes = require("./routes/places.routes");
app.use("/api", placeRoutes);

const commentRoutes = require("./routes/comment.routes");
app.use("/api", commentRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;