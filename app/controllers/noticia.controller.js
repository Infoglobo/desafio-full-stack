const db = require("../models");
const Noticia = db.noticias;

// Create and Save a new News
exports.create = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Origin", "http://localhost:8081"); 
  res.set('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set("Access-Control-Allow-Headers", "X-Requested-With");
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a news
  const noticia = new Noticia({
    title: req.body.title,
    content: req.body.content,
    dt_published: req.body.dt_published 
  });
  // Save news in the database
  noticia
    .save(noticia)
    .then(data => {
      res.send(data);
      res.redirect('http://localhost/projects/infoglobo-project-v1/app/resources/');
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the news."
      });
    });
};

// Retrieve all news from the database.
exports.findAll = (req, res) => {

  Noticia.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the news."
      });
    });

};

// Find a single news with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Noticia.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found news with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving news with id=" + id });
      });
  
};

// Update a news by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Noticia.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update news with id=${id}. Maybe news was not found!`
            });
          } else res.send({ message: "News was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating news with id=" + id
          });
        });
  
};

// Delete a news with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Noticia.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete news with id=${id}. Maybe news was not found!`
          });
        } else {
          res.send({
            message: "news was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete news with id=" + id
        });
      });
  
};

// Delete all news from the database.
exports.deleteAll = (req, res) => {
    Noticia.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} news were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all news."
      });
    });
  
};

