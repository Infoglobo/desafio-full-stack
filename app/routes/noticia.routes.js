module.exports = app => {
    const noticia = require("../controllers/noticia.controller.js");
  
    var router = require("express").Router();
    
    
    // Create a new News
    router.post("/", noticia.create);
  
    // Retrieve all News
    router.get("/", noticia.findAll);
 
    // Retrieve a single News with id
    router.get("/:id", noticia.findOne);
  
    // Update a News with id
    router.put("/:id", noticia.update);
  
    // Delete a News with id
    router.delete("/:id", noticia.delete);
  
    // Create a new News
    router.delete("/", noticia.deleteAll);
    var cors = require('cors')
    app.use(cors());
    app.use('/api/news', router);
  };