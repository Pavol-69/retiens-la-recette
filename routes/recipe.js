const pool = require("../db");
const authorization = require("../middlewear/authorization");
const authorizationAdmin = require("../middlewear/authorizationAdmin");
const router = require("express").Router();

String.prototype.sansAccent = function () {
  var accent = [
    /[\300-\306]/g,
    /[\340-\346]/g, // A, a
    /[\310-\313]/g,
    /[\350-\353]/g, // E, e
    /[\314-\317]/g,
    /[\354-\357]/g, // I, i
    /[\322-\330]/g,
    /[\362-\370]/g, // O, o
    /[\331-\334]/g,
    /[\371-\374]/g, // U, u
    /[\321]/g,
    /[\361]/g, // N, n
    /[\307]/g,
    /[\347]/g, // C, c
  ];
  var noaccent = [
    "A",
    "a",
    "E",
    "e",
    "I",
    "i",
    "O",
    "o",
    "U",
    "u",
    "N",
    "n",
    "C",
    "c",
  ];

  var str = this;
  for (var i = 0; i < accent.length; i++) {
    str = str.replace(accent[i], noaccent[i]);
  }

  return str;
};

router.post("/addRecipe", authorization, async (req, res) => {
  try {
    //Création des bdd si elle n'existe pas déjà
    await pool.query(
      "CREATE TABLE IF NOT EXISTS recettes(rct_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), rct_name VARCHAR(255) NOT NULL, user_pseudo VARCHAR(255) NOT NULL, rct_nb INT, rct_nb_type VARCHAR(255))"
    );
    await pool.query(
      "CREATE TABLE IF NOT EXISTS ingredients(ing_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), rct_id VARCHAR(255) NOT NULL, section_ing_id VARCHAR(255) NOT NULL, ing_qty INT NOT NULL, ing_qty_unit VARCHAR(255) NOT NULL, ing_name VARCHAR(255) NOT NULL, ing_position INT NOT NULL)"
    );
    await pool.query(
      "CREATE TABLE IF NOT EXISTS section_ing(section_ing_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), rct_id VARCHAR(255) NOT NULL, section_ing_name VARCHAR(255) NOT NULL, section_ing_position INT NOT NULL)"
    );
    await pool.query(
      "CREATE TABLE IF NOT EXISTS section_step(section_step_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), rct_id VARCHAR(255) NOT NULL, section_step_name VARCHAR(255) NOT NULL, section_step_position INT NOT NULL)"
    );
    await pool.query(
      "CREATE TABLE IF NOT EXISTS steps(step_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), rct_id VARCHAR(255) NOT NULL, section_step_id VARCHAR(255) NOT NULL, step_content TEXT NOT NULL, step_position INT NOT NULL)"
    );
    await pool.query(
      "CREATE TABLE IF NOT EXISTS images(img_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), rct_id VARCHAR(255) NOT NULL, img_1 VARCHAR(255), img_2 VARCHAR(255), img_3 VARCHAR(255), img_4 VARCHAR(255), img_5 VARCHAR(255))"
    );
    await pool.query(
      "CREATE TABLE IF NOT EXISTS categories(cat_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), cat_name VARCHAR(255) NOT NULL)"
    );
    await pool.query(
      "CREATE TABLE IF NOT EXISTS table_categories(table_cat_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), rct_id VARCHAR(255) NOT NULL)"
    );

    // Vérification de si le nom est déjà existant ou non
    const rct_name_list = await pool.query("SELECT rct_name FROM recettes");
    for (i = 0; i < rct_name_list.rows.length; i++) {
      if (
        req.body.rct_name.toLowerCase() ==
        rct_name_list.rows[i].rct_name.toLowerCase()
      ) {
        return res.status(401).json("Nom de recette déjà utilisé.");
      }
    }

    // Mise en forme du titre : 1ère lettre majuscule, le reste en minuscule
    const myName =
      req.body.rct_name.charAt(0).toUpperCase() + req.body.rct_name.slice(1);

    // Ajout d'une ligne dans la table recette avec le nom transmis => Au bon format
    await pool.query(
      "INSERT INTO recettes (rct_name, user_pseudo, rct_nb, rct_nb_type) VALUES ($1, $2, $3, $4)",
      [myName, req.body.user_pseudo, 0, ""]
    );

    // Récupération de rct_id
    const rct_id = await pool.query(
      "SELECT rct_id FROM recettes WHERE rct_name = $1",
      [myName]
    );

    // Initialisation Images
    await pool.query("INSERT INTO images (rct_id) VALUES ($1)", [
      rct_id.rows[0].rct_id,
    ]);

    // Ajout de la section de base pour ingredients et steps
    await pool.query(
      "INSERT INTO section_ing (rct_id, section_ing_name, section_ing_position) VALUES ($1, $2, $3)",
      [rct_id.rows[0].rct_id, "no_section", 1]
    );

    await pool.query(
      "INSERT INTO section_step (rct_id, section_step_name, section_step_position) VALUES ($1, $2, $3)",
      [rct_id.rows[0].rct_id, "no_section", 1]
    );

    // Ajout d'une ligne dans la table des catégories
    await pool.query("INSERT INTO table_categories (rct_id) VALUES ($1)", [
      rct_id.rows[0].rct_id,
    ]);

    res.json(rct_id);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Erreur serveur");
  }
});

router.get("/getRecipesList", authorization, async (req, res) => {
  try {
    let myRecipeList = [];
    let myVerifRct = false;
    let myVerifCat = false;
    let myVerifImg = false;

    // Vérification de si la table recettes existe ou non
    myBddList = await pool.query(
      "SELECT * FROM information_schema.tables WHERE table_type='BASE TABLE'"
    );

    for (i = 0; i < myBddList.rows.length; i++) {
      if (myBddList.rows[i].table_name === "recettes") {
        myVerifRct = true;
      }
      if (myBddList.rows[i].table_name === "categories") {
        myVerifCat = true;
      }
      if (myBddList.rows[i].table_name === "images") {
        myVerifImg = true;
      }
    }

    // Récupération nom recette
    if (myVerifRct) {
      myRecipeList = await pool.query("SELECT rct_id, rct_name FROM recettes");
      myRecipeList = myRecipeList.rows;
    }

    // Classement de myRecipeList par ordre alphabétique
    const strAscending = [...myRecipeList].sort((a, b) =>
      a.rct_name.toLowerCase() > b.rct_name.toLowerCase() ? 1 : -1
    );
    myRecipeList = strAscending;

    for (let i = 0; i < myRecipeList.length; i++) {
      // Récupération des Catégories
      let myCatList = [];

      if (myVerifCat) {
        let myLine = await pool.query(
          "SELECT * FROM table_categories WHERE rct_id = $1",
          [myRecipeList[i].rct_id]
        );
        console.log(myLine);
        for (j = 0; j < myLine.fields.length; j++) {
          if (myLine.rows[0][myLine.fields[j].name] === true) {
            myCatList.push(myLine.fields[j].name);
          }
        }
      }

      //  Récupération de l'image
      let myImg = "";
      if (myVerifImg) {
        myImg = await pool.query("SELECT img_1 FROM images WHERE rct_id = $1", [
          myRecipeList[i].rct_id,
        ]);
      }

      if (myImg.rows[0].img_1 === null) {
        myRecipeList[i].rct_img = "";
      } else {
        myRecipeList[i].rct_img = myImg.rows[0].img_1;
      }

      myRecipeList[i].cat = myCatList;
    }

    res.json({ myRecipeList });
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Erreur serveur");
  }
});

router.get("/getRecipeInfos", authorization, async (req, res) => {
  try {
    const rct_id = req.header("rct_id");

    // Récupération nom recette
    const myInfo = await pool.query(
      "SELECT rct_name, user_pseudo, rct_nb, rct_nb_type FROM recettes WHERE rct_id = $1",
      [rct_id]
    );

    const myInfoSectionIng = await pool.query(
      "SELECT section_ing_id, section_ing_name, section_ing_position FROM section_ing WHERE rct_id = $1",
      [rct_id]
    );

    const myInfoIng = await pool.query(
      "SELECT section_ing_id, ing_qty, ing_qty_unit, ing_name, ing_position FROM ingredients WHERE rct_id = $1",
      [rct_id]
    );

    const myInfoSectionStep = await pool.query(
      "SELECT section_step_id, section_step_name, section_step_position FROM section_step WHERE rct_id = $1",
      [rct_id]
    );

    const myInfoStep = await pool.query(
      "SELECT section_step_id, step_content, step_position FROM steps WHERE rct_id = $1",
      [rct_id]
    );

    const myInfoImg = await pool.query(
      "SELECT img_1, img_2, img_3, img_4, img_5 FROM images WHERE rct_id = $1",
      [rct_id]
    );

    const myInfoCat = await pool.query("SELECT cat_name FROM categories");

    let mySectionIngList = [];
    let myIngList = [];
    let mySectionStepList = [];
    let myStepList = [];
    let myCatList = [];
    let myImgList = [];

    for (i = 0; i < myInfoSectionIng.rows.length; i++) {
      mySectionIngList.push([
        myInfoSectionIng.rows[i].section_ing_name,
        myInfoSectionIng.rows[i].section_ing_id,
      ]);
    }

    for (i = 0; i < myInfoIng.rows.length; i++) {
      myIngList.push([
        myInfoIng.rows[i].ing_qty,
        myInfoIng.rows[i].ing_qty_unit,
        myInfoIng.rows[i].ing_name,
        myInfoIng.rows[i].section_ing_id,
        myInfoIng.rows[i].ing_position,
      ]);
    }

    for (i = 0; i < myInfoSectionStep.rows.length; i++) {
      mySectionStepList.push([
        myInfoSectionStep.rows[i].section_step_name,
        myInfoSectionStep.rows[i].section_step_id,
      ]);
    }

    for (i = 0; i < myInfoStep.rows.length; i++) {
      myStepList.push([
        myInfoStep.rows[i].step_content,
        myInfoStep.rows[i].section_step_id,
        myInfoStep.rows[i].step_position,
      ]);
    }

    let myAlphaList = [];

    for (i = 0; i < myInfoCat.rows.length; i++) {
      myAlphaList.push(myInfoCat.rows[i].cat_name);
    }

    myAlphaList = myAlphaList.sort();

    for (i = 0; i < myAlphaList.length; i++) {
      let myInfoRctCat = await pool.query(
        "SELECT " +
          myAlphaList[i].replace(" ", "_") +
          " FROM table_categories WHERE rct_id = $1",
        [rct_id]
      );

      if (myInfoRctCat.rows[0][myInfoRctCat.fields[0].name] === true) {
        myCatList.push([myAlphaList[i], true]);
      } else {
        myCatList.push([myAlphaList[i], false]);
      }
    }

    for (i = 0; i < myInfoImg.fields.length; i++) {
      if (myInfoImg.rows[0][myInfoImg.fields[i].name] === null) {
        myImgList.push("");
      } else {
        myImgList.push(myInfoImg.rows[0][myInfoImg.fields[i].name]);
      }
    }

    res.json({
      myInfo,
      mySectionIngList,
      myIngList,
      mySectionStepList,
      myStepList,
      myCatList,
      myImgList,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Erreur serveur");
  }
});

router.post("/updateRecipeInfos", authorization, async (req, res) => {
  try {
    const rct_id = req.header("rct_id");
    const new_rct_name = req.body.rct_name;
    const new_rct_nb = req.body.rct_nb;
    const new_rct_nb_type = req.body.rct_nb_type;

    //Màj Infos
    await pool.query(
      "UPDATE recettes SET rct_name=$1, rct_nb=$2, rct_nb_type=$3 where rct_id=$4",
      [new_rct_name, new_rct_nb, new_rct_nb_type, rct_id]
    );

    res.json(true);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Erreur serveur");
  }
});

router.post("/updateRecipeIngredients", authorization, async (req, res) => {
  try {
    const rct_id = req.header("rct_id");
    const new_rct_section_ing = req.body.rct_section_ing;
    const new_rct_ing = req.body.rct_ing;
    //Suppression de tout ce qui existe dans la bdd relatif à cette recette
    await pool.query("DELETE FROM section_ing WHERE rct_id=$1", [rct_id]);
    await pool.query("DELETE FROM ingredients WHERE rct_id=$1", [rct_id]);

    // Ajout de toutes les sections contenues dans req.body.section_ing
    for (let i = 0; i < new_rct_section_ing.length; i++) {
      await pool.query(
        "INSERT INTO section_ing (rct_id, section_ing_name, section_ing_position) VALUES ($1, $2, $3)",
        [
          rct_id,
          new_rct_section_ing[i][0] == "no_section"
            ? new_rct_section_ing[i][0]
            : new_rct_section_ing[i][0].charAt(0).toUpperCase() +
              new_rct_section_ing[i][0].slice(1),
          new_rct_section_ing[i][1],
        ]
      );
    }

    // Ajout de toutes les ingrédients contenus dans req.body.ing
    for (let i = 0; i < new_rct_ing.length; i++) {
      let rct_section_id = "";
      if (new_rct_ing[3] === 1) {
        rct_section_id = "no_section";
      } else {
        rct_section_id = await pool.query(
          "SELECT section_ing_id FROM section_ing WHERE (rct_id=$1) AND (section_ing_position=$2)",
          [rct_id, new_rct_ing[i][3]]
        );
      }

      await pool.query(
        "INSERT INTO ingredients (rct_id, section_ing_id, ing_qty, ing_qty_unit, ing_name, ing_position) VALUES ($1, $2, $3, $4, $5, $6)",
        [
          rct_id,
          rct_section_id.rows[0].section_ing_id,
          new_rct_ing[i][0],
          new_rct_ing[i][1],
          new_rct_ing[i][2],
          new_rct_ing[i][4],
        ]
      );
    }

    res.json(true);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Erreur serveur");
  }
});

router.post("/updateRecipeSteps", authorization, async (req, res) => {
  try {
    const rct_id = req.header("rct_id");
    const new_rct_section_step = req.body.rct_section_step;
    const new_rct_step = req.body.rct_step;

    //Suppression de tout ce qui existe dans la bdd relatif à cette recette
    await pool.query("DELETE FROM section_step WHERE rct_id=$1", [rct_id]);
    await pool.query("DELETE FROM steps WHERE rct_id=$1", [rct_id]);

    // Ajout de toutes les sections contenues dans req.body.section_ing
    for (let i = 0; i < new_rct_section_step.length; i++) {
      await pool.query(
        "INSERT INTO section_step (rct_id, section_step_name, section_step_position) VALUES ($1, $2, $3)",
        [
          rct_id,
          new_rct_section_step[i][0] == "no_section"
            ? new_rct_section_step[i][0]
            : new_rct_section_step[i][0].charAt(0).toUpperCase() +
              new_rct_section_step[i][0].slice(1),
          new_rct_section_step[i][1],
        ]
      );
    }

    // Ajout de toutes les ingrédients contenus dans req.body.ing
    for (let i = 0; i < new_rct_step.length; i++) {
      let rct_section_id = "";
      if (new_rct_step[1] === 1) {
        rct_section_id = "no_section";
      } else {
        rct_section_id = await pool.query(
          "SELECT section_step_id FROM section_step WHERE (rct_id=$1) AND (section_step_position=$2)",
          [rct_id, new_rct_step[i][1]]
        );
      }

      await pool.query(
        "INSERT INTO steps (rct_id, section_step_id, step_content, step_position) VALUES ($1, $2, $3, $4)",
        [
          rct_id,
          rct_section_id.rows[0].section_step_id,
          new_rct_step[i][0],
          new_rct_step[i][2],
        ]
      );
    }

    res.json(true);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Erreur serveur");
  }
});

router.post("/addCategory", authorizationAdmin, async (req, res) => {
  try {
    await pool.query(
      "CREATE TABLE IF NOT EXISTS categories(cat_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), cat_name VARCHAR(255) NOT NULL)"
    );

    await pool.query(
      "CREATE TABLE IF NOT EXISTS table_categories(table_cat_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), rct_id VARCHAR(255) NOT NULL)"
    );

    const cat_name =
      req.body.cat_name.slice(0, 1).toUpperCase() +
      req.body.cat_name.slice(1, req.body.cat_name.length).toLowerCase();

    // Si le nom est non défini, ça dégage
    if (cat_name === "") {
      return res
        .status(401)
        .json("Le nom de la catégorie ne peut pas être nul.");
    }

    // On veut éviter les doublons
    const myVerif = await pool.query(
      "SELECT * FROM categories WHERE cat_name = $1",
      [cat_name]
    );

    if (myVerif.rows.length !== 0) {
      return res.status(401).json("Catégorie déjà existante.");
    }

    await pool.query(
      "ALTER TABLE table_categories ADD " + cat_name.replace(" ", "_") + " BOOL"
    );

    await pool.query("INSERT INTO categories (cat_name) VALUES ($1)", [
      cat_name,
    ]);

    const myCat = await pool.query("SELECT * FROM categories");
    let myList = [];
    for (let i = 0; i < myCat.rows.length; i++) {
      myList.push(myCat.rows[i].cat_name);
    }
    res.json(myList.sort());
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Erreur serveur");
  }
});

router.get("/getAllCategories", authorization, async (req, res) => {
  try {
    let myList = [];
    let myVerif = false;

    // Vérification de si la table recettes existe ou non
    let myBddList = await pool.query(
      "SELECT * FROM information_schema.tables WHERE table_type='BASE TABLE'"
    );

    for (i = 0; i < myBddList.rows.length; i++) {
      if (myBddList.rows[i].table_name === "categories") {
        myVerif = true;
      }
    }

    if (myVerif) {
      const myCat = await pool.query("SELECT * FROM categories");
      for (let i = 0; i < myCat.rows.length; i++) {
        myList.push(myCat.rows[i].cat_name);
      }
    }
    res.json(myList.sort());
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Erreur serveur");
  }
});

router.post("/deleteCategory", authorizationAdmin, async (req, res) => {
  try {
    await pool.query("DELETE FROM categories WHERE cat_name = $1", [
      req.body.cat_name,
    ]);
    await pool.query(
      "ALTER TABLE table_categories DROP COLUMN " +
        req.body.cat_name.replace(" ", "_")
    );
    const myCat = await pool.query("SELECT * FROM categories");
    let myList = [];
    for (let i = 0; i < myCat.rows.length; i++) {
      myList.push(myCat.rows[i].cat_name);
    }
    res.json(myList.sort());
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Erreur serveur");
  }
});

router.post("/updateCategoryName", authorizationAdmin, async (req, res) => {
  try {
    const cat_name =
      req.body.cat_name.slice(0, 1).toUpperCase() +
      req.body.cat_name.slice(1, req.body.cat_name.length).toLowerCase();

    const old_cat_name =
      req.body.old_name.slice(0, 1).toUpperCase() +
      req.body.old_name.slice(1, req.body.old_name.length).toLowerCase();

    // On veut éviter les doublons
    const myVerif = await pool.query(
      "SELECT * FROM categories WHERE cat_name = $1",
      [cat_name]
    );

    if (cat_name === old_cat_name) {
      return res.status(401).json("Aucun changement.");
    }

    if (myVerif.rows.length !== 0 && cat_name !== old_cat_name) {
      return res.status(401).json("Catégorie déjà existante.");
    }

    await pool.query(
      "UPDATE categories SET cat_name = $1 WHERE cat_name = $2",
      [cat_name, old_cat_name]
    );
    await pool.query(
      "ALTER TABLE table_categories RENAME COLUMN " +
        old_cat_name.replace(" ", "_") +
        " TO " +
        cat_name.replace(" ", "_")
    );
    const myCat = await pool.query("SELECT * FROM categories");
    let myList = [];
    for (let i = 0; i < myCat.rows.length; i++) {
      myList.push(myCat.rows[i].cat_name);
    }
    res.json(myList.sort());
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Erreur serveur");
  }
});

router.post("/updateRecipeCategories", authorization, async (req, res) => {
  try {
    const rct_id = req.header("rct_id");
    const rct_cat = req.body.rct_cat;

    for (let i = 0; i < rct_cat.length; i++) {
      await pool.query(
        `UPDATE table_categories SET ${rct_cat[i][0].replace(" ", "_")} = ${
          rct_cat[i][1] ? "TRUE" : "FALSE"
        } WHERE rct_id = $1`,
        [rct_id]
      );
    }

    res.json(true);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Erreur serveur");
  }
});

router.post("/updateRecipeImages", authorization, async (req, res) => {
  try {
    const rct_id = req.body.rct_id;
    const rct_img = req.body.rct_img;

    await pool.query(
      "UPDATE images SET img_1 = $1, img_2 = $2, img_3 = $3, img_4 = $4, img_5 = $5 WHERE rct_id = $6",
      [rct_img[0], rct_img[1], rct_img[2], rct_img[3], rct_img[4], rct_id]
    );

    res.json(true);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Erreur serveur");
  }
});

router.post("/deleteRecipe", authorization, async (req, res) => {
  try {
    const rct_id = req.body.rct_id;

    await pool.query("DELETE FROM recettes WHERE rct_id = $1", [rct_id]);
    await pool.query("DELETE FROM ingredients WHERE rct_id = $1", [rct_id]);
    await pool.query("DELETE FROM section_ing WHERE rct_id = $1", [rct_id]);
    await pool.query("DELETE FROM steps WHERE rct_id = $1", [rct_id]);
    await pool.query("DELETE FROM section_step WHERE rct_id = $1", [rct_id]);
    await pool.query("DELETE FROM images WHERE rct_id = $1", [rct_id]);
    await pool.query("DELETE FROM table_categories WHERE rct_id = $1", [
      rct_id,
    ]);

    res.json(true);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Erreur serveur");
  }
});

module.exports = router;
