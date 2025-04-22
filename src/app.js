const express = require("express");
const bodyParser = require("body-parser");
const schoolRoutes = require("./routes/schoolRoutes");

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api", schoolRoutes);

// Health check route
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
