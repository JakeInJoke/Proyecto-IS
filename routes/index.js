module.exports = {
  getHomePage: (req, res) => {
    let query = "SELECT * FROM `view_socio`"; // query database to get all the players

    // execute query
    db.query(query, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      res.render("index.ejs", {
        title: "Socios activos de Oracle",
        socio: result,
        action: "Agregar socio",
        actionLink: "/addsocio",
      });
    });
  },
};
