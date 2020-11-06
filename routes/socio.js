const fs = require("fs");

module.exports = {
  addSocioPage: (req, res) => {
    let query = "SELECT * FROM `view_compania`";
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.render("add-socio.ejs", {
        compania: result,
        message: "",
      });
    });
  },
  addSocio: (req, res) => {
    let nombre_socio = req.body.nombre_socio;
    let id_compania_socio = req.body.nombre_compania;
    let puesto_socio = req.body.puesto_socio;
    let direccion_socio = req.body.direccion_socio;
    let telefono_socio = req.body.telefono_socio;
    let membresia_socio = req.body.membresia_socio;

    let query =
      "CALL sp_add_socio(" +
      "''," +
      "'" +
      nombre_socio +
      "'," +
      id_compania_socio +
      "," +
      "'" +
      puesto_socio +
      "'," +
      "'" +
      direccion_socio +
      "'," +
      "'" +
      telefono_socio +
      "'," +
      membresia_socio +
      "," +
      "'2020-01-01','2021-01-01',0)";

    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(query);
      }
      res.redirect("/");
    });
  },
  detailSocioPage: (req, res) => {
    let socioId = req.params.id;
    let query =
      "SELECT * FROM `view_info_socio` WHERE id_socio = '" + socioId + "' ";
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.render("details-socio.ejs", {
        socio: result[0],
        message: "",
      });
    });
  },
  editSocioPage: (req, res) => {
    let socioId = req.params.id;
    let queryA = "SELECT * FROM `socio` WHERE id_socio = '" + socioId + "'";
    let queryB = "SELECT * FROM `view_compania`";
    db.query(queryB, (err, resultB) => {
      if (err) {
        return res.status(500).send(err);
      }
      let resB = resultB;
      db.query(queryA, (err, resultA) => {
        if (err) {
          return res.status(500).send(err);
        }
        let resA = resultA;
        let queryC =
          "SELECT nombre_compania FROM `compania` WHERE id_compania = '" +
          resA[0].id_compania_socio +
          "'";
        db.query(queryC, (err, resultC) => {
          if (err) {
            return res.status(500).send(err);
          }
          res.render("edit-socio.ejs", {
            title: "Editar  Socio",
            compania: resB,
            nomcomp: resultC[0],
            socio: resA[0],
            message: "",
          });
        });
      });
    });
  },
  editSocio: (req, res) => {
    let socioId = req.params.id;
    let nombre_socio = req.body.nombre_socio;
    let id_compania_socio = req.body.nombre_compania;
    let puesto_socio = req.body.puesto_socio;
    let direccion_socio = req.body.direccion_socio;
    let telefono_socio = req.body.telefono_socio;
    let membresia_socio = req.body.membresia_socio;

    let query =
      "CALL sp_update_socio(" +
      "'" +
      socioId +
      "'," +
      "'" +
      nombre_socio +
      "'," +
      id_compania_socio +
      "," +
      "'" +
      puesto_socio +
      "'," +
      "'" +
      direccion_socio +
      "'," +
      "'" +
      telefono_socio +
      "'," +
      membresia_socio +
      ")";

    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.redirect("/");
    });
  },
  deleteSocio: (req, res) => {
    let socioId = req.params.id;
    let query = "CALL sp_desactivar_socio(" + "'" + socioId + "')";
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(query);
      }
      res.redirect("/");
    });
  },
};
