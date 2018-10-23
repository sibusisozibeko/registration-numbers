const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const RegiStration = require("./registration_number.js");
const flash = require("express-flash");
const session = require("express-session");
const app = express();
const pg = require("pg");
const Pool = pg.Pool;
// initialise the flash middleware
app.use(flash());

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL) {
  useSSL = true;
}

// which db connection to use
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://coder:coder123@localhost:5432/registration";

const pool = new Pool({
  connectionString,
  ssl: useSSL
});

const Regnumb = RegiStration(pool);
//const greetingRoute = routes(Greet);
let PORT = process.env.PORT || 2130;
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// initialise session middleware - flash-express depends on it
app.use(
  session({
    secret: "this is a text",
    resave: false,
    saveUninitialized: true
  })
);

app.use(express.static("public"));

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.get("/", async function(req, res, next) {
  try {
    res.render("home", {
      number_plate: await Regnumb.getplates(),
      towns: await Regnumb.showplates()
    });
  } catch (error) {
    next(error.stack);
  }
});

app.post("/reg_numbers", async function(req, res, next) {
  try {
    let regNumber = req.body.input;
    await Regnumb.Regadd(regNumber);
    res.redirect("/");
  } catch (error) {
    next(error.stack);
  }
});
//show selected town reg numbers
app.post("/:tNames", async function(req, res, next) {
  let city = req.body.tNames;
  console.log(city);
  try {
    let reg_numbers = await Regnumb.filtering(city);
    console.log(reg_numbers);
    let towns = await Regnumb.showplates();
    if (city === "all Towns") {
      res.render("home", {
        towns: towns,
        // chosenTown: await Regnumb.filtering(regplate)
        number_plate: reg_numbers
      });
    } else {
      let plates = res.render("home", {
        towns: towns,
        chosenTown: await Regnumb.filtering(city)
      });
    }
  } catch (error) {
    next(error.stack);
  }
});
app.get("/removeTowns", async function(req, res, next) {
  try {
    if (await Regnumb.getplates()) {
      req.flash(
        "success",
        "All Registrayions Have Been Deleted Successfull...!"
      );

      return res.redirect("/");
    } else {
      await Regnumb.clearPlates();
      req.flash(
        "success",
        "All Registrayions Have Been Deleted Successfull...!"
      );

      res.redirect("/");
    }
  } catch (error) {
    next(error.stack);
  }
});

app.use(bodyParser.json());
app.listen(PORT, function(err) {
  console.log("APP starting on port", PORT);
});
