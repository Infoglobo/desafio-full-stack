
const express = require("express");

const app = express();


// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true})); 
// parse requests of content-type - application/json
app.use(express.json());  

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


require("./app/routes/noticia.routes")(app);
// set port, listen for requests 
const  PORT = process.env.PORT || 8080;  
app.listen(PORT, () => {
  const cors = require("./cors");
  app.use(cors());
  console.log(`Server is running on port ${PORT}.`);
});

