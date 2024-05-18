module.exports = (req, res, next) => {
  const { mail, name, family_name, pseudo, password, password2 } = req.body;

  function validEmail(myMail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myMail);
  }

  function validName(myName) {
    return /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ-]+$/.test(
      myName
    );
  }

  if (req.path === "/inscription") {
    if (
      ![mail, name, family_name, pseudo, password, password2].every(Boolean)
    ) {
      return res.status(401).json("Informations manquantes.");
    } else if (name.length < 3 || family_name.length < 3) {
      return res
        .status(401)
        .json("Votre nom et votre prénom doivent faire minimum 3 caractères.");
    } else if (!validName(name) || !validName(family_name)) {
      return res
        .status(401)
        .json(
          "Votre nom et votre prénom ne doivent pas contenir ni de chiffre, ni de caractère spécial."
        );
    } else if (pseudo.length < 6) {
      return res
        .status(401)
        .json("Votre pseudo doit faire au minimum 6 caractères.");
    } else if (!validEmail(mail)) {
      return res.status(401).json("Adresse mail invalide.");
    } else if (password !== password2) {
      return res.status(401).json("Les deux mots de passe sont différents.");
    } else if (password.length < 5 || password2.length < 5) {
      return res
        .status(401)
        .json("Votre mot de passe doit faire minimum 5 caractères.");
    }
  } else if (req.path === "/connexion") {
    if (![mail, password].every(Boolean)) {
      return res.status(401).json("Informations manquantes.");
    } else if (!validEmail(mail)) {
      return res.status(401).json("Adresse mail invalide.");
    }
  }
  next();
};
