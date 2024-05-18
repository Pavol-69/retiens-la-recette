const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
module.exports.bcrypt = bcrypt;

const PORT = process.env.PORT || 5000;

// Middlewear
app.use(express.json()); //req.body
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

// Routes
// Connexion + Inscription
app.use("/auth", require("./routes/jwtAuth"));

// Dashboard
app.use("/dashboard", require("./routes/dashboard"));

// Mot de Passe oublié
app.use("/forgottenpassword", require("./routes/forgottenPassword"));

// Recette
app.use("/recipe", require("./routes/recipe"));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(PORT, () => {
  console.log("Le serveur fonctionne sur le port " + PORT);
});
