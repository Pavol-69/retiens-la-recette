const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
module.exports.bcrypt = bcrypt;

//"heroku-postbuild": "cd client && npm install && npm run build"

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

// Pour toute autre demande, on renvoie le même message qu'un non autorisation
app.get("*", function (req, res) {
  res.status(403).json("Non autorisé");
});

app.listen(PORT, () => {
  console.log("Le serveur fonctionne sur le port " + PORT);
});
