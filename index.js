const express = require("express");
const routes = require("./rutas/routes"); 
const path = require("path");
const dotenv = require("dotenv");
const session = require("express-session");

const app = express();

app.set("view engine", "ejs");
app.use("/web", express.static(path.join(__dirname, "/web")));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SECRETO_SESION,
  resave: true,
  saveUninitialized: true,
}));

dotenv.config();

// Usar rutas definidas
app.use("/", routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
