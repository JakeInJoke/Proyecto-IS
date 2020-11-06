const fs = require("fs");

module.exports = {
  getEventosPage: (req, res) => {
    let query = "SELECT * FROM `view_evento`"; // query database to get all the players

    // execute query
    db.query(query, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      res.render("view-evento.ejs", {
        title: "Lista de eventos",
        evento: result,
        action: "Agregar Evento",
        actionLink: "/addEvento",
      });
    });
  },
  addEventoPage: (req, res) => {
    res.render("add-evento.ejs", {
      message: "",
    });
  },
  addEvento: (req, res) => {
    let nombre_evento = req.body.nombre_evento;
    let descripcion_evento = req.body.descripcion_evento;
    let tipo_evento = req.body.tipo_evento;
    let fecha_evento = req.body.fecha_evento;
    let costo_evento = req.body.costo_evento;

    if (!costo_evento) {
      costo_evento = 0;
    } else {
      costo_evento = costo_evento;
    }

    var temp_fecha_evento = fecha_evento.split("-");
    fecha_evento = temp_fecha_evento.join("/");

    let query =
      "CALL sp_add_evento(" +
      "''," +
      "'" +
      nombre_evento +
      "','" +
      descripcion_evento +
      "'," +
      "'" +
      tipo_evento +
      "'," +
      "'" +
      fecha_evento +
      "'," +
      "'" +
      costo_evento +
      "')";

    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(query);
      }
      res.redirect("/eventos");
    });
  },
  detailEventoPage: (req, res) => {
    let eventoId = req.params.id;
    let query =
      "SELECT * FROM `view_info_evento` WHERE id_evento = " + eventoId;
    let asist =
      "SELECT COUNT(*) AS c_a FROM view_asistentes WHERE id_evento = " +
      eventoId;
    let coment =
      " SELECT COUNT(*) AS c_c FROM comentario WHERE id_evento_comentario = " +
      eventoId;
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      console.log(result);
      db.query(asist, (err, resultX) => {
        if (err) {
          return res.status(500).send(err);
        }
        console.log(resultX);
        db.query(coment, (err, resultY) => {
          if (err) {
            return res.status(500).send(err);
          }
          console.log(resultY);
          res.render("details-evento.ejs", {
            evento: result[0],
            message: "",
            asist: resultX[0],
            coment: resultY[0],
          });
        });
      });
    });
  },
  editEventoPage: (req, res) => {
    let eventoId = req.params.id;
    let queryA =
      "SELECT * FROM `view_info_evento` WHERE id_evento = '" + eventoId + "'";
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
          resA[0].id_compania_evento +
          "'";
        db.query(queryC, (err, resultC) => {
          if (err) {
            return res.status(500).send(err);
          }
          res.render("edit-evento.ejs", {
            title: "Editar  Evento",
            compania: resB,
            nomcomp: resultC[0],
            evento: resA[0],
            message: "",
          });
        });
      });
    });
  },
  editEvento: (req, res) => {
    let eventoId = req.params.id;
    let nombre_evento = req.body.nombre_evento;
    let descripcion_evento = req.body.descripcion_evento;
    let tipo_evento = req.body.tipo_evento;
    let fecha_evento = req.body.fecha_evento;
    let costo_evento = req.body.costo_evento;

    if (!costo_evento) {
      costo_evento = 0;
    } else {
      costo_evento = costo_evento;
    }

    var temp_fecha_evento = fecha_evento.split("-");
    fecha_evento = temp_fecha_evento.join("/");

    let query =
      "CALL sp_update_evento(" +
      "'" +
      eventoId +
      "'," +
      "'" +
      nombre_evento +
      "','" +
      descripcion_evento +
      "'," +
      "'" +
      tipo_evento +
      "'," +
      "'" +
      fecha_evento +
      "'," +
      costo_evento +
      ")";

    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.redirect("/eventos");
    });
  },
  deleteEvento: (req, res) => {
    let eventoId = req.params.id;
    let query = "CALL sp_desactivar_evento(" + "'" + eventoId + "')";
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(query);
      }
      res.redirect("/eventos");
    });
  },
  startEvento: (req, res) => {
    let eventoId = req.params.id;
    let query = "CALL sp_start_evento(" + "'" + eventoId + "')";
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(query);
      }
      res.redirect("/eventos");
    });
  },
  endEvento: (req, res) => {
    let eventoId = req.params.id;
    let query = "CALL sp_end_evento(" + "'" + eventoId + "')";
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(query);
      }
      res.redirect("/eventos");
    });
  },
};
