require("dotenv").config();
const jwt = require("jsonwebtoken");
const pool = require("../db");

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");
    if (!jwtToken) {
      return res.status(403).json("Non autorisé");
    }

    const payload = jwt.verify(jwtToken, process.env.jwtSecret);

    req.user = payload.user;

    const myRole = await pool.query(
      "SELECT user_role FROM users WHERE user_id = $1",
      [payload.user]
    );

    if (myRole.rows[0].user_role !== "admin") {
      return res.status(403).json("Non autorisé");
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(403).json("Token non valide.");
  }
};
