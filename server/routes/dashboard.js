const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middlewear/authorization");
const authorizationAdmin = require("../middlewear/authorizationAdmin");
const bcrypt = require("../server.js").bcrypt;

router.get("/userInfos", authorization, async (req, res) => {
  try {
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      req.user,
    ]);
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Erreur serveur.");
  }
});

router.get("/allUsersInfos", authorization, async (req, res) => {
  try {
    const user = await pool.query("SELECT * FROM users");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Erreur serveur.");
  }
});

router.get("/getNbNotif", authorization, async (req, res) => {
  try {
    const nbNotif = await pool.query(
      "SELECT * FROM users where user_role = $1",
      ["to_define"]
    );
    res.json(nbNotif.rows.length);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Erreur serveur.");
  }
});

router.post("/changeRole", authorizationAdmin, async (req, res) => {
  try {
    const user = await pool.query(
      "UPDATE users SET user_role = $1 WHERE user_id = $2",
      [req.body.role, req.body.user_id]
    );
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Erreur serveur.");
  }
});

router.post("/deleteUser", authorization, async (req, res) => {
  try {
    await pool.query("DELETE FROM users WHERE user_id = $1", [req.user]);
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Erreur serveur.");
  }
});

router.post("/updateInfos", authorization, async (req, res) => {
  try {
    // Récupérationd des variables
    const { name, family_name, pseudo, mail, password, password2 } = req.body;

    // Vérification de si les deux mdp sont identiques
    if (password !== "" || password2 !== "") {
      if (password !== password2) {
        return res.status(401).json("Les deux mots de passe sont différents.");
      }
      // Cryptage mot de passe
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const bcryptPassword = await bcrypt.hash(password, salt);
      await pool.query("UPDATE users SET user_password=$1 where user_id=$2", [
        bcryptPassword,
        user_id,
      ]);
    }

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
      if (user_pseudo.rows[0].user_id !== req.user) {
        return res.status(401).json("Pseudo déjà utilisé.");
      }
    }

    if (user_mail.rows.length !== 0) {
      if (user_mail.rows[0].user_id !== req.user) {
        return res.status(401).json("Adresse mail déjà utilisée.");
      }
    }

    // Màj des infos
    if (name !== "") {
      await pool.query("UPDATE users SET user_name=$1 where user_id=$2", [
        name,
        req.user,
      ]);
    }

    if (family_name !== "") {
      await pool.query(
        "UPDATE users SET user_family_name=$1 where user_id=$2",
        [family_name, req.user]
      );
    }

    if (pseudo !== "") {
      await pool.query("UPDATE users SET user_pseudo=$1 where user_id=$2", [
        pseudo,
        req.user,
      ]);
    }

    if (mail !== "") {
      await pool.query("UPDATE users SET user_mail=$1 where user_id=$2", [
        mail,
        req.user,
      ]);
    }

    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Erreur serveur.");
  }
});

router.post("/userDark", authorization, async (req, res) => {
  try {
    await pool.query(
      `UPDATE users SET user_dark=${
        req.body.dark ? "TRUE" : "FALSE"
      } where user_id=$1`,
      [req.user]
    );

    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Erreur serveur.");
  }
});

module.exports = router;
