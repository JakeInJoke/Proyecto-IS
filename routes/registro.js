const fs = require("fs");

module.exports = {
  getRegistrosPage: (req, res) => {
    let registroId = req.params.id;
    let query = "SELECT * FROM `view_asistentes` WHERE id"; // query database to get all the players

    // execute query
    db.query(query, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      res.render("view-registro.ejs", {
        title: "Lista de asistentes",
        registro: result,
        action: "Agregar Registro",
        actionLink: "/addRegistro",
      });
    });
  },
  addRegistroPage: (req, res) => {
    let registroId = req.params.id;
    let registroName = req.params.name; // query database to get all the players
    let queryB =
      "SELECT * FROM `view_asistentes` WHERE id_evento =" + registroId;
    // execute query
    db.query(queryB, (err, result) => {
      if (err) {
        res.redirect("/eventos");
      }
      res.render("add-registro.ejs", {
        socio: "",
        message: "",
        eventId: registroId,
        name: registroName,
        asist: result,
      });
    });
  },
  addRegistro: (req, res) => {
    let socio = req.params.socio;
    let evento = req.params.evento;
    let query = "CALL sp_add_asistente(" + socio + "," + evento + ")";

    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(query);
      }
      res.redirect("back");
    });
  },
  detailRegistroPage: (req, res) => {
    let registroId = req.params.id;
    let query = "SELECT * FROM view_asistentes WHERE id_evento = " + registroId;
    let queryB =
      "SELECT nombre_evento FROM view_evento WHERE id_evento = " + registroId;
    db.query(query, (err, resultA) => {
      if (err) {
        return res.status(500).send(err);
      }
      console.log(resultA);
      db.query(queryB, (err, resultB) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.render("details-registro.ejs", {
          asist: resultA,
          ev: resultB[0],
          message: "",
        });
      });
    });
  },
  editRegistroPage: (req, res) => {
    let registroId = req.params.id;
    let queryA =
      "SELECT * FROM `view_info_registro` WHERE id_registro = '" +
      registroId +
      "'";
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
          resA[0].id_compania_registro +
          "'";
        db.query(queryC, (err, resultC) => {
          if (err) {
            return res.status(500).send(err);
          }
          res.render("edit-registro.ejs", {
            title: "Editar  Registro",
            compania: resB,
            nomcomp: resultC[0],
            registro: resA[0],
            message: "",
          });
        });
      });
    });
  },
  deleteRegistro: (req, res) => {
    let registroId = req.params.id;
    let eventoId = req.params.evento;
    let query =
      "CALL sp_desactivar_registro(" + registroId + "," + eventoId + ")";
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(query);
      }
      res.redirect("back");
    });
  },
  validarRegistroSocio: (req, res) => {
    let codSocio = req.params.codigo;
    let eventoId = req.params.evento;
    codSocio = codSocio.toUpperCase();
    let query = "CALL sp_dsearch_socio('" + codSocio + "')";
    let queryB =
      "SELECT id_evento FROM `view_evento` WHERE nombre_evento ='" +
      eventoId +
      "'";
    db.query(query, (err, resultA) => {
      if (err) {
        return res.status(500).send(query);
      }
      console.log(resultA[0]);
      db.query(queryB, (err, resultB) => {
        if (err) {
          return res.status(500).send(query);
        }
        console.log(resultA[0]);
        res.render("view-validar.ejs", {
          socio: resultA[0],
          evento: resultB[0],
          message: "",
        });
      });
    });
  },
  ///////////////////////////////////////
  detailComentario: (req, res) => {
    let eventoId = req.params.id;
    let query =
      "SELECT * FROM comentario WHERE id_evento_comentario = " + eventoId;
    let queryB =
      "SELECT nombre_evento FROM view_evento WHERE id_evento = " + eventoId;
    db.query(query, (err, resultA) => {
      if (err) {
        return res.status(500).send(err);
      }
      console.log(resultA);
      db.query(queryB, (err, resultB) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.render("details-comentario.ejs", {
          coment: resultA,
          name: resultB[0],
          message: "",
        });
      });
    });
  },
  addComentarioPage: (req, res) => {
    let registroId = req.params.id;
    let registroName = req.params.evento; // query database to get all the players
    let queryB =
      "SELECT * FROM `comentario` WHERE id_evento_comentario =" + registroId;
    // execute query
    db.query(queryB, (err, result) => {
      if (err) {
        res.redirect("/eventos");
      }
      console.log(result);
      res.render("add-comentario.ejs", {
        socio: "",
        message: "",
        eventId: registroId,
        name: registroName,
        coment: result,
      });
    });
  },
  addComentario: (req, res) => {
    let name = req.params.evento;
    let comentario = req.body.texto_comentario;
    let evento = req.params.id;
    let query = "CALL sp_add_comentario(" + evento + ",'" + comentario + "')";

    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(query);
      }
      res.redirect("back");
    });
  },
  deleteComentario: (req, res) => {
    let comentId = req.params.id;
    let evento = req.params.evento;
    let query = "DELETE FROM comentario WHERE id_comentario = " + comentId;

    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(query);
      }
      res.redirect("back");
    });
  },
};
