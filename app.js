const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const path = require("path");
const app = express();
const multer = require("multer");
const upload = multer();

const { getHomePage } = require("./routes/index");
const {
  addSocioPage,
  addSocio,
  detailSocioPage,
  deleteSocio,
  editSocio,
  editSocioPage,
} = require("./routes/socio");
const {
  getEventosPage,
  addEventoPage,
  addEvento,
  detailEventoPage,
  deleteEvento,
  editEvento,
  editEventoPage,
  startEvento,
  endEvento,
} = require("./routes/evento");
const {
  getRegistrosPage,
  addRegistroPage,
  addRegistro,
  detailRegistroPage,
  deleteRegistro,
  validarRegistroSocio,
  detailComentario,
  addComentario,
  addComentarioPage,
  deleteComentario,
} = require("./routes/registro");
const {
  getNegociosPage,
  addNegocioPage,
  addNegocio,
  editNegocioPage,
  editNegocio,
  deleteNegocio,
} = require("./routes/compania");
const port = 5000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createPool({
  host: "gradof.mysql.database.azure.com",
  user: "booleDBadmin@gradof",
  password: "Booledb2020",
  database: "oracle_schema",
  waitForConnections: true,
});

// connect to database
db.getConnection((err) => {
  if (err) {
    throw err;
  }
  console.log("Conexion a la base de datos establecida");
});
global.db = db;

// configure middleware
app.set("port", process.env.port || port); // set express to use this port
app.set("views", __dirname + "/views"); // set express to look in this folder to render our view
app.set("view engine", "ejs"); // configure template engine
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // parse form data client
app.use(upload.array());
app.use(express.static(path.join(__dirname, "public"))); // configure express to use public folder // configure fileupload

// routes for the app
//SOCIO
app.get("/", getHomePage);
app.get("/addsocio", addSocioPage);
app.get("/detailsocio/:id", detailSocioPage);
app.get("/editsocio/:id", editSocioPage);
app.get("/deletesocio/:id", deleteSocio);
app.post("/addsocio", addSocio);
app.post("/editsocio/:id", editSocio);
//EVENTO
app.get("/eventos", getEventosPage);
app.get("/addevento", addEventoPage);
app.get("/detailevento/:id", detailEventoPage);
app.get("/editevento/:id", editEventoPage);
app.get("/deleteevento/:id", deleteEvento);
app.get("/startevento/:id", startEvento);
app.get("/endevento/:id", endEvento);
app.post("/addevento", addEvento);
app.post("/editevento/:id", editEvento);
// set the app to listen on the port
//ASISTENTES
app.get("/asistevento/:id", getRegistrosPage);
app.get("/addasist/:id/:name", addRegistroPage);
app.get("/detailasist/:id", detailRegistroPage);
app.get("/deleteasist/:id/:evento", deleteRegistro);
app.get("/validarasist/:codigo/:evento", validarRegistroSocio);
app.get("/addasister/:socio/:evento", addRegistro);
//COMENTARIOS
app.get("/addcoment/:id/:evento", addComentarioPage);
app.post("/addcoment/:id/:evento", addComentario);
app.get("/detailcoment/:id", detailComentario);
app.get("/deletecoment/:id", deleteComentario);
//COMPANIA
app.get("/negocios", getNegociosPage);
app.get("/addnegocio", addNegocioPage);
app.get("/editnegocio/:id", editNegocioPage);
app.get("/deletenegocio/:id", deleteNegocio);
app.post("/addnegocio", addNegocio);
app.post("/editnegocio/:id", editNegocio);
// set the app to listen on the port
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
