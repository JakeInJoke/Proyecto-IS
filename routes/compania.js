module.exports = {
  getNegociosPage: (req, res) => {
    let query = "SELECT * FROM `view_info_compania`"; // query database to get all the players

    // execute query
    db.query(query, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      res.render("view-compania.ejs", {
        title: "Negocios de los socios",
        compania: result,
        action: "Agregar Negocio",
        actionLink: "/addnegocio",
      });
    });
  },
  addNegocioPage: (req, res) => {
    let query = "SELECT * FROM `tipo` WHERE nombre_tipo <> 'INEXISTENTE'";
    // execute query
    db.query(query, (err, result) => {
      if (err) {
        res.redirect("/compania");
      }
      res.render("add-compania.ejs", {
        tipos: result,
        message: "",
      });
    });
  },
  addNegocio: (req, res) => {
    let nombre_compania = req.body.nombre_compania;
    let direccion_compania = req.body.direccion_compania;
    let id_tipo_compania = req.body.tipo_compania;
    let query =
      "INSERT INTO compania (" +
      "nombre_compania,direccion_compania,id_tipo_compania,estado_compania) VALUES" +
      "(" +
      "'" +
      nombre_compania +
      "'," +
      "'" +
      direccion_compania +
      "'," +
      id_tipo_compania +
      ",1)";
    // execute query
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(query);
      }
      res.redirect("/negocios");
    });
  },
  editNegocioPage: (req, res) => {
    let compId = req.params.id;
    let comp = "SELECT * FROM view_info_compania WHERE id_compania = " + compId;
    let query = "SELECT * FROM `tipo` WHERE nombre_tipo <> 'INEXISTENTE'";
    // execute query
    db.query(comp, (err, resultC) => {
      if (err) {
        res.redirect("/compania");
      }
      db.query(query, (err, result) => {
        if (err) {
          res.redirect("/compania");
        }
        res.render("edit-compania.ejs", {
          comp: resultC[0],
          tipos: result,
          message: "",
        });
      });
    });
  },
  editNegocio: (req, res) => {
    let compId = req.params.id;
    let nombre_compania = req.body.nombre_compania;
    let direccion_compania = req.body.direccion_compania;
    let id_tipo_compania = req.body.tipo_compania;
    let query =
      "CALL sp_update_compania (" +
      compId +
      ",'" +
      nombre_compania +
      "'," +
      "'" +
      direccion_compania +
      "'," +
      id_tipo_compania +
      ")";
    // execute query
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(query);
      }
      res.redirect("/negocios");
    });
  },
  deleteNegocio: (req, res) => {
    let compId = req.params.id;
    let query = "CALL sp_desactivar_compania (" + compId + ")";
    // execute query
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(query);
      }
      res.redirect("/negocios");
    });
  },
};
