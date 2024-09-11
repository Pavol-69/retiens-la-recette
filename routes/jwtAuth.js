const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("../server.js").bcrypt;
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middlewear/validinfo");
const authorization = require("../middlewear/authorization");

// Inscription
router.post("/inscription", validInfo, async (req, res) => {
  try {
    // Création de la  bdd users si elle n'existe pas

    await pool.query(
      "CREATE TABLE IF NOT EXISTS users(user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), user_name VARCHAR(255) NOT NULL, user_family_name VARCHAR(255) NOT NULL, user_pseudo VARCHAR(255) NOT NULL, user_mail VARCHAR(255) NOT NULL, user_password VARCHAR(255) NOT NULL, user_role VARCHAR(255) NOT NULL, user_dark BOOLEAN DEFAULT FALSE)"
    );

    // Récupérationd des variables
    const { name, family_name, pseudo, mail, password, password2 } = req.body;

    // Vérification si user déjà existant, on veut que le pseudo et le mail soit unique
    const user_mail = await pool.query(
      "SELECT * FROM users WHERE user_mail = $1",
      [mail]
    );
    const user_pseudo = await pool.query(
      "SELECT * FROM users WHERE user_pseudo = $1",
      [pseudo]
    );

    if (user_pseudo.rows.length !== 0) {
      return res.status(401).json("Pseudo déjà utilisé.");
    }
    if (user_mail.rows.length !== 0) {
      return res.status(401).json("Adresse mail déjà utilisée.");
    }

    // Cryptage mot de passe
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // Création nouvel utilisateur
    const nbUsers = await pool.query("SELECT * FROM users");

    // Création de la valeur user_role, qui par défaut sera à "à définir", sauf s'il s'agit du premier user, à ce moment-là, il sera admin
    if (user_mail === "paul.valy@gmail.com") {
      role = "admin";
    } else {
      role = "to_define";
    }

    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_family_name, user_pseudo, user_mail, user_password, user_role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, family_name, pseudo, mail, bcryptPassword, role]
    );

    // Génératon token
    const token = jwtGenerator(newUser.rows[0].user_id, "3hr");
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
});

// Connexion
router.post("/connexion", validInfo, async (req, res) => {
  try {
    // Récupération des données
    const { mail, password, remember } = req.body;

    // Création de la  bdd users si elle n'existe pas
    await pool.query(
      "CREATE TABLE IF NOT EXISTS users(user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), user_name VARCHAR(255) NOT NULL, user_family_name VARCHAR(255) NOT NULL, user_pseudo VARCHAR(255) NOT NULL, user_mail VARCHAR(255) NOT NULL, user_password VARCHAR(255) NOT NULL, user_role VARCHAR(255) NOT NULL, user_dark BOOLEAN DEFAULT FALSE)"
    );

    // Vérification de si l'utilisateur existe bel et bien
    const user = await pool.query("SELECT * FROM users WHERE user_mail = $1", [
      mail,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Adresse mail ou mot de passe incorrect.");
    }

    // Vérification mot de passe
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Adresse mail ou mot de passe incorrect.");
    }

    // Envoi token
    const token = jwtGenerator(
      user.rows[0].user_id,
      remember ? "30days" : "3hr"
    );
    const userDark = user.rows[0].user_dark;
    res.json({ token, userDark });
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Erreur serveur");
  }
});

// Vérification token
router.get("/is-verified", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Erreur serveur");
  }
});

module.exports = router;
